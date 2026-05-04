const Transaction = require('../models/Transaction');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Send money via Phone Number OR UPI ID
// @route   POST /api/transactions/send
// @access  Private
const sendMoney = async (req, res) => {
  try {
    const { receiverIdentifier, amount, mpin } = req.body;
    const senderId = req.user._id;

    //  Validate input
    if (!receiverIdentifier || !amount || !mpin) {
      return res.status(400).json({
        message: 'receiverIdentifier, amount and mpin are required',
      });
    }

    if (Number(amount) <= 0) {
      return res.status(400).json({
        message: 'Amount must be greater than zero',
      });
    }

    //  Clean input
    const cleanedIdentifier = receiverIdentifier.trim().toLowerCase();
    const transferAmount = Number(amount);

    //  Find sender
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    // Verify MPIN
    if (!sender.mpin) {
      return res.status(400).json({
        message: 'Please setup your MPIN first',
      });
    }

    const isMpinCorrect = await bcrypt.compare(
      mpin.toString(),
      sender.mpin
    );

    if (!isMpinCorrect) {
      return res.status(401).json({
        message: 'Incorrect MPIN',
      });
    }

    // Find receiver (Phone OR UPI)
    const receiver = await User.findOne({
      $or: [
        { phone: Number(cleanedIdentifier) },
        { upiId: cleanedIdentifier },
      ],
    });

    if (!receiver) {
      return res.status(404).json({
        message: 'Receiver not found (Invalid Phone/UPI)',
      });
    }

    //  Prevent self-transfer
    if (sender._id.toString() === receiver._id.toString()) {
      return res.status(400).json({
        message: 'You cannot send money to yourself',
      });
    }

    //  Check balance
    if (sender.balance < transferAmount) {
      return res.status(400).json({
        message: 'Insufficient balance',
      });
    }

    //  Transfer money
    sender.balance -= transferAmount;
    receiver.balance += transferAmount;

    await sender.save();
    await receiver.save();

    //  Save transaction
    const transaction = await Transaction.create({
      sender: sender._id,
      receiver: receiver._id,
      type: 'TRANSFER',
      amount: transferAmount,
      status: 'SUCCESS',
    });

    //  Response
    res.status(201).json({
      message: 'Money Transfer Successful',
      transaction,
      newBalance: sender.balance,
    });

  } catch (error) {
    console.error("Transaction Error:", error);
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get transaction history
// @route   GET /api/transactions/history
// @access  Private
const getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate('sender', 'name phone upiId')
      .populate('receiver', 'name phone upiId')
      .sort({ createdAt: -1 });

    res.json(transactions);

  } catch (error) {
    console.error("History Error:", error);
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  sendMoney,
  getTransactionHistory,
};
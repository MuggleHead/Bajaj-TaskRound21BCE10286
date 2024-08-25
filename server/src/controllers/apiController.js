const UserData = require('../models/UserData');
const { validateInput } = require('../utils/validation');

const postRequestHandler = async (req, res, next) => {
  try {
    const { data } = req.body;

    // Validate input
    const { isValid, numbers, alphabets, highestLowercase } = validateInput(data);
    if (!isValid) throw new Error('Invalid input');

    // Create user data
    const userData = new UserData({
      user_id: "john_doe_17091999",  // Example user_id
      email: "john@xyz.com",         // Example email
      roll_number: "ABCD123",        // Example roll_number
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    });

    await userData.save();

    // Response structure
    res.status(200).json({
      is_success: true,
      user_id: userData.user_id,
      email: userData.email,
      roll_number: userData.roll_number,
      numbers: userData.numbers,
      alphabets: userData.alphabets,
      highest_lowercase_alphabet: userData.highest_lowercase_alphabet
    });
  } catch (error) {
    next(error);
  }
};

const getRequestHandler = (req, res) => {
  res.status(200).json({ operation_code: 1 });
};

module.exports = { postRequestHandler, getRequestHandler };

const validateInput = (data) => {
    if (!Array.isArray(data)) {
      return { isValid: false };
    }
  
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const lowerCaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercase = lowerCaseAlphabets.length > 0 ? lowerCaseAlphabets.sort().pop() : null;
  
    return {
      isValid: true,
      numbers: numbers,
      alphabets: alphabets,
      highestLowercase: highestLowercase
    };
  };
  
  module.exports = { validateInput };
  
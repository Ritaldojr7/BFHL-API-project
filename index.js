const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// ---- USER CONFIG ----
const FULL_NAME = "ritwik_mukherjee";  // must be lowercase, underscores between names
const DOB_DDMMYYYY = "25092001";       // ddmmyyyy format
const EMAIL = "ritwik.mukherjee68@gmail.com";
const ROLL_NUMBER = "22BHI10088";
// ---------------------

app.post("/bfhl", (req, res) => {
  try {
    const inputData = req.body.data;

    if (!Array.isArray(inputData)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input, 'data' must be an array",
      });
    }

    // ✅ Initialize as arrays (important!)
    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    inputData.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        // It's a number
        const num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item); // keep as string
        } else {
          odd_numbers.push(item);  // keep as string
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // It's an alphabet word
        alphabets.push(item.toUpperCase());
      } else {
        // Special character
        special_characters.push(item);
      }
    });

    // Build concat string from alphabets (reverse, alternating caps)
    let concat_string = "";
    const reversed = alphabets.join("").split("").reverse();
    reversed.forEach((ch, idx) => {
      concat_string += idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
    });

    res.json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),   // return sum as string
      concat_string,
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`BFHL API listening on port ${PORT}`);
});

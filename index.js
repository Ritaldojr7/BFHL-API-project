const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// GET /bfhl endpoint
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// POST /bfhl endpoint
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  let numbers = [];
  let alphabets = [];
  let specialCharacters = [];

  if (Array.isArray(data)) {
    data.forEach((item) => {
      if (!isNaN(item) && item.trim() !== "") {
        numbers.push(item); // keep numbers as strings
      } else if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item);
      } else {
        specialCharacters.push(item);
      }
    });
  }

  // Separate even and odd numbers
  let odd_numbers = numbers.filter((n) => parseInt(n) % 2 !== 0);
  let even_numbers = numbers.filter((n) => parseInt(n) % 2 === 0);

  // Concatenate alphabets (keep case as given, then add capitalized first one)
  let concat_string = alphabets.length > 0 ? alphabets.join("") : "";

  res.json({
    is_success: true,
    user_id: "ritwik_mukherjee_25092001",
    email: "ritwik.mukherjee68@gmail.com",
    roll_number: "22BHI10088",
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters: specialCharacters,
    sum: numbers.reduce((acc, n) => acc + parseInt(n), 0).toString(), // return as string
    concat_string
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

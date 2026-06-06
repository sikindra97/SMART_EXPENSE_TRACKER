const Expense = require("../models/Expense");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getSuggestions = async (req, res) => {

  try {

  const expenses = await Expense.find({
  user: req.user,
});

    const completion =
      await groq.chat.completions.create({

        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `
You are a financial advisor.

Analyze the expenses and return ONLY valid JSON.

Format:

{
  "highestCategory": "",
  "totalSpent": 0,
  "suggestions": [
    "",
    "",
    ""
  ]
}
`
          },
          {
            role: "user",
            content:
              `Analyze these expenses:

${JSON.stringify(expenses)}`
          }
        ],

        temperature: 0,
      });

    const result =
      completion.choices[0]
        .message.content;

    const cleanResult =
      result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const suggestions =
      JSON.parse(cleanResult);

    res.json(suggestions);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        error.message
    });
  }
};

module.exports = {
  getSuggestions,
};
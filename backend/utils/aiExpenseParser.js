const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const parseExpense = async (text) => {

  try {

  

    const completion =
      await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `
You are an expense parser.

Convert the user's expense sentence into JSON.

Return ONLY valid JSON.

Format:

{
  "title": "",
  "amount": 0,
  "category": ""
}

Rules:

1. Extract the item name as title.
2. Extract the amount as a number.
3. Choose one category from:

Food
Travel
Shopping
Health
Education
Entertainment
Others

Examples:

Input:
"Maine pizza par 500 rupaye kharch kiye"

Output:
{
  "title":"Pizza",
  "amount":500,
  "category":"Food"
}

Input:
"Maine burger par 250 rupaye kharch kiye"

Output:
{
  "title":"Burger",
  "amount":250,
  "category":"Food"
}

Input:
"Maine movie ticket par 300 rupaye kharch kiye"

Output:
{
  "title":"Movie Ticket",
  "amount":300,
  "category":"Entertainment"
}

Input:
"Maine cab par 200 rupaye kharch kiye"

Output:
{
  "title":"Cab",
  "amount":200,
  "category":"Travel"
}

Return ONLY JSON.
`
          },
          {
            role: "user",
            content: text,
          },
        ],

        temperature: 0,
      });

    const result =
      completion.choices[0].message.content;



    const cleanResult = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();


    const expense =
      JSON.parse(cleanResult);


    return expense;

  } catch (error) {

    console.error(
      "AI_EXPENSE_PARSER_ERROR:",
      error
    );

    throw error;
  }
};

module.exports = parseExpense;
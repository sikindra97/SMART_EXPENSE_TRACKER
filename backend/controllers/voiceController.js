const parseExpense =
  require("../utils/aiExpenseParser");

const parseVoiceExpense =
  async (req, res) => {

    try {



      const { transcript } =
        req.body;

      const expense =
        await parseExpense(
          transcript
        );

     

      res.json(expense);

    } catch (error) {

      console.error(
        "VOICE_CONTROLLER_ERROR:",
        error
      );

      res.status(500).json({
        error: error.message
      });
    }
  };

module.exports = {
  parseVoiceExpense,
};
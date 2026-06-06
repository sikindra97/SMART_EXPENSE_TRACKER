const extractTextFromImage = require("../utils/ocrService");

const scanBill = async (req, res) => {
  try {

    

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    // IMAGE PATH

    const imagePath = req.file.path;
   

    // OCR TEXT

   
    const text = await extractTextFromImage(imagePath);

 

    // =========================
    // FIND TOTAL AMOUNT
    // =========================

    const totalMatch = text.match(
      /total[^0-9]*(\d+\s?\.?\s?\d{0,2})/i
    );

    let amount = 0;

    if (totalMatch) {

      amount = totalMatch[1]
        .replace(/\s/g, "")
        .replace(",", ".");

      if (
        amount.length > 2 &&
        !amount.includes(".")
      ) {
        amount =
          amount.slice(0, -2) +
          "." +
          amount.slice(-2);
      }
    }

    // =========================
    // FIND CATEGORY
    // =========================

    let category = "Others";

    const lowerText = text.toLowerCase();

    if (
      lowerText.includes("pizza") ||
      lowerText.includes("burger") ||
      lowerText.includes("restaurant") ||
      lowerText.includes("cafe") ||
      lowerText.includes("food")
    ) {
      category = "Food";
    }

    else if (
      lowerText.includes("market") ||
      lowerText.includes("grocery") ||
      lowerText.includes("mart")
    ) {
      category = "Market";
    }

    else if (
      lowerText.includes("uber") ||
      lowerText.includes("petrol") ||
      lowerText.includes("fuel") ||
      lowerText.includes("ola")
    ) {
      category = "Travel";
    }

    else if (
      lowerText.includes("amazon") ||
      lowerText.includes("shopping")
    ) {
      category = "Shopping";
    }

    // =========================
    // SHOP NAME
    // =========================

    const lines = text.split("\n");

    const shopName =
      lines.find(
        line => line.trim().length > 3
      ) || "Unknown Shop";

    console.log("Response Ready");

    // =========================
    // RESPONSE
    // =========================

    res.json({
      success: true,
      shopName,
      amount,
      category,
      extractedText: text
    });

  } catch (error) {

    console.error("========== OCR ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      error: error.toString()
    });
  }
};

module.exports = {
  scanBill
};
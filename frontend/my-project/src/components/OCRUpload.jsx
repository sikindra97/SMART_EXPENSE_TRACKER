import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function OCRUpload({ fetchExpenses,  darkMode, }) {



  const navigate = useNavigate();
   const [showLoginMsg, setShowLoginMsg] =useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const uploadBill = async () => {
 const token = localStorage.getItem("token");

   if (!token) {
    setShowLoginMsg(true);
    return;
  }
  setShowLoginMsg(false);
    if (!file) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // MUST MATCH upload.single("image")
      formData.append("image", file);

      // OCR Scan
      const res = await API.post(
        "/ocr/scan",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      const {
        shopName,
        amount,
        category,
      } = res.data;

      // Auto Save Expense
      await API.post("/expenses", {
        title: shopName,
        amount,
        category,
      });

      alert(
        `Expense Saved!\n\nShop: ${shopName}\nAmount: ₹${amount}`
      );

      setFile(null);
      setPreview(null);

      fetchExpenses();

    } catch (error) {
      console.error(error);

      alert("OCR Scan Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
<div
  className={`p-6 rounded-2xl shadow transition-all ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-white text-black"
  }`}
>
      <h2 className="text-xl font-semibold mb-4">
        OCR Bill Scanner
      </h2>
{showLoginMsg && (
  <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded-lg mb-4 flex justify-between items-center">
    <span>
      🔒 Please login to use OCR Scanner
    </span>

    <button
      onClick={() => navigate("/login")}
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
    >
      Login
    </button>
  </div>
)}
      <input
        type="file"
        id="billUpload"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      <label
        htmlFor="billUpload"
        className="cursor-pointer bg-green-600 text-white px-4 py-3 rounded-lg block text-center hover:bg-green-700"
      >
        📷 Capture / Upload Bill
      </label>

      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Bill Preview"
            className="w-full h-64 object-cover rounded-lg border"
          />
        </div>
      )}

      <button
        onClick={uploadBill}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading
          ? "Scanning..."
          : "Scan Bill"}
      </button>
    </div>
  );
}

export default OCRUpload;
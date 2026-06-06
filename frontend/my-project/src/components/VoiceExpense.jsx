import { useState } from 'react';
import API from '../api';
import { useNavigate } from "react-router-dom";

function VoiceExpense({ fetchExpenses ,
  darkMode, }) {
  const navigate = useNavigate();
   const [showLoginMsg, setShowLoginMsg] =useState(false);

  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [recognitionObj, setRecognitionObj] = useState(null);

  const startListening = () => {


  const token = localStorage.getItem("token");

   if (!token) {
    setShowLoginMsg(true);
    return;
  }
  setShowLoginMsg(false);

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    setRecognitionObj(recognition);

    recognition.lang = 'en-IN';

    recognition.continuous = true;

    //  recognition.interimResults = true; in the Web Speech API to enable real-time transcription.
    // It allows the browser to show text as the user is speaking,
    //  rather than forcing them to wait for a pause to see the final

    recognition.interimResults = true;

    setListening(true);

    recognition.start();

    recognition.onresult = async (event) => {

      let speechText = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {
        speechText +=
          event.results[i][0].transcript + " ";
      }

      setTranscript(speechText);

      // Process only final result

      const lastResult =
        event.results[event.results.length - 1];

      if (!lastResult.isFinal) {
        return;
      }

      // AI Parsing
      try {

        // Send transcript to Groq backend

        const aiResponse =
          await API.post(
            "/voice/parse",
            {
              transcript: speechText,
            }
          );

        console.log(
          "AI Response:",
          aiResponse.data
        );

        const expense =
          aiResponse.data;

        // Save expense

        await API.post(
          "/expenses",
          expense
        );

        fetchExpenses();

        alert(
          "Expense Saved Successfully"
        );

        setTranscript("");

        recognition.stop();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to save expense"
        );
      }
    };

    recognition.onerror = (error) => {

      console.log(error);

      setListening(false);
    };

    recognition.onend = () => {

      setListening(false);
    };
  };

  const stopListening = () => {

    if (recognitionObj) {
      recognitionObj.stop();
    }

    setListening(false);
  };

  return (
    <div
  className={`p-6 rounded-2xl shadow ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-white text-black"
  }`}
>

      <h2 className="text-xl font-semibold mb-4">
        AI Voice Expense
      </h2>
      {showLoginMsg && (
  <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded-lg mb-4 flex justify-between items-center">
    <span>
       Please login to use Voice Expense
    </span>

    <button
      onClick={() => navigate("/login")}
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
    >
      Login
    </button>
  </div>
)}

      {!listening ? (
        <button
          onClick={startListening}
          className="w-full py-3 rounded-lg text-white bg-purple-600"
        >
          🎤 Start Speaking
        </button>
      ) : (
        <button
          onClick={stopListening}
          className="w-full py-3 rounded-lg text-white bg-red-500"
        >
          ⏹ Stop Recording
        </button>
      )}

      {transcript && (
        <div className="mt-4 bg-gray-100 p-3 rounded-lg">

          <p className="font-semibold">
            Live Transcript:
          </p>

          <p className="text-gray-700">
            {transcript}
          </p>

        </div>
      )}

    </div>
  );
}

export default VoiceExpense;
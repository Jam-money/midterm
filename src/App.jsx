import { useState } from "react";
import SurveyForm from "./SurveyForm";
import { supabase } from "./supabaseClient";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error("Supabase credentials are missing in the .env file");
      }

      const { data, error } = await supabase
        .from("survey_responses") 
        .insert([formData]);

      if (error) {
        console.error("Supabase Insert Error:", error.message);
        throw new Error("Failed to save data. Check Supabase settings.");
      }

      console.log("Inserted Data:", data);

      setShowPopup(true);

      setTimeout(() => setShowPopup(false), 3000);
      
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-pink-300">
      <h1 className="centered-title">Survey Form</h1>
      <div className="container p-6 bg-white border border-gray-400 shadow-lg relative z-10 flex flex-col justify-center">
        <div className="p-8">
          <SurveyForm onSubmit={handleSubmit} />
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <p>Submitted successfully!</p>
        </div>
      )}
    </div>
  );
};

export default App;

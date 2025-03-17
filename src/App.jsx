import { useState } from "react";
import { supabase } from "./supabaseClient";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("survey_responses") // Replace with your actual table name
        .insert([formData]);

      if (error) {
        throw error;
      }

      console.log("Form submitted successfully:", data);

      setShowPopup(true); // Show popup

      setTimeout(() => {
        setShowPopup(false); // Hide popup after 3 seconds
      }, 3000);

      setFormData({ name: "", email: "", feedback: "" }); // Clear form

    } catch (error) {
      console.error("Submission error:", error.message);
    }
  };

  return (
    <div className="main-container">
      <h1 className="centered-title">Survey Form</h1>

      <form onSubmit={handleSubmit} className="survey-form">
        <div className="container">
          <div className="form-group">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="feedback-container">
          <div className="form-group">
            <label className="form-label">Feedback:</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
              className="form-input textarea"
              rows="3"
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>

      {/* Popup Message */}
      {showPopup && (
        <div className="popup">
          <p>Submitted successfully!</p>
        </div>
      )}
    </div>
  );
};

export default App;

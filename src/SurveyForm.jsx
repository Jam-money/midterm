import { useState } from "react";
import "./index.css";

const SurveyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", email: "", feedback: "" }); 
  };

  return (
    <form onSubmit={handleSubmit} className="survey-form">
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
      <div className="form-group">
        <label className="form-label">Feedback:</label>
        <textarea
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          required
          className="form-input textarea"
          rows="1"
        />
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default SurveyForm;

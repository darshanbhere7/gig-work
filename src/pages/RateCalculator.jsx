import React, { useState } from "react";

const RateCalculator = () => {
  const [formData, setFormData] = useState({
    experience: "",
    industry: "",
    location: "",
    hours: "",
    effort: "Medium",
  });
  const [suggestedRate, setSuggestedRate] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateRate = (e) => {
    e.preventDefault();
    const baseRate = 20; // starting rate
    const experienceMultiplier = formData.experience * 1.5;
    const effortMultiplier =
      formData.effort === "High" ? 2 : formData.effort === "Low" ? 0.8 : 1;
    const calculatedRate = baseRate + experienceMultiplier * effortMultiplier;
    setSuggestedRate(calculatedRate.toFixed(2));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Rate Calculator</h2>
      <p className="text-center">Calculate your rates and set financial goals.</p>
      <form onSubmit={calculateRate} className="p-4 border rounded shadow">
        <div className="mb-3">
          <label className="form-label">Years of Experience</label>
          <input
            type="number"
            className="form-control"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Industry</label>
          <input
            type="text"
            className="form-control"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Effort Level</label>
          <select
            className="form-select"
            name="effort"
            value={formData.effort}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Calculate Rate
        </button>
      </form>

      {suggestedRate && (
        <div className="alert alert-success mt-4 text-center">
          Your suggested hourly rate is: <strong>${suggestedRate}/hr</strong>
        </div>
      )}
    </div>
  );
};

export default RateCalculator;

import React, { useState, useEffect } from "react";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";


Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RateCalculator = () => {
  const [formData, setFormData] = useState({
    experience: "",
    industry: "Software Development",
    location: "",
    rent: "",
    utilities: "",
    effort: "Medium",
  });

  const [suggestedRate, setSuggestedRate] = useState(null);
  const [savedRates, setSavedRates] = useState([]);

  const industryRates = {
    "Software Development": 40,
    "Graphic Design": 35,
    "Writing": 30,
    "Marketing": 38,
    "Consulting": 50,
  };

  useEffect(() => {
    const storedRates = JSON.parse(localStorage.getItem("savedRates")) || [];
    setSavedRates(storedRates);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateRate = (e) => {
    e.preventDefault();
    const baseRate = industryRates[formData.industry] || 20;
    const experienceMultiplier = formData.experience * 2;
    const effortMultiplier =
      formData.effort === "High" ? 2 : formData.effort === "Low" ? 0.8 : 1;
    const costOfLiving =
      parseFloat(formData.rent || 0) + parseFloat(formData.utilities || 0);
    const calculatedRate = baseRate + experienceMultiplier * effortMultiplier + costOfLiving / 100;
    setSuggestedRate(calculatedRate.toFixed(2));
  };

  const saveRate = () => {
    const newRate = {
      industry: formData.industry,
      experience: formData.experience,
      rate: suggestedRate,
    };
    const updatedRates = [...savedRates, newRate];
    setSavedRates(updatedRates);
    localStorage.setItem("savedRates", JSON.stringify(updatedRates));
  };

  const barChartData = {
    labels: savedRates.map((rate) => `${rate.industry} (${rate.experience} yrs)`),
    datasets: [
      {
        label: "Saved Rates (USD/hr)",
        data: savedRates.map((rate) => rate.rate),
        backgroundColor: ["#00abe4", "#f87171", "#fcbf49", "#3a86ff", "#8338ec"],
        borderColor: "#0077b6",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 animate__animated animate__fadeInDown">
        Rate Calculator
      </h2>
      <p className="text-center mb-4">Set competitive rates based on your experience and industry.</p>

      <form onSubmit={calculateRate} className="p-4 border rounded shadow-sm animate__animated animate__zoomIn">
        <div className="row mb-3">
          <div className="col-md-6">
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
          <div className="col-md-6">
            <label className="form-label">Industry</label>
            <select
              className="form-select"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            >
              {Object.keys(industryRates).map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
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
          <div className="col-md-3">
            <label className="form-label">Monthly Rent (USD)</label>
            <input
              type="number"
              className="form-control"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Monthly Utilities (USD)</label>
            <input
              type="number"
              className="form-control"
              name="utilities"
              value={formData.utilities}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
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

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Calculate Rate
        </button>
      </form>

      {suggestedRate && (
        <div className="alert alert-success mt-4 text-center animate__animated animate__bounceIn">
          Your suggested hourly rate is: <strong>${suggestedRate}/hr</strong>
          <button className="btn btn-sm btn-outline-dark ms-3" onClick={saveRate}>
            Save Rate
          </button>
        </div>
      )}

      <h3 className="text-center mt-5 animate__animated animate__fadeInUp">
        Saved Rates
      </h3>
      <div className="card p-4 shadow-sm">
        {savedRates.length > 0 ? (
          <Bar data={barChartData} />
        ) : (
          <p className="text-center">No saved rates yet. Calculate and save your rate!</p>
        )}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => window.location.href = "/dashboard"}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default RateCalculator;

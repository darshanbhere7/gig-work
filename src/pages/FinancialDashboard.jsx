import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "./../styles/FinancialDashboard.css";

Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const FinancialDashboard = () => {
  const navigate = useNavigate();
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  useEffect(() => {
    const storedIncome = JSON.parse(localStorage.getItem("income")) || [];
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setIncome(storedIncome);
    setExpenses(storedExpenses);
  }, []);

  const handleAddRecord = () => {
    if (!description || !amount) return;

    const newRecord = { description, amount: parseFloat(amount) };

    if (type === "income") {
      const updatedIncome = [...income, newRecord];
      setIncome(updatedIncome);
      localStorage.setItem("income", JSON.stringify(updatedIncome));
    } else {
      const updatedExpenses = [...expenses, newRecord];
      setExpenses(updatedExpenses);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    }

    setDescription("");
    setAmount("");
  };

  const handleDeleteRecord = (index, recordType) => {
    if (recordType === "income") {
      const updatedIncome = income.filter((_, i) => i !== index);
      setIncome(updatedIncome);
      localStorage.setItem("income", JSON.stringify(updatedIncome));
    } else {
      const updatedExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(updatedExpenses);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    }
  };

  const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);
  const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
  const balance = totalIncome - totalExpenses;
  const tax = (totalIncome - totalExpenses) * 0.15;

  const pieChartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#00abe4", "#f87171"],
        hoverBackgroundColor: ["#0077b6", "#e63946"],
      },
    ],
  };

  const barChartData = {
    labels: ["Income", "Expenses", "Tax"],
    datasets: [
      {
        label: "Financial Overview",
        data: [totalIncome, totalExpenses, tax],
        backgroundColor: ["#00abe4", "#f87171", "#fca311"],
        borderColor: ["#0077b6", "#e63946", "#fb8500"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 animate__animated animate__fadeInDown">
        Financial Dashboard
      </h2>

      {/* Add Record Form */}
      <div className="card p-4 mb-4 shadow-sm animate__animated animate__zoomIn">
        <h5>Add Financial Record</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={handleAddRecord}>
              Add Record
            </button>
          </div>
        </div>
      </div>

      {/* Income and Expense Lists */}
      <div className="row animate__animated animate__fadeInUp">
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h4>Income</h4>
            <ul className="list-group">
              {income.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between">
                  {item.description} - ₹{item.amount}
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRecord(index, "income")}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h4>Expenses</h4>
            <ul className="list-group">
              {expenses.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between">
                  {item.description} - ₹{item.amount}
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRecord(index, "expense")}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row mt-4 animate__animated animate__fadeIn">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h4 className="text-center mb-3">Pie Chart</h4>
            <Pie data={pieChartData} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h4 className="text-center mb-3">Bar Chart</h4>
            <Bar data={barChartData} />
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="mt-4 p-3 text-center bg-light rounded shadow-lg">
        <h5 className="text-success">Total Income: ₹{totalIncome}</h5>
        <h5 className="text-danger">Total Expenses: ₹{totalExpenses}</h5>
        <h5 className="text-warning">Estimated Tax (15%): ₹{tax}</h5>
        <h4 className={balance >= 0 ? "text-primary" : "text-danger"}>
          Final Balance: ₹{balance}
        </h4>
      </div>

      {/* Navigation */}
      <div className="d-flex justify-content-center mt-5">
        <button onClick={() => navigate("/dashboard")} className="btn btn-secondary px-4 py-2">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default FinancialDashboard;

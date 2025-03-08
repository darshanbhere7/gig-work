import React, { useState, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "./../styles/FinancialDashboard.css";

Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const FinancialDashboard = () => {
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

  const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);
  const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
  const balance = totalIncome - totalExpenses;

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
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Financial Overview",
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#00abe4", "#f87171"],
        borderColor: ["#0077b6", "#e63946"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 animate__animated animate__fadeInDown">
        Financial Dashboard
      </h2>

      <div className="card p-4 mb-4 shadow-sm animate__animated animate__zoomIn">
        <h5>Add Record</h5>
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
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="col-md-2">
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
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="row animate__animated animate__fadeInUp">
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h4>Income</h4>
            <ul className="list-group">
              {income.map((item, index) => (
                <li key={index} className="list-group-item">
                  {item.description} - ₹{item.amount}
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
                <li key={index} className="list-group-item">
                  {item.description} - ₹{item.amount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

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

      <div className="mt-4 p-3 text-center bg-light rounded shadow-lg">
        <h5 className="text-success">Total Income: ₹{totalIncome}</h5>
        <h5 className="text-danger">Total Expenses: ₹{totalExpenses}</h5>
        <h4 className={balance >= 0 ? "text-primary" : "text-danger"}>
          Balance: ₹{balance}
        </h4>
      </div>
    </div>
  );
};

export default FinancialDashboard;

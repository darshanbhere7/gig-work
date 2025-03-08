import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'chart.js/auto';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  useEffect(() => {
    const ctx = document.getElementById('earningsChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Earnings ($)',
          data: [1000, 1500, 2000, 2500, 3000],
          backgroundColor: '#00ABE4',
          borderColor: '#E9F1FA',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } }
      }
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome, {user?.name}!</h1>
      <p className="text-center">Manage your clients, track projects, and calculate rates with ease.</p>

      {/* Chart */}
      <div className="mt-4 p-4 bg-light rounded shadow-sm">
        <h3 className="text-center mb-3">Earnings Overview</h3>
        <canvas id="earningsChart" height="300"></canvas>
      </div>

      {/* Logout */}
      <div className="d-flex justify-content-center mt-5">
        <button onClick={handleLogout} className="btn btn-danger px-4 py-2">
          Logout
        </button>
      </div>
    </div>
  );
}

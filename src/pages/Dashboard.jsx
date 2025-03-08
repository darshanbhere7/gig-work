import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import Chart from 'chart.js/auto';
import { useRef } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const chartRef = useRef(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Completed', 'In Progress', 'Pending'],
          datasets: [{
            label: 'Project Status',
            data: [5, 3, 2],
            backgroundColor: ['#00ABE4', '#FFC107', '#FF5733'],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          }
        }
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const tools = [
    { name: 'Financial Dashboard', route: '/financial-dashboard' },
    { name: 'Rate Calculator', route: '/rate-calculator' },
    { name: 'Client Management', route: '/client-management' },
    { name: 'Skill Development', route: '/skill-development' },
  ];

  const recentActivities = [
    { id: 1, project: 'Project A', date: '2025-03-08', status: 'Completed' },
    { id: 2, project: 'Client X', date: '2025-03-07', status: 'In Progress' },
    { id: 3, project: 'Project B', date: '2025-03-06', status: 'Pending' }
  ];

  return (
    <div className="container my-5 animate__animated animate__fadeIn">
      <h1 className="text-center mb-4 text-primary fw-bold">Welcome, {user?.name}!</h1>

      {/* Quick Links */}
      <div className="row g-4">
        {tools.map((tool, idx) => (
          <div key={idx} className="col-md-6">
            <div className="card shadow-lg border-0 rounded-4 p-4 text-center">
              <h5 className="fw-bold">{tool.name}</h5>
              <button 
                className="btn btn-primary mt-3 w-100"
                onClick={() => navigate(tool.route)}
              >
                Explore {tool.name}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-5 p-4 bg-light rounded-4 shadow-lg">
        <h3 className="text-center mb-4 text-dark">Recent Activity</h3>
        <table className="table table-hover">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Project/Client</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr key={activity.id}>
                <th>{activity.id}</th>
                <td>{activity.project}</td>
                <td>{activity.date}</td>
                <td>
                  <span className={`badge ${
                    activity.status === 'Completed' ? 'bg-success' :
                    activity.status === 'In Progress' ? 'bg-warning' : 'bg-danger'
                  }`}>
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="mt-5 p-4 bg-white rounded-4 shadow-lg">
        <h3 className="text-center mb-4 text-dark">Project Overview</h3>
        <canvas ref={chartRef} className="w-100"></canvas>
      </div>

      {/* Logout */}
      <div className="d-flex justify-content-center mt-5">
        <button onClick={handleLogout} className="btn btn-danger px-5 py-2 rounded-pill fw-bold">
          Logout
        </button>
      </div>
    </div>
  );
}

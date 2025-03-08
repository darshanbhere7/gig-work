import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

export default function HomePage() {
  const chartData = {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [
      {
        data: [40, 30, 30],
        backgroundColor: ['#00abe4', '#f87171', '#ffcc00'],
        hoverBackgroundColor: ['#0077b6', '#e63946', '#ffaa00'],
      },
    ],
  };

  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <header className="text-center text-white bg-primary py-5 animate__animated animate__fadeInDown">
        <h1 className="display-3 fw-bold mb-3">Empower Your Freelance Journey</h1>
        <p className="lead">Manage your clients, finances, and projects — all in one place.</p>
        <div className="mt-4">
          <Link to="/signup" className="btn btn-light btn-lg me-3">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-outline-light btn-lg">
            Login
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="container text-center my-5 animate__animated animate__fadeInUp">
        <h2 className="fw-bold mb-4">Key Features</h2>
        <div className="row">
          {[
            { title: "Financial Dashboard", desc: "Track income, expenses, and taxes.", link: "/financial-dashboard" },
            { title: "Rate Calculator", desc: "Estimate project rates and hourly pricing.", link: "/rate-calculator" },
            { title: "Client Management", desc: "Manage clients, contracts, and invoices.", link: "/client-management" },
            { title: "Skill Development", desc: "Access courses and career growth tools.", link: "/skill-development" },
          ].map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-3 mb-4">
              <div className="card shadow-lg h-100">
                <div className="card-body">
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">{feature.desc}</p>
                  <Link to={feature.link} className="btn btn-primary">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Financial Overview */}
      <section className="bg-light py-5 text-center">
        <h2 className="fw-bold mb-4">Financial Overview</h2>
        <div className="d-flex justify-content-center">
          <div style={{ width: '300px' }}>
            <Pie data={chartData} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">What Our Users Say</h2>
          <div className="row">
            {[
              { name: "John Doe", review: "This platform changed my freelance game!" },
              { name: "Jane Smith", review: "Incredible tools for managing my clients." },
              { name: "Alex Johnson", review: "A must-have for every gig worker." },
            ].map((testimonial, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="card shadow-sm h-100 animate__animated animate__zoomIn">
                  <div className="card-body">
                    <p className="card-text">"{testimonial.review}"</p>
                    <h6 className="card-subtitle mt-2 text-muted">{testimonial.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-1">© 2025 Gig Worker Resource Hub</p>
        <div>
          <Link to="#" className="text-white me-3">Contact Us</Link>
          <Link to="#" className="text-white me-3">Privacy Policy</Link>
          <Link to="#" className="text-white">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}

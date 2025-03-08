import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

export default function HomePage() {
  const isLoggedIn = JSON.parse(localStorage.getItem('loggedInUser'));

  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <header className="text-center text-white bg-primary py-5">
        <h1 className="display-3 fw-bold mb-3 animate__animated animate__fadeInDown">
          Empower Your Freelance Journey
        </h1>
        <p className="lead animate__animated animate__fadeInUp">
          Manage your clients, finances, and projects — all in one place.
        </p>
        <div className="mt-4">
          <Link to="/signup" className="btn btn-light btn-lg me-3">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-outline-light btn-lg">
            Login
          </Link>
        </div>
      </header>

      {/* Key Features Section */}
      <section className="container text-center my-5">
        <h2 className="fw-bold mb-4 animate__animated animate__fadeInLeft">
          Key Features
        </h2>
        <div className="row">
          {[
            { title: 'Financial Dashboard', desc: 'Track income, expenses, and taxes.', link: '/financial-dashboard' },
            { title: 'Rate Calculator', desc: 'Estimate project rates and hourly pricing.', link: '/rate-calculator' },
            { title: 'Client Management', desc: 'Manage clients, contracts, and invoices.', link: '/client-management' },
            { title: 'Skill Development', desc: 'Access courses and career growth tools.', link: '/skill-development' },
          ].map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-3 mb-4 animate__animated animate__zoomIn">
              <div className="card shadow-lg h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{feature.title}</h5>
                  <p className="card-text">{feature.desc}</p>
                  <Link 
                    to={isLoggedIn ? feature.link : '/login'} 
                    className={`btn ${isLoggedIn ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {isLoggedIn ? 'Explore' : 'Login to Access'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4 animate__animated animate__fadeInRight">
            What Our Users Say
          </h2>
          <div className="row">
            {[
              { name: 'John Doe', review: 'This platform changed my freelance game!' },
              { name: 'Jane Smith', review: 'Incredible tools for managing my clients.' },
              { name: 'Alex Johnson', review: 'A must-have for every gig worker.' },
            ].map((testimonial, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="card shadow-sm border-0">
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

      {/* About and Contact Section */}
      <section className="container text-center my-5">
        <h2 className="fw-bold mb-4 animate__animated animate__fadeInUp">
          About Us
        </h2>
        <p className="lead">
          The Gig Worker Resource Hub is a one-stop solution for freelancers, helping you manage finances, track clients, and grow your career.
        </p>
      </section>

      {/* Footer
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-1">© 2025 Gig Worker Resource Hub</p>
        <div>
          <Link to="#" className="text-white me-3">Contact Us</Link>
          <Link to="#" className="text-white me-3">Privacy Policy</Link>
          <Link to="#" className="text-white">Terms of Service</Link>
        </div>
      </footer> */}
    </div>
  );
}

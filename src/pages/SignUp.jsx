import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profession: '',
    industry: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === formData.email);
    
    if (existingUser) {
      alert('User already exists! Please log in.');
    } else {
      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Sign up successful! Redirecting to Dashboard...');
      navigate('/dashboard');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-5 shadow-lg border-0 rounded-4 animate__animated animate__fadeInUp">
        <h2 className="text-center mb-4 fw-bold text-primary">Create Your Account</h2>
        
        <form onSubmit={handleSubmit}>
          {['name', 'email', 'password', 'confirmPassword', 'profession', 'industry'].map((field, index) => (
            <div key={index} className="mb-3">
              <label className="form-label text-capitalize">{field === 'confirmPassword' ? 'Confirm Password' : field}</label>
              <input 
                type={field.includes('password') ? 'password' : 'text'}
                className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={field !== 'profession' && field !== 'industry'}
              />
              {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-100 py-2 mt-3">Sign Up</button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="text-primary fw-bold">Login</Link>
        </p>
      </div>
    </div>
  );
}

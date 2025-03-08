import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', profession: '', industry: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
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
      alert('Sign up successful! Redirecting to login...');
      navigate('/login');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg border-0 rounded-4">
        <h2 className="text-center mb-4 fw-bold text-primary">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          {['name', 'email', 'password', 'profession', 'industry'].map((field, index) => (
            <div key={index} className="mb-3">
              <label className="form-label text-capitalize">{field}</label>
              <input 
                type={field === 'password' ? 'password' : 'text'}
                className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={field !== 'profession' && field !== 'industry'}
              />
              {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-100 py-2 mt-2">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

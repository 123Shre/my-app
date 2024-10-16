import { useState } from 'react';
import { useRouter } from 'next/router';
import './SignUp.css'; // Import the CSS file

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push('/auth/login'); // Navigate to login page on successful signup
    } else {
      alert('Signup failed');
    }
  };

  const navigateToLogin = () => {
    router.push('/auth/login'); // Navigate to login page
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="login-prompt">
          Already have an account?{' '}
          <span onClick={navigateToLogin} className="login-link" style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

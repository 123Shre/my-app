import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from Next.js
import './Profile.css'; // Import the CSS file

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    dob: '',
    contact: ''
  });

  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const getUserData = async () => {
      const email = localStorage.getItem('userEmail'); // Get email from local storage
      if (!email) {
        console.error('No email found in local storage');
        return;
      }

      const res = await fetch(`/api/profile?email=${encodeURIComponent(email)}`); // Send email as query parameter
      const data = await res.json();
      setUserData(data);
    };
    getUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('userEmail');
    if (!email) {
      console.error('No email found in local storage');
      return;
    }
    await fetch(`/api/profile?email=${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // Remove email from local storage
    router.push('/auth/login'); // Redirect to login page
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <h2>Profile</h2>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="age"
          value={userData.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />
        <input
          type="date"
          name="dob"
          value={userData.dob}
          onChange={handleChange}
          placeholder="Date of Birth"
          required
        />
        <input
          type="text"
          name="contact"
          value={userData.contact}
          onChange={handleChange}
          placeholder="Contact Information"
          required
        />
        <button type="submit">Update Profile</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </form>
      
    </div>
  );
};

export default Profile;

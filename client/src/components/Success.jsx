// src/components/Success.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const [userData, setUserData] = useState(null);  // To store GitHub user data
  const navigate = useNavigate();
  const location = useLocation();  // Corrected from 'locationn' to 'location'

  useEffect(() => {
    // Extract token from query params
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Store the token in localStorage
      localStorage.setItem('github_token', token);
      console.log('GitHub Token saved to localStorage:', token);

      // Fetch user information with the token
      axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setUserData(response.data);  // Save the user data to state
        console.log('GitHub User Data:', response.data);

        // Optionally, you could delay the redirection to allow showing the user data
        setTimeout(() => {
          navigate('/pull-requests');  // Navigate to the pull requests route
        }, 3000);  // Redirect after 3 seconds to show user data for a bit
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [location, navigate]);

  return (
    <div>
      <h2>Success! You're connected to GitHub.</h2>
      {userData ? (
        <div>
          <p>Welcome, {userData.login}!</p>
          <img src={userData.avatar_url} alt="Avatar" width="100" />
          <p>GitHub URL: <a href={userData.html_url} target="_blank" rel="noopener noreferrer">{userData.html_url}</a></p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Success;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SomeComponent = () => {
  const [pullRequests, setPullRequests] = useState([]);  // Use correct capitalization for setPullRequests
  useEffect(() => {
    const token = localStorage.getItem('github_token');
    console.log('Retrieved GitHub Token:', token);  // Log the token to check
    if (token) {
      axios.get('https://api.github.com/repos/ShivamSinha08/Auto-PR-Reviewer/pulls', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPullRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching PRs:', error);
      });
    }
  }, []);
  

  return (
    <div>
      <h2>Pull Requests:</h2>
      <ul>
        {pullRequests.map((pr) => (
          <li key={pr.id}>
            {pr.title} by {pr.user.login}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SomeComponent;

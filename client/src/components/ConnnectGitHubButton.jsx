import React from 'react';

// Access the client ID from Vite's environment variables
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3001/callback';  // This must match the URL set in your GitHub OAuth app

const ConnectGitHubButton = () => {
  const handleGitHubAuth = () => {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo`;
    window.location.href = authUrl;
  };

  return (
    <button onClick={handleGitHubAuth}>
      Connect GitHub
    </button>
  );
};

export default ConnectGitHubButton;

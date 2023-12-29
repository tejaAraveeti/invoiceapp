import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // Define state variables for form fields
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to handle signup form submission
  const handleSignup = async () => {
    // Create a data object with form field values
    const data = {
      username: username,
      name: name,
      email: email,
      password: password,
    };

    try {
      // Make a POST request to the signup API endpoint
      const response = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Handle the response from the server
      const responseData = await response.json();

      if (response.ok) {
        // If signup is successful, navigate to the login page
        console.log("Signup successful");
        navigate("/login"); // Use the navigate function to go to the login page
      } else {
        // If signup fails, you can display an error message to the user
        console.error("Signup failed:", responseData);
        // Display an error message or handle failure as needed
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center vh-100">
      <form className="p-4 border shadow w-100">
        {/* Username field */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Name field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password field */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Signup button */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSignup}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
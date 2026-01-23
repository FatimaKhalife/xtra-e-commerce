import React from "react";
import { useEffect, useState } from "react";
import "./signup.css";
import "../hero2/hero2.css";
import GoogleLoginButtun from "./googlebuttun";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  const ValidatePassword = (password: string) => password.length > 8;




  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!email || !password || !name)
      return setError("Please fill in all fields.");

    if (!ValidatePassword(password)) {
      return setError("Password must be at least 8 characters.");
    }


    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        return setError(data.message);
      }

      setError("Check your email to verify your account.")
      // window.location.href = "/login";
    } catch (err) {
      setLoading(false);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="signup-cont">
      <div className="signup">

        <form className="signup-form" onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />


          <p style={{ color: "rgb(236, 27, 27)" }}>{error}</p>
          <p className="login-note">
            Already have an account? <a href="/login">Log in</a>
          </p>

          <div >
            <button type="submit" className="partner-button">Sign Up</button>
          </div>
          <GoogleLoginButtun />

        </form>


      </div>
    </div>


  );
}

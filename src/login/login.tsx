import React, { type FormEvent } from "react";
import { useEffect, useState } from "react";
import GoogleLoginButton from "./googlebuttun";
import "./signup.css";
import "../hero2/hero2.css";
import { API_URL } from "../config";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // const [remember, setRemember] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [logged, setUserLoggedIn] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/auth/me`, { credentials: "include" })
            .then(res => res.json())
            .then(data => setUserLoggedIn(data.success));
    }, []);

    const validateInputs = () => {
        if (!password.trim() || !email.trim()) {
            setError("Please fill in all fields.");
            return false;
        }
     
        return true;
    }

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        if (!validateInputs()) return;
        try {
            const res = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password}),
            });
            console.log("why");

            const data = await res.json();
            setLoading(false);

            if (!res.ok) {

                return setError(data?.message || "login failed");
            }
            setSuccess("Logged in successfully");


            setTimeout(() => {
                window.location.href = "/";
            }, 700);

        } catch (err) {
             console.log("whyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
            setLoading(false);
            console.error("Login fetch error:", err);
            setError("Network error. Please try again.");
        }
    };



    return (
        <div className="signup-cont">
            <div className="signup">

                <form className="signup-form" onSubmit={handleLogin}>
                    <h2>Log In</h2>

                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}  required />
                    <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
{/* 
                    <label>
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}

                        />
                        <p>Remember me</p>
                       
                    </label> */}
                    <p className="login-note">
                        Don't have an account? <a href="/signup">Sign Up</a>
                    </p>

                    <div >
                        <button type="submit" className="partner-button">Login</button>
                    </div>

                    <p style={{ color: "rgb(236, 27, 27)" }}>{error}</p>
                    <GoogleLoginButton />

                </form>

            </div>
        </div>


    );
}

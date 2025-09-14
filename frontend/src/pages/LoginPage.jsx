import React from "react";
import "./LoginPage.css";
import { AuthForm } from "../components/AuthForm";

export function LoginPage({ loginData, setLoginData, handleLogin, error }) {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h1>BelajarYuk.</h1>
          <p>Let's Learning Something New Today</p>
          {/* You can add an illustration or image here */}
          <div className="mockup-img">
            {/* Example: <img src="/mockup.png" alt="App Mockup" /> */}
          </div>
          <div className="store-buttons">
            <img
              src="/google-play-badge.png"
              alt="Google Play"
              style={{ height: 40, marginRight: 8 }}
            />
            <img
              src="/app-store-badge.png"
              alt="App Store"
              style={{ height: 40 }}
            />
          </div>
        </div>
        <div className="login-right">
          <div className="login-form-title">Log in to BelajarYuk.</div>
          <div className="login-form-desc">
            Welcome back! Login with your data that you entered during
            registration
          </div>
          <button className="social-login-btn">
            <img
              src="/google-icon.svg"
              alt="Google"
              style={{ height: 20, marginRight: 8 }}
            />
            Login with Google
          </button>
          <button className="social-login-btn">
            <img
              src="/facebook-icon.svg"
              alt="Facebook"
              style={{ height: 20, marginRight: 8 }}
            />
            Login with Facebook
          </button>
          <div className="or-divider">or</div>
          {error && <div className="error">{error}</div>}
          <div className="login-form">
            <AuthForm
              type="login"
              formData={loginData}
              setFormData={setLoginData}
              onSubmit={handleLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

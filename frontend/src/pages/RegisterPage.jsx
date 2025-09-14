import React from "react";
import "./RegisterPage.css";
import { AuthForm } from "../components/AuthForm";

export function RegisterPage({
  registerData,
  setRegisterData,
  handleRegister,
  error,
}) {
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-left">
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
        <div className="register-right">
          <div className="register-form-title">Register to BelajarYuk.</div>
          <div className="register-form-desc">
            Create your account to get started
          </div>
          <button className="social-register-btn">
            <img
              src="/google-icon.svg"
              alt="Google"
              style={{ height: 20, marginRight: 8 }}
            />
            Register with Google
          </button>
          <button className="social-register-btn">
            <img
              src="/facebook-icon.svg"
              alt="Facebook"
              style={{ height: 20, marginRight: 8 }}
            />
            Register with Facebook
          </button>
          <div className="or-divider">or</div>
          {error && <div className="error">{error}</div>}
          <div className="register-form">
            <AuthForm
              type="register"
              formData={registerData}
              setFormData={setRegisterData}
              onSubmit={handleRegister}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

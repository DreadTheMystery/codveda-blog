import React from "react";
import { AuthForm } from "../components/AuthForm";

export function AuthPage({
  registerData,
  setRegisterData,
  handleRegister,
  loginData,
  setLoginData,
  handleLogin,
  error,
}) {
  return (
    <div className="auth-page">
      <h1>Codveda Blog</h1>
      {error && <div className="error">{error}</div>}
      <div className="auth-forms">
        <AuthForm
          type="register"
          formData={registerData}
          setFormData={setRegisterData}
          onSubmit={handleRegister}
        />
        <AuthForm
          type="login"
          formData={loginData}
          setFormData={setLoginData}
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
}

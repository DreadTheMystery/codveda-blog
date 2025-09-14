import React from "react";

export function AuthForm({ type, formData, setFormData, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="auth-form">
      <h2>{type === "register" ? "Register" : "Login"}</h2>
      {type === "register" && (
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">
        {type === "register" ? "Register" : "Login"}
      </button>
    </form>
  );
}

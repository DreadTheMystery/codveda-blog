import React, { useState, useEffect } from "react";
import "./App.css";
import {
  registerUser,
  loginUser,
  fetchPosts as fetchPostsApi,
  createPost,
} from "./api/api";
import { BlogPage } from "./pages/BlogPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";

function App() {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auth forms
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // Post form
  const [postData, setPostData] = useState({ title: "", content: "" });

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      const data = await fetchPostsApi();
      setPosts(data);
    } catch (err) {
      setError("Failed to load posts");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user, token]);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await registerUser(registerData);
      if (data.token) {
        setUser({ id: data.id, name: data.name, email: data.email });
        setToken(data.token);
        setRegisterData({ name: "", email: "", password: "" });
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser(loginData);
      if (data.token) {
        setUser({ id: data.id, name: data.name, email: data.email });
        setToken(data.token);
        setLoginData({ email: "", password: "" });
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  function handleLogout() {
    setUser(null);
    setToken("");
  }

  async function handleCreatePost(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await createPost(postData, token);
      if (data.id) {
        setPostData({ title: "", content: "" });
        fetchPosts();
      } else {
        throw new Error(data.message || "Failed to create post");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEditPost(id, data) {
    setError("");
    try {
      const result = await import("./api/api").then((m) =>
        m.updatePost(id, data, token)
      );
      if (result.id) {
        fetchPosts();
      } else {
        throw new Error(result.message || "Failed to update post");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeletePost(id) {
    setError("");
    try {
      const result = await import("./api/api").then((m) =>
        m.deletePost(id, token)
      );
      if (result.message === "Post deleted") {
        fetchPosts();
      } else {
        throw new Error(result.message || "Failed to delete post");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  if (user) {
    return (
      <BlogPage
        user={user}
        handleLogout={handleLogout}
        postData={postData}
        setPostData={setPostData}
        handleCreatePost={handleCreatePost}
        posts={posts}
        loading={loading}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
        error={error}
      />
    );
  }

  return (
    <>
      <HomePage
        onLoginClick={() => {
          setShowLogin(true);
          setShowRegister(false);
        }}
        onRegisterClick={() => {
          setShowRegister(true);
          setShowLogin(false);
        }}
        posts={posts}
      />
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowLogin(false)}>
              &times;
            </button>
            <LoginPage
              loginData={loginData}
              setLoginData={setLoginData}
              handleLogin={handleLogin}
              error={error}
            />
          </div>
        </div>
      )}
      {showRegister && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setShowRegister(false)}
            >
              &times;
            </button>
            <RegisterPage
              registerData={registerData}
              setRegisterData={setRegisterData}
              handleRegister={handleRegister}
              error={error}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";

const API = import.meta.env.VITE_API_URL;

function App() {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState("");
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// Auth forms
	const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
	const [loginData, setLoginData] = useState({ email: "", password: "" });

	// Post form
	const [postData, setPostData] = useState({ title: "", content: "" });

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${API}/posts`);
			const data = await res.json();
			setPosts(data);
		} catch (err) {
			setError("Failed to load posts");
		}
		setLoading(false);
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const res = await fetch(`${API}/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(registerData),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Registration failed");
			setUser({ id: data.id, name: data.name, email: data.email });
			setToken(data.token);
			setRegisterData({ name: "", email: "", password: "" });
		} catch (err) {
			setError(err.message);
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const res = await fetch(`${API}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(loginData),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Login failed");
			setUser({ id: data.id, name: data.name, email: data.email });
			setToken(data.token);
			setLoginData({ email: "", password: "" });
		} catch (err) {
			setError(err.message);
		}
	};

	const handleLogout = () => {
		setUser(null);
		setToken("");
	};

	const handleCreatePost = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const res = await fetch(`${API}/posts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(postData),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Failed to create post");
			setPostData({ title: "", content: "" });
			fetchPosts();
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="container">
			<h1>Codveda Blog</h1>
			{error && <div className="error">{error}</div>}
			{user ? (
				<>
					<div className="user-bar">
						<span>Welcome, {user.name}!</span>
						<button onClick={handleLogout}>Logout</button>
					</div>
					<form className="post-form" onSubmit={handleCreatePost}>
						<h2>Create Post</h2>
						<input
							type="text"
							placeholder="Title"
							value={postData.title}
							onChange={e => setPostData({ ...postData, title: e.target.value })}
							required
						/>
						<textarea
							placeholder="Content"
							value={postData.content}
							onChange={e => setPostData({ ...postData, content: e.target.value })}
							required
						/>
						<button type="submit">Post</button>
					</form>
				</>
			) : (
				<div className="auth-forms">
					<form onSubmit={handleRegister} className="auth-form">
						<h2>Register</h2>
						<input
							type="text"
							placeholder="Name"
							value={registerData.name}
							onChange={e => setRegisterData({ ...registerData, name: e.target.value })}
							required
						/>
						<input
							type="email"
							placeholder="Email"
							value={registerData.email}
							onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
							required
						/>
						<input
							type="password"
							placeholder="Password"
							value={registerData.password}
							onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
							required
						/>
						<button type="submit">Register</button>
					</form>
					<form onSubmit={handleLogin} className="auth-form">
						<h2>Login</h2>
						<input
							type="email"
							placeholder="Email"
							value={loginData.email}
							onChange={e => setLoginData({ ...loginData, email: e.target.value })}
							required
						/>
						<input
							type="password"
							placeholder="Password"
							value={loginData.password}
							onChange={e => setLoginData({ ...loginData, password: e.target.value })}
							required
						/>
						<button type="submit">Login</button>
					</form>
				</div>
			)}
			<div className="posts">
				<h2>Posts</h2>
				{loading ? (
					<div>Loading...</div>
				) : posts.length ? (
					posts.map(post => (
						<div className="post" key={post.id}>
							<h3>{post.title}</h3>
							<p>{post.content}</p>
							<div className="meta">
								<span>By {post.author_name}</span> | <span>{new Date(post.created_at).toLocaleString()}</span>
							</div>
						</div>
					))
				) : (
					<div>No posts yet.</div>
				)}
			</div>
		</div>
	);
}

export default App;

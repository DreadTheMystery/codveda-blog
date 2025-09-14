import React from "react";
import "./HomePage.css";

export function HomePage({
  onLoginClick,
  onRegisterClick,
  posts,
  user,
  onBackToBlog,
  showLogout,
  handleLogout,
}) {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-logo">Codveda Blog</div>
        <ul className="navbar-links">
          <li>
            <a href="#about">About Me</a>
          </li>
          <li>
            <a href="#posts">Important Posts</a>
          </li>
          {user ? (
            <>
              <li>
                <button className="nav-btn" onClick={onBackToBlog}>
                  Back to Blog
                </button>
              </li>
              {showLogout && (
                <li>
                  <button className="nav-btn logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              )}
            </>
          ) : (
            <>
              <li>
                <button className="nav-btn" onClick={onLoginClick}>
                  Login
                </button>
              </li>
              <li>
                <button className="nav-btn" onClick={onRegisterClick}>
                  Register
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <section className="hero-section">
        <h1>Welcome to Codveda Blog</h1>
        <p>Discover, learn, and share knowledge with the world.</p>
      </section>
      <section id="about" className="about-section">
        <h2>About Me</h2>
        <p>
          This is a sample blog platform built for learning and sharing ideas.
          Here you can find important posts, tutorials, and more.
        </p>
      </section>
      <section id="posts" className="important-posts-section">
        <h2>Important Posts</h2>
        <div className="important-posts-list">
          {posts && posts.length ? (
            posts.slice(0, 3).map((post) => (
              <div className="important-post-card" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content.slice(0, 100)}...</p>
                <div className="meta">
                  By {post.author_name} |{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div>No important posts yet.</div>
          )}
        </div>
      </section>
    </div>
  );
}

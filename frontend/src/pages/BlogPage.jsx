import React, { useState } from "react";
import "./BlogPage.css";
import { PostForm } from "../components/PostForm";
import { PostList } from "../components/PostList";
import { HomePage } from "./HomePage";

export function BlogPage({
  user,
  handleLogout,
  postData,
  setPostData,
  handleCreatePost,
  posts,
  loading,
  onEdit,
  onDelete,
  error,
}) {
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showHome, setShowHome] = useState(false);

  // Filter posts for "My Posts"
  const filteredPosts = showMyPosts
    ? posts.filter((p) => p.author_id === user.id)
    : posts;

  // Feedback/notification effect (auto-hide after 3s)
  React.useEffect(() => {
    if (error) setFeedback(error);
  }, [error]);
  React.useEffect(() => {
    if (feedback) {
      const t = setTimeout(() => setFeedback(""), 3000);
      return () => clearTimeout(t);
    }
  }, [feedback]);

  if (showHome) {
    return (
      <HomePage
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
        posts={posts}
        user={user}
        onBackToBlog={() => setShowHome(false)}
        showLogout={true}
        handleLogout={handleLogout}
      />
    );
  }

  return (
    <div className="blog-page">
      <nav className="navbar">
        <div className="navbar-logo">Codveda Blog</div>
        <ul className="navbar-links">
          <li>
            <button
              className="nav-btn"
              onClick={() => {
                setShowHome(true);
                setShowMyPosts(false);
              }}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`nav-btn${showMyPosts ? " active" : ""}`}
              onClick={() => setShowMyPosts(true)}
            >
              My Posts
            </button>
          </li>
          <li>
            <a className="nav-btn" href="#create-post">
              Create Post
            </a>
          </li>
          <li>
            <button className="nav-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <section className="welcome-section">
        <div className="welcome-avatar">{user.name[0].toUpperCase()}</div>
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>Share your thoughts or explore what others are saying.</p>
        </div>
      </section>
      {feedback && <div className="feedback-bar">{feedback}</div>}
      <section id="create-post" className="create-post-section">
        <h3>Create a New Post</h3>
        <PostForm
          postData={postData}
          setPostData={setPostData}
          onSubmit={handleCreatePost}
        />
      </section>
      <section className="posts-section">
        <h3>{showMyPosts ? "My Posts" : "All Posts"}</h3>
        <PostList
          posts={filteredPosts}
          loading={loading}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </section>
    </div>
  );
}

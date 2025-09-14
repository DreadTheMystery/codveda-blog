import React from "react";

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.content.slice(0, 120)}...</p>
      <div className="meta">
        By {post.author_name} | {new Date(post.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}

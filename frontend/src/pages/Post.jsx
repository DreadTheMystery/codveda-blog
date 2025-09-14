import React from "react";
import { useParams } from "react-router-dom";

export default function Post({ posts }) {
  const { id } = useParams();
  const post = posts.find((p) => String(p.id) === id);
  if (!post) return <div>Post not found.</div>;
  return (
    <div className="single-post-page">
      <h1>{post.title}</h1>
      <div className="meta">
        By {post.author_name} | {new Date(post.created_at).toLocaleDateString()}
      </div>
      <p>{post.content}</p>
    </div>
  );
}

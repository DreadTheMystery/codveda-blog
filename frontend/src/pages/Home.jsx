import React from "react";
import PostCard from "../components/PostCard";

export default function Home({ posts }) {
  return (
    <div className="home-page">
      <h1>All Blog Posts</h1>
      <div className="posts-list">
        {posts && posts.length ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div>No posts yet.</div>
        )}
      </div>
    </div>
  );
}

import React from "react";

export function PostForm({ postData, setPostData, onSubmit }) {
  return (
    <form className="post-form" onSubmit={onSubmit}>
      <h2>Create Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Content"
        value={postData.content}
        onChange={(e) => setPostData({ ...postData, content: e.target.value })}
        required
      />
      <button type="submit">Post</button>
    </form>
  );
}

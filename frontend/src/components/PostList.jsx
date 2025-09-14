import React, { useState } from "react";

export function PostList({ posts, loading, user, onEdit, onDelete }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });

  const startEdit = (post) => {
    setEditId(post.id);
    setEditData({ title: post.title, content: post.content });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    onEdit(editId, editData);
    setEditId(null);
    setEditData({ title: "", content: "" });
  };

  return (
    <div className="posts">
      <h2>Posts</h2>
      {loading ? (
        <div>Loading...</div>
      ) : posts.length ? (
        posts.map((post) => (
          <div className="post" key={post.id}>
            {editId === post.id ? (
              <form onSubmit={handleEdit} className="edit-form">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  required
                />
                <textarea
                  value={editData.content}
                  onChange={(e) =>
                    setEditData({ ...editData, content: e.target.value })
                  }
                  required
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <div className="meta">
                  <span>By {post.author_name}</span> |{" "}
                  <span>{new Date(post.created_at).toLocaleString()}</span>
                </div>
                {user && user.id === post.author_id && (
                  <div className="post-actions">
                    <button onClick={() => startEdit(post)}>Edit</button>
                    <button onClick={() => onDelete(post.id)}>Delete</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      ) : (
        <div>No posts yet.</div>
      )}
    </div>
  );
}

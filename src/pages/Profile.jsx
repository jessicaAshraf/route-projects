
import React, { useEffect, useState, useContext } from "react";
import { apiServices } from "../services/api";
import { authContext } from "../contexts/authContext";

export default function Profile() {
  const { userToken } = useContext(authContext);
  const [profile, setProfile] = useState({ user: {}, posts: [] });
  const [loading, setLoading] = useState(true);

 
  async function fetchProfile() {
    if (!userToken) return;
    apiServices.setToken(userToken);
    try {
      const data = await apiServices.getProfile(); 
      console.log("Profile data:", data.data);
      
  
      setProfile({
        user: data.data.user || {},
        posts: data.data.posts || []
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [userToken]);

 
  async function handleDeletePost(postId) {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await apiServices.deletePost(postId);
      fetchProfile();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  async function handleUpdatePost(postId, currentBody) {
    const newBody = prompt("Update post text", currentBody);
    if (!newBody) return;
    try {
      await apiServices.updatePost(postId, { body: newBody });
      fetchProfile();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }


  async function handleDeleteComment(postId, commentId) {
    try {
      await apiServices.deleteComment(postId, commentId);
      fetchProfile();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  
  async function handleUpdateComment(postId, commentId, currentContent) {
    const newContent = prompt("Update comment", currentContent);
    if (!newContent) return;
    try {
      await apiServices.updateComment(postId, commentId, { content: newContent });
      fetchProfile();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">{profile.user.name}'s Profile</h1>
      <p className="mb-4">{profile.user.email}</p>

      <h2 className="text-xl font-bold mb-2">My Posts</h2>

      {profile.posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        profile.posts.map((post) => (
          <div key={post._id} className="p-4 mb-4 border rounded-lg">
            <p>{post.body}</p>
            {post.image && (
              <img src={post.image} alt="Post" className="max-w-full my-2" />
            )}
            <div className="flex gap-2 mt-2">
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDeletePost(post._id)}
              >
                Delete Post
              </button>
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => handleUpdatePost(post._id, post.body)}
              >
                Update Post
              </button>
            </div>

            {post.comments && post.comments.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Comments:</h3>
                {post.comments.map((comment) => (
                  <div key={comment._id} className="ml-4 mt-2 border-l-2 pl-2">
                    <p>{comment.content}</p>
                    <div className="flex gap-2 mt-1">
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDeleteComment(post._id, comment._id)}
                      >
                        Delete Comment
                      </button>
                      <button
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                        onClick={() =>
                          handleUpdateComment(
                            post._id,
                            comment._id,
                            comment.content
                          )
                        }
                      >
                        Update Comment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
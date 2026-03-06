import React from 'react'
import LoadingScreen from '../components/LoadingScreen'
import {useContext ,useEffect,useState} from 'react'
import{apiServices} from "../services/api"
import Post from "../components/Post"
import { authContext } from "../contexts/authContext";
import axios from "axios";
export default function Feed() {
  const {userToken}=useContext(authContext)
  const[posts,setPosts]=useState([])
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);    // الصورة
  const [loading, setLoading] = useState(false);
  async function getPosts() {
    if (!userToken) return;
    apiServices.setToken(userToken);
    const data= await apiServices.getPosts()
    setPosts(data.data.posts)
  }

useEffect(()=>{
  getPosts()
},[userToken])

 async function handleCreatePost(e) {
  e.preventDefault();
  if (!newPostContent.trim()) return;

  setLoading(true);
  apiServices.setToken(userToken);
  try {
    await apiServices.createPost({ body: newPostContent, image: newPostImage });
    setNewPostContent("");
    setNewPostImage(null);
    getPosts(); 
  } catch (err) {
    console.error(err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
}
  return (
      <div className="max-w-xl mx-auto py-10 grid-6">
      {/* Create Post Form */}
     <form onSubmit={handleCreatePost} className="mb-6">
  <textarea
    className="w-full p-3 rounded-lg border"
    placeholder="What's on your mind?"
    value={newPostContent}
    onChange={(e) => setNewPostContent(e.target.value)}
  />
  <input
    type="file"
    onChange={(e) => setNewPostImage(e.target.files[0])}
    className="mt-2"
  />
  <button
    type="submit"
    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
    disabled={loading}
  >
    {loading ? "Posting..." : "Post"}
  </button>
</form>

      {/* Posts List */}
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
}

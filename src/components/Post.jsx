import React, { useState, useContext } from "react";
import commentIcon from "../assets/comment-5-svgrepo-com.svg"
import avatar from "../assets/avatar.jpg"
import {Link} from 'react-router-dom'
import { apiServices } from "../services/api";
import { authContext } from "../contexts/authContext";
export default function Post({post,comments, showMoreComments = true}) {
  const { userToken } = useContext(authContext);
   const [commentText, setCommentText] = useState("");
  const [postComments, setPostComments] = useState(comments || []);
   async function handleAddComment(e) {
    e.preventDefault();
    if (!commentText.trim() || !userToken) return;

    apiServices.setToken(userToken);

    try {
      const data = await apiServices.createComment(post._id, { content: commentText });
      setPostComments((prev) => [...prev, data.data.comment]);
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <article className="mb-4 break-inside p-6 rounded-xl bg-gray-100 shadow dark:bg-slate-800 flex flex-col bg-clip-border  w-full">
            {/*post header*/}
  <div className="flex pb-6 items-center justify-between">
    <div className="flex">
      <a className="inline-block mr-4" href="#">
        <img onError={(e)=>e.target.src=avatar} className="rounded-full max-w-none w-12 h-12 object-cover" src={post.user.photo} />
      </a>
      <div className="flex flex-col">
        <div>
          <a className="inline-block text-lg font-bold dark:text-white" href="#">{post.user.name}</a>
        </div>
        <div className="text-slate-500 dark:text-slate-300 ">
          July 17, 2018
        </div>
      </div>
    </div>
  </div>

{/*post bodyr*/}
<>
  <h2 className="text-xl font-medium dark:text-white">
   {post.body}
  </h2>
  <div className="py-4">
    <img className="max-w-full rounded-lg" src={post.body} />
  </div>
</>
 {/*post footer*/}
  <div className="py-4 flex gap-4">
    <span className="inline-flex items-center" >
      <span className="mr-2">
        <svg className="fill-rose-600 dark:fill-rose-400" style={{width: 24, height: 24}} viewBox="0 0 24 24">
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
          </path>
        </svg>
      </span>
      <span className="text-lg font-bold">{post.commentsCount}</span>
    </span>
     <span className="inline-flex items-center" >
      <span className="mr-2">
       <img src={commentIcon} className='w-5' alt="" />
      </span>
      <span className="text-lg font-bold">{post.likesCount}</span>
    </span>
  </div>
  

  {/*comment input*/}
   {/* Comment Input */}
      <form onSubmit={handleAddComment} className="relative mt-4">
        <input
          className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg font-medium pr-20"
          type="text"
          placeholder="Write a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-2/4 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white rounded-lg"
        >
          Comment
        </button>
      </form>
 
 
 
  {/* Comments content */}
  <div className="pt-6">
   {/* Comments content */}
<div className="pt-6">
  {comments && comments.length > 0 ? (
    comments.map((comment) => (
      <div key={comment._id} className="media flex pb-4">
        <a className="mr-4" href="#">
          <img onError={(e) => e.target.src = avatar} className="rounded-full max-w-none w-12 h-12" src={comment.commentCreator.photo} />
        </a>
        <div className="media-body">
          <div>
            <a className="inline-block text-base font-bold mr-2" href="#">{comment.commentCreator.name}</a>
            <span className="text-slate-500 dark:text-slate-300">25 minutes ago</span>
          </div>
          <p>{comment.content}</p>
        </div>
      </div>
    ))
  ) : post.topComment ? (
    <div className="media flex pb-4">
      <a className="mr-4" href="#">
        <img onError={(e)=>e.target.src=avatar} className="rounded-full max-w-none w-12 h-12" src={post.topComment.commentCreator.photo} />
      </a>
      <div className="media-body">
        <div>
          <a className="inline-block text-base font-bold mr-2" href="#">{post.topComment.commentCreator.name}</a>
          <span className="text-slate-500 dark:text-slate-300">25 minutes ago</span>
        </div>
        <p>{post.topComment.content}</p>
      </div>
    </div>
  ) : null}
</div>
   

    {/* More comments btn*/}
    {showMoreComments && post.commentsCount > 1 && (
  <div className="w-full">
    <Link 
      to={"/post/" + post._id} 
      className="py-3 px-4 w-full block bg-slate-300 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75"
    >
      Show more comments
    </Link>
  </div>
)}
   
  </div>

</article>
  )
}
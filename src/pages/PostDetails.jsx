import {useContext,useEffect,useState} from 'react'
import{useParams} from "react-router-dom"
import { authContext } from "../contexts/authContext";
import Post from "../components/Post"
import{apiServices} from "../services/api"
import LoadingScreen from "../components/LoadingScreen"
export default function PostDetails() {
  const {userToken}=useContext(authContext)
  let {postId}= useParams()
  const[post,setPost]=useState(null)
 
  const [comments, setComments] = useState([]);


  async function getPostDetails() {
    const data=await apiServices.getPostDetails(postId)
    setPost(data.data.post);
  }

  async function getPostComments() {
    const data=await apiServices.getPostComments(postId)
    setComments(data.data.comments);
  }


  useEffect(()=>{
    getPostDetails()
    getPostComments()
  },[])
  return (
   <div className='max-w-2xl mx-auto py-10 '>
    {post==null ? <LoadingScreen/> :
    <Post post={post} comments={comments} showMoreComments={false}/>
    }
   </div>
  )
}

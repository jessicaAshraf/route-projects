import {useContext,useState} from 'react'
import {Input ,Select, SelectItem,Button} from "@heroui/react";
import {EyeSlashFilledIcon} from '../components/password/EyeSlashFilledIcon';
import {EyeFilledIcon} from '../components/password/EyeFilledIcon';
import { useForm } from "react-hook-form"
import {zodResolver } from "@hookform/resolvers/zod"
import{schema} from "../validation/signInFormValidation"
import axios from 'axios';
import {Alert} from "@heroui/react";
import{Link} from 'react-router-dom';
import { authContext } from "../contexts/authContext";
import{apiServices} from "../services/api"

export default function SignIn() {
    const [IsLoading,setIsloading]=useState(false)
    const [errMsg,setErrMsg]=useState("")
   
   const{setUserToken}=useContext(authContext)

    const {handleSubmit,register,formState:{errors}} =useForm({
          resolver: zodResolver(schema),
         
     })

      const [isVisible, setIsVisible] = useState(false);
     const toggleVisibility = () => setIsVisible(!isVisible);

   async function signIn(loginData){
       setIsloading(true)
       setErrMsg("")
        try {
          localStorage.setItem("token", data.data.token);
         apiServices.setToken(data.data.token);
         setUserToken(data.data.token);
            
        } catch (error) {
          if(error.response){
            setErrMsg(error.response.data.errors)
          }
          else{
            setErrMsg(error.message)
          }
        }finally{
          setIsloading(false)
        }
         
    }


  function getInputProps(label,type,field){
    return{
      variant:"bordered",
      label,
      type,
      isInvalid:!!field,
      errorMessage:field?.message
    }
  }

  return (
    <form onSubmit={handleSubmit(signIn)}>
      <div className='grid gap-4'>
      <div className="grid gap-3 text-center">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
      <p>Sign in to continue your journey</p>
      </div>
 
      <Input  {...register("email")} {...getInputProps("Email","email",errors.email)} />
      <Input  {...register("password")} {...getInputProps("Password",isVisible? "text" : "password",errors.password)}  endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-solid outline-transparent"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }/>
     
      
      <Button isLoading={IsLoading} type='sumbit' color='primary'>Sign In</Button>
     <p>U don't have an account? <Link to={"/signup"}>Create one now</Link></p>
      {errMsg&&<Alert hideIcon color="danger" title={errMsg} variant="faded" classNames={{base:"py-0 capitalize text-center"}}/>}
    </div>
    </form>
  )
}

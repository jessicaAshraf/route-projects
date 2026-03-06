import React , {useState} from 'react'
import {Input ,Select, SelectItem,Button} from "@heroui/react";
import {EyeSlashFilledIcon} from '../components/password/EyeSlashFilledIcon';
import {EyeFilledIcon} from '../components/password/EyeFilledIcon';
import { useForm } from "react-hook-form"
import {zodResolver } from "@hookform/resolvers/zod"
import{schema} from "../validation/signUpFormValidation"
import axios from 'axios';
import {Alert} from "@heroui/react";
import{useNavigate,Link} from 'react-router-dom';
import {apiServices} from "../services/api"
import { authContext } from "../contexts/authContext";
import { addToast } from "@heroui/toast";
export default function SignUp() {
    const [IsLoading,setIsloading]=useState(false)
    const [errMsg,setErrMsg]=useState("")
    const navigate= useNavigate()
  const {handleSubmit,register,formState:{errors}} =useForm({
          resolver: zodResolver(schema),
         
     })


   const [isVisible, setIsVisible] = useState(false);
   const toggleVisibility = () => setIsVisible(!isVisible);
  
  
   async function signUp(registerData){
       setIsloading(true)
       setErrMsg("")
        try {
           await apiServices.signUp(registerData)
         
         addToast({
              title: "Success",
              description: "Account Created Successfully",
              color: "success",
            })
            navigate("/signin")
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
    <form onSubmit={handleSubmit(signUp)}>
      <div className='grid gap-4'>
      <div className="grid gap-3 text-center">
        <h1 className="text-3xl font-bold">Join US Today</h1>
      <p>Create your account and start connecting</p>
      </div>
      <Input  {...register("name")} {...getInputProps("Full Name","text",errors.name)} />
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
      <Input  {...register("rePassword")} {...getInputProps("Confirm Password",isVisible? "text" : "password",errors.rePassword)} />
      <Input  {...register("dateOfBirth")} {...getInputProps("Birth Date" ,"date",errors.dateOfBirth)} />
       <Select  {...register("gender")} {...getInputProps("Gender",undefined,errors.gender)} >
      
          <SelectItem key="male">Male</SelectItem>
          <SelectItem key="female">Female</SelectItem>
      </Select>
      <Button isLoading={IsLoading} type='sumbit' color='primary'>Sign Up</Button>
      <p>Already have an account? <Link to={"/signin"}>Login Now</Link></p>
      {errMsg&&<Alert hideIcon color="danger" title={errMsg} variant="faded" classNames={{base:"py-0 capitalize text-center"}}/>}
    </div>
    </form>
  )
}

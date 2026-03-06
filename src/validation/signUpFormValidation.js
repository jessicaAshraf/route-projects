import{regex} from "./regex"
import{calculateAge} from "../helpers/date"
import * as zod from "zod"

export const schema=zod.object({
         name:zod.string().nonempty("Name is required").min(2,"Name must be at least two characters").max(50,"Name must be at most 50 characters"),
         email:zod.string().nonempty("Email is required").regex(regex.emailRegex,"enter valid email"),
         password:zod.string().nonempty("Password is required").regex(regex.passwordRegex,"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
         rePassword:zod.string().nonempty("Confirm Password is required"),
         dateOfBirth:zod.string().nonempty("Birth Date is required").refine((date)=> calculateAge(date) >=18 ,"Age must be more than or equal 18"),
         gender:zod.string().nonempty("Gender is required").regex(/^(male|female)$/,"Gender must be one of (male,female)")

    }).refine((data) => data.password === data.rePassword, {
  message: "Password and Confirm password must be the same",
  path: ["rePassword"]
});







import{regex} from "./regex"

import * as zod from "zod"

export const schema=zod.object({
         email:zod.string().nonempty("Email is required").regex(regex.emailRegex,"enter valid email"),
         password:zod.string().nonempty("Password is required").regex(regex.passwordRegex,"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
         
    })
import { NextApiRequest, NextApiResponse } from "next";
import User from "@models/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";


// register
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === "POST") {
    const data = request.body;

    for(let i = 0; i < data.length; i++){
        const {
            email,
            password,
            admin,
            contributor,
            moderator,
            name,
            bio,
            birthdate,
            city,
            state,
          } = data[i];
    
          // Validation
         if( !email || !password  || email === ""|| password === ""){
            return response.status(400).json({ message: "Please include all fields" });
          }
    
        await dbConnect();
    
        //Find if User Already Exists
        const userExists = await User.findOne({email})
    
        if(userExists) {
          return response.status(400).json({ message: "Email already exists" });
        }
        // Check That Passwords Match
        // Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const user = await User.create({
          email,
          password: hashedPassword,
          admin,
          contributor,
          moderator,
          name,
          bio,
          birthdate,
          city,
          state,
        });
    } 
    
    return response.status(200);
   
  }
}

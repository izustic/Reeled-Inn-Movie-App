import {Request, Response} from 'express'
import { UserInstance } from '../model/userModel'
import {v4 as uuidv4} from 'uuid'
import { registerUserSchema, options, loginUserSchema } from '../utils/utils'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { MovieInstance } from '../model/movieModel'

const jwtsecret = process.env.JWT_SECRET as string 


/* ===============USER API ============== */

// export const Register = async(req:Request, res:Response) => {
//    try{
//         const {email, fullname, username, password, confirm_password} = req.body
//         const iduuid = uuidv4()

//         //Validate with Joi. Ensure you're getting string for email and firstname
//         const validationResult = registerUserSchema.validate(req.body, options)

//         if(validationResult.error){
//             return res.status(400).json({Error:validationResult.error.details[0].message})
//         }

//         //Hash password
//         const passwordHash = await bcrypt.hash(password, 8)

//         //Generate salt to id the user

//         //Create user
//         //Check if user exists
//         const user = await UserInstance.findOne({
//             where:{email:email}
//         })

//         if(!user){
//             let newUser = await UserInstance.create({
//                     id: iduuid,
//                     email,
//                     fullname,
//                     username,
//                     password: passwordHash
//                 })
            
//             //Generate token for user using user id
//             const User = await UserInstance.findOne({
//                 where:{email:email}
//             }) as unknown as {[key:string]:string}
            
//             const {id} = User

//             const token = jwt.sign({id}, jwtsecret, {expiresIn: "30mins"})



//             // res.cookie('token', token, {httpOnly:true, maxAge: 30 * 60 * 1000})

//             //otp verification

//             //Email?

//             return res.status(201).json({
//                 msg: "user created successfulyy",
//                 newUser,
//                 token
//             }) 


//         }

//             res.status(409).json({
//                 error: "email already taken"
//             })

//    } catch(err){
//         res.status(500).json({Error:"Internal server error"})
//    }
// }


// export const Login = async(req:Request, res:Response) => {
//     console.log('Herrr Strauss')
//     try{
//         const {email,password} = req.body

//         //Validate with Joi. Ensure you're getting string for email and firstname
//         const validationResult = loginUserSchema.validate(req.body, options)

//         if(validationResult.error){
//             return res.status(400).json({Error:validationResult.error.details[0].message})
//         } 

//         //Generate token for user using user id
//         const User = await UserInstance.findOne({
//             where:{email:email}
//         }) as unknown as {[key:string]:string}
        
//         const {id} = User

//         const token = jwt.sign({id}, jwtsecret, {expiresIn: "30d"})

//         // res.cookie('token', token, {httpOnly:true, maxAge: 30 * 24 * 60 * 60 * 1000})

//         const validUser = await bcrypt.compare(password, User.password)
//         if(validUser){
//             return res.status(201).json({
//                 msg: "You have successfully logged in",
//                 User,
//                 token
//             }) 
//         } 
//         return res.status(400).json({Error: "Invalid email/password"})


//     }catch(err){
//         res.status(500).json({Error:"Internal server error"})
//        }

// }

// export const getUserAndMovie = async (req:Request, res:Response) => {
//     try{
//         //sequelize findAll or findAndCountAll

//         const getAllUser = await UserInstance.findAndCountAll(
//          {   include: [
//                 {
//                     model: MovieInstance,
//                     as: "movie"
//                 }
//             ]
//         }
//         )
//         return res.status(200).json({
//             msg: "You have successfully retrieved all data",
//             count: getAllUser.count, 
//             users: getAllUser.rows
//         }) 
        
//     } catch(err){
//         console.log(err)
//     }
// }



/* ======================= EJS =================== */


export const Register = async(req:Request, res:Response) => {
    try{
         const {email, fullname, username, password, confirm_password} = req.body
         const iduuid = uuidv4()
 
         //Validate with Joi. Ensure you're getting string for email and firstname
         const validationResult = registerUserSchema.validate(req.body, options)
 
         if(validationResult.error){
            return res.render('register', {error:validationResult.error.details[0].message})
         }
 
         //Hash password
         const passwordHash = await bcrypt.hash(password, 8)
 
         //Generate salt to id the user
 
         //Create user
         //Check if user exists
         const user = await UserInstance.findOne({
             where:{email:email}
         })
 
         if(!user){
            let newUser = await UserInstance.create({
                    id: iduuid,
                    email,
                    fullname,
                    username,
                    password: passwordHash
                })
             
             //Generate token for user using user id
             const User = await UserInstance.findOne({
                 where:{email:email}
             }) as unknown as {[key:string]:string}
             
             const {id} = User
 
             const token = jwt.sign({id}, jwtsecret, {expiresIn: "30mins"})
 
            // return  res.cookie('token', token, {httpOnly:true, maxAge: 30 * 60 * 1000})
 
             //otp verification
 
             //Email?
 
            return res.redirect("/login")

         }
 
         return res.render('register', {error: "email is already taken"})
 
    } catch(err){
        console.log(err)
    }
 }
 
 
 export const Login = async(req:Request, res:Response) => {
     try{
         const {email,password} = req.body
 
         //Validate with Joi. Ensure you're getting string for email and firstname
         const validationResult = loginUserSchema.validate(req.body, options)
 
         if(validationResult.error){
            return res.render('login', {error:validationResult.error.details[0].message})
         } 
 
         //Generate token for user using user id
         const User = await UserInstance.findOne({
             where:{email:email}
         }) as unknown as {[key:string]:string}
         
         const {id} = User
 
         const token = jwt.sign({id}, jwtsecret, {expiresIn: "30d"})
 
         res.cookie('token', token, {httpOnly:true, maxAge: 30 * 24 * 60 * 60 * 1000})
 
         const validUser = await bcrypt.compare(password, User.password)
         if(validUser){
            return res.redirect('/dashboard')
         } 
         return res.render('login', {error:"Invalid email/password"})
 
 
     }catch(err){
         console.log(err)
        }
 
 }
 
 export const getUserAndMovie = async (req:Request, res:Response) => {
     try{
         //sequelize findAll or findAndCountAll
 
         const getAllUser = await UserInstance.findAndCountAll(
          {   include: [
                 {
                     model: MovieInstance,
                     as: "movie"
                 }
             ]
         }
         )
         return res.status(200).json({
             msg: "You have successfully retrieved all data",
             count: getAllUser.count, 
             users: getAllUser.rows
         }) 
         
     } catch(err){
         console.log(err)
     }
 }
 
 export const Logout = async (req:Request, res:Response) => {
    res.clearCookie('token')
    res.redirect('/')
 }
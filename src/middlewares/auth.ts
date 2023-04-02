import { NextFunction } from 'connect'
import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import { UserInstance } from '../model/userModel'

const jwtsecret = process.env.JWT_SECRET as string 


/* =========================== API MIDDLEWARE ======================= */
// export async function auth(req:Request |  any, res:Response, next: NextFunction): Promise<unknown>{
//     try{
//         //req.cookies.jwt
//         const authorization = req.headers.authorization

//         // const authorization = req.cookies.jwt //using cookies

//         if(!authorization){
//             return res.status(401).json({error: "Kindly sign in as a user"})
//         }

//         const token = authorization.slice(7, authorization.length);

//         let verified = jwt.verify(token, jwtsecret)

//         // let verified = jwt.verify(authorization, jwtsecret)

//         if(!verified){
//             return res.status(401).json({error: "Token invalid. You can't access this route"})
//         }

//         const {id} = verified as {[key:string]: string}

//         //find user by id - in mongoose
//         const user = await UserInstance.findOne({where: {id}})

//         if(!user){
//             return res.status(401).json({error: "Kindly sign in as a user"})
//         }

//         req.user = verified
//         next()

//     } catch(err){
//         res.status(401).json({error:"User not logged in"})
//     }
// }


/* ================= EJS MIDDLEWARE ================ */


export async function auth(req:Request |  any, res:Response, next: NextFunction): Promise<unknown>{
    try{
        //req.cookies.jwt
        const authorization = req.cookies.token

        // const authorization = req.cookies.jwt //using cookies

        if(!authorization){
            // return res.status(401).json({error: "Kindly sign in as a user"})
            return res.redirect('/login')
        }

        // const token = authorization.slice(7, authorization.length);

        let verified = jwt.verify(authorization, jwtsecret)

        // let verified = jwt.verify(authorization, jwtsecret)

        if(!verified){
            // return res.status(401).json({error: "Token invalid. You can't access this route"})
            return res.redirect('/login')
        }

        const {id} = verified as {[key:string]: string}

        //find user by id - in mongoose
        const user = await UserInstance.findOne({where: {id}})

        if(!user){
            // return res.status(401).json({error: "Kindly sign in as a user"})
            return res.redirect('/login')
        }

        req.user = verified
        next()

    } catch(err){
        // res.status(401).json({error:"User not logged in"})
        return res.redirect('/login')
    }
}

import { User } from "../models/User.js"
import bcrypt  from "bcrypt"
import jwt from "jsonwebtoken"
import { Op } from "sequelize"


export const signup = async(req,res) =>{
    try {
     const {email, username, password,color} = req.body
     const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
     const newUser = await User.create({
        email, 
        username, 
        color,
        password:passwordHash
     })
     const token = jwt.sign({
        name: username,
        id: newUser.id
    }, 'test-juan-vega')
        res.header('auth-token', token).header('userId',newUser.id).json({
            error: null,
            data: {token},
            userId:newUser.id,
            newUser
        })
    } catch (error) {
     console.error(error)
     return res.status(500).json({
         message:'Email or username already exists!',
         error})
    }
    
 }
 export const login = async(req,res) =>{
    try {
     const {email, username, password} = req.body
     const user = await User.findOne({
        where:{
            [Op.or]: [
                { email: email },
                { username: username }
              ]
        }
     })
     if(!user)return res.status(400).json({ error: 'Invalid username or email' });
     const validPassword = await bcrypt.compare(password, user.password);
     if (!validPassword) return res.status(400).json({ error: 'Invalid password' })
        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, 'test-juan-vega')
     res.header('auth-token', token).header('userId',user.id).json({
        error: null,
        data: {token},
        userId:user.id
    })
    } catch (error) {
     console.error(error)
     return res.status(500).json({
         message:error.message,
         error})
    }
    
 }
 export const updateUser = async(req,res) =>{
    try {
     const {email, username, color} = req.body
     const userId = req.header('userId')
     const oldUser = await User.findOne({
        where:{
           id:userId
        }
     })
     if(!oldUser)return res.status(400).json({ error: 'User not found' });
     const newUser = await User.update({
        email:email?email:oldUser.email, 
        username:username?username:oldUser.username, 
        color
     },{
        where:{
           id:userId
        }
     })  
     res.status(200).json({newUser,oldUser})
    } catch (error) {
     console.error(error)
     return res.status(500).json({
         message:error.message,
         error})
    }
    
 }

 export const updatePassword = async(req,res) =>{
    try {
     const {newPassword,oldPassword} = req.body
     const userId = req.header('userId')
     const oldUser = await User.findOne({
        where:{
           id:userId
        }
     })
     if(!oldUser)return res.status(400).json({ error: 'User not found' });
     const validPassword = await bcrypt.compare(oldPassword, oldUser.password);
     if (!validPassword) return res.status(400).json({ error: 'Invalid password' })
     const salt = await bcrypt.genSalt(10);
     const passwordHash = await bcrypt.hash(newPassword, salt);
     const newUser = await User.update({
        password:passwordHash
     },{
        where:{
           id:userId
        }
     })  
     res.status(200).json({newUser,oldUser})
    } catch (error) {
     console.error(error)
     return res.status(500).json({
         message:error.message,
         error})
    }
    
 }
 export const getBalanceTotal = async(req,res) =>{
   try {
    const userId = req.header('userId')
    const user = await User.findOne({
       where:{
          id:userId
       },
       attributes:['balanceTotal']
    })
    
    res.status(200).json({user})
   } catch (error) {
    console.error(error)
    return res.status(500).json({
        message:error.message,
        error})
   }
   
}

export const getUser = async(req,res) =>{
   try {
    const userId = req.header('userId')
    const user = await User.findOne({
       where:{
          id:userId
       },
    })
    
    res.status(200).json(user)
   } catch (error) {
    console.error(error)
    return res.status(500).json({
        message:error.message,
        error})
   }
   
}
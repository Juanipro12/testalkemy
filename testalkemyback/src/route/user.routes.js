import { Router } from 'express'
import { getBalanceTotal, getUser, login, signup, updatePassword, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from './validateToken.js'

const userRoutes = Router()

userRoutes.post('/login',login)
userRoutes.post('/signup',signup)
userRoutes.put('/edit',verifyToken,updateUser)
userRoutes.put('/newpassword',verifyToken,updatePassword)
userRoutes.get('/balancetotal',verifyToken,getBalanceTotal)
userRoutes.get('/user',verifyToken,getUser)





export default userRoutes





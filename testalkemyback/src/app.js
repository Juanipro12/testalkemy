import express from 'express'
import userRoutes from './route/user.routes.js'
import cors from 'cors'
import operationRoutes from './route/operations.routes.js'


const app = express()

//middlewares
app.use(express.json())
app.use(cors()) 


//routes
app.use(userRoutes)
app.use(operationRoutes)


export default app
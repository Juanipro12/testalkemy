import { Router } from 'express'
import { createOperation, deleteOperation, getOperation, getOperations, updateOperation } from '../controllers/operations.controller.js'
import { verifyToken } from './validateToken.js'

const operationRoutes = Router()

operationRoutes.get('/operations',verifyToken,getOperations)
operationRoutes.post('/operations',verifyToken,createOperation)
operationRoutes.get('/operations/:id',verifyToken,getOperation)
operationRoutes.put('/operations/:id',verifyToken,updateOperation)
operationRoutes.delete('/operations/:id',verifyToken,deleteOperation)

export default operationRoutes





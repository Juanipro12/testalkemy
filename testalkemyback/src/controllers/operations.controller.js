import { Operation } from "../models/Operation.js"
import { User } from "../models/User.js"

export const getOperations = async(req,res) =>{
   try {
    const userId = req.header('userId')
    const {limit,filter} = req.query
    const limitQuery = limit? {limit:Number(limit)}:{} 
    const filterQuery = filter !== 'all' && filter ?{type:filter}:{}
    const Operations = await Operation.findAndCountAll({
        where:{
            userId,
            ...filterQuery
        }, 
        ...limitQuery,
        order:[['Date','DESC']]
    })
    res.status(200).json(Operations)
} catch (error) {
    console.error(error)
    return res.status(500).json({
        message:error.message,
        error})
   }
   
}
export const getOperation = async(req,res) =>{
    try {
     const { id } =  req.params
     const Operation = await Operation.findByPk(id)
     if(!Operation)  res.status(404).json({message:'Operation does not exists'})
     res.status(200).json(Operation)
    } catch (error) {
     console.error(error)
     return res.status(500).json({
         message:error.message,
         error})
    }
    
 }

export const createOperation = async(req,res) =>{
    const {concept, amount, type, date } = req.body

    try {
        const { userid } = req.headers
        if(userid){
            const newOperation = await Operation.create({
                concept, 
                amount, 
                type,
                date,
                UserId:Number(userid)
            })
            await updateUser(type,Number(userid),amount)
            res.status(200).json(newOperation)
        }else{
            throw 'Error not user'
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:error.message,
            error})
    }
    
}

export const updateOperation =  async(req,res) =>{
    try {
        const { id } =  req.params
        const {concept, amount, type,date } = req.body
        const oldOperation =  await Operation.findOne({where:{id:id}})
        await updateUser(oldOperation.getDataValue('type'),oldOperation.getDataValue('UserId'),Number(-oldOperation.getDataValue('amount'))) 
        const updateOperation = await Operation.update({
            concept, 
            amount, 
            type,
            date
        },{
            where:{
                id
            }
        })
        await updateUser(type,oldOperation.getDataValue('UserId'),Number(amount))
        res.status(200).json(updateOperation)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:error.message,
            error})
    }
}


export const deleteOperation =  async(req,res) =>{
    try {
        const { id } =  req.params
        const oldOperation =  await Operation.findOne({where:{id:id}})
        await updateUser(oldOperation.getDataValue('type'),oldOperation.getDataValue('UserId'),-Number(oldOperation.getDataValue('amount')))
        await Operation.destroy({
            where:{
                id,
            }
        })
        res.sendStatus(204)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:error.message,
            error})
    }
   

}

const updateUser = async(type,id,amount) => {
    const amountUpdate = type === 'income'? amount:-Number(amount)
    const user = await User.findOne({where:{id:id}})
    await User.update({
        balanceTotal:Number(user.balanceTotal)+Number(amountUpdate)
    },{
        where:{id:id}
    })
}
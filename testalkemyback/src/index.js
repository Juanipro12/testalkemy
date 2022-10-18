import app from "./app.js"
import { sequelize } from "./database/database.js"


const PORT = process.env.port || 4000
const main =  async ()=>{
    try {
        await sequelize.sync({force:false})
        app.listen(PORT)
    } catch (error) {
        console.log(error)
    }
    
}


main()


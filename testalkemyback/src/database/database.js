import Sequelize from 'sequelize'


export const sequelize = new Sequelize('testalkemy','root','',{
    host:'localhost',
    dialect:'mysql'
})
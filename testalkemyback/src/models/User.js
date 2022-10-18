import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const User = sequelize.define(
    'User',  {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    username:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    balanceTotal:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    color:{
        type:DataTypes.STRING,
    },
    },
    {
        timestamps: true,
        paranoid: true,
    },
);


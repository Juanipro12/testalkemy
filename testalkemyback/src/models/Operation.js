import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from "./User.js";

export const Operation = sequelize.define(
    'Operation',  {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    concept:{
        type:DataTypes.STRING
    },
    amount:{
        type:DataTypes.INTEGER
    },
    date:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    type:{
        type: DataTypes.ENUM(
            'income',
            'expense',
          ),
    
    } 
    },
    {
        timestamps: true,
        paranoid: true,
    }
);
User.hasOne(Operation)

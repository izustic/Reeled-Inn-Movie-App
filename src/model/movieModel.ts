import { DataTypes, Model } from "sequelize";
import db from  '../config/database.config';

export interface MovieAttributes {
    id: string;
    title:string;
    description:string;
    image:string;
    price:string;
    userId:string
}

export class MovieInstance extends Model<MovieAttributes> {}

MovieInstance.init({
    id:{
        type:DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    price:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userId:{
        type:DataTypes.UUIDV4,
    }
}, {
    sequelize: db,
    tableName: 'movie'
})


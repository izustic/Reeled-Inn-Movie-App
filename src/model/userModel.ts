import { DataTypes, Model } from "sequelize";
import db from  '../config/database.config';
import { MovieInstance } from "./movieModel";

export interface UserAttributes {
    id: string;
    fullname: string
    username: string
    email: string;
    password: string;
}

export class UserInstance extends Model<UserAttributes> {}

UserInstance.init({
    id:{
        type:DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
}, {
    sequelize: db,
    tableName: 'user'
})

// to connect tables together, e.g movie to user table
UserInstance.hasMany(MovieInstance, {foreignKey:'userId', as:'movie'});
MovieInstance.belongsTo(UserInstance, {foreignKey:'userId', as:'user'})

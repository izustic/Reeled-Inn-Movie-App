import {Sequelize} from 'sequelize'

const db = new Sequelize('reeled', '', '', {
    storage:'./database.sqlite',
    dialect: 'sqlite',
    logging: false
})

export default db
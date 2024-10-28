import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('prep_ade', 'root', 'Sen@iDev77!.', {
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize
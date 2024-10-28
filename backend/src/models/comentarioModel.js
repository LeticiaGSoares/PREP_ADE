import { DataTypes } from "sequelize";
import conn from '../config/conn.js'

import Publicacao from './publicacaoModel.js'
import Usuario from './usuarioModel.js'

const Comentario = conn.define("comentarios", {
        texto: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 3,
            },
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Usuario,
                key: "id",
            }
        },
    }, 
    {tableName: "comentarios"}
)

Publicacao.belongsTo(Usuario, {
    trough: Comentario,
    foreignKey: 'publicacao_id',
    otherKey: 'usuario_id'
})
Usuario.belongsToMany(Publicacao, {
    through:Comentario,
    foreignKey: 'usuario_id',
    otherKey: 'publicacao_id'
})

export default Comentario;
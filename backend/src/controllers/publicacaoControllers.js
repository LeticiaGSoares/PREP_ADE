import { literal } from "sequelize"
import Publicacao from "../models/publicacaoModel.js"

export const create = async (req, res) => {
    const {titulo, local, cidade, imagem} = req.body

    try {
        await Publicacao.create({titulo, local, cidade, imagem})
        res.status(201).json("Criado")
    } catch (error) {
        res.status(500).json({err: error})
    }
}

export const getAll = async (req, res) => {
    try { 
        const publicacoes = await Publicacao.findAll({
            raw: true,
            attributes: [
                'id',
                'titulo',
                'local',
                'cidade',
                'imagem',
                [literal(`(
                    SELECT COUNT(*) FROM curtidas
                    WHERE curtidas.publicacao_id = publicacoes.id
                    AND curtidas.tipo_avaliacao = 'up'
                )`), "total likes"],
                [literal(`(
                    SELECT COUNT(*) FROM curtidas
                    WHERE curtidas.publicacao_id = publicacoes.id
                    AND curtidas.tipo_avaliacao = 'down'
                )`), "total deslikes"],
                [literal(`(
                    SELECT COUNT(*) FROM curtidas
                    WHERE curtidas.publicacao_id = publicacoes.id
                    AND comentarios.publicacao_id = publicacoes.id
                )`), "total comentarios"],
            ]
        })

        console.log(publicacoes)
    }catch(error){
        res.status(500).json({err: error})
    }
}

export const getPublicacao = async (req, res) => {
    const {id} = req.params

    try{
        const publicacao = await Publicacao.findOne({
            raw: true,
            where: {id},
            attributes: [
                'id',
                'titulo',
                'local',
                'cidade',
                'imagem',
                [literal(`(
                    SELECT COUNT(*) FROM curtidas
                    WHERE curtidas.publicacao_id = publicacoes.id
                    AND curtidas.tipo_avaliacao = 'up'
                )`), "total likes"],
                [literal(`(
                    SELECT COUNT(*) FROM curtidas
                    WHERE curtidas.publicacao_id = publicacoes.id
                    AND curtidas.tipo_avaliacao = 'down'
                )`), "total deslikes"],
                [literal(`(
                    SELECT COUNT(*) FROM curtidas
                    WHERE curtidas.publicacao_id = publicacoes.id
                    AND comentarios.publicacao_id = publicacoes.id
                )`), "total comentarios"],
            ]
        })
    }catch (error){
        console.log(error)
        res.status(500).json({err: "Erro ao buscar dados da publicacao"})
    }
}
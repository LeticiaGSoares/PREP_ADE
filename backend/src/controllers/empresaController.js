import Empresa from "../models/empresaModel.js";

export const create = async (req, res) => {
    const {nome, imagem} = req.body

    try {
        await Empresa.create({nome, image})
        res.status(201).json("Criado")
    } catch (error) {
        res.status(500).json({err: error})
    }
}
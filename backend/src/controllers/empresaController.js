import Curtida from "../models/curtidaModel.js";
import Empresa from "../models/empresaModel.js";

export const create = async (req, res) => {
    const {nome, imagem} = req.body

    try {
        await Empresa.create({nome, imagem})
        res.status(201).json("Criado")
    } catch (error) {
        res.status(500).json({err: error})
    }
}

export const getEmpresa = async (req, res) => {
    try{
        const infoEmpresa = await Empresa.findByPk(1, {raw: true})
        console.log(infoEmpresa)

        const like = await Curtida.count({
            where:{tipo_avaliacao: 'up'}
        })
        const deslike = await Curtida.count({
            where:{tipo_avaliacao: 'down'}
        })

        const empresa = {
            id: infoEmpresa.id,
            nome: infoEmpresa.nome,
            imagem: infoEmpresa.imagem,
            likes: like,
            deslikes: deslike
        }

        console.log('like ===>', deslike)
        res.status(200).json(empresa)                                                                       
    }catch (error){
        console.log(error)
        res.status(500).json({err: "Erro ao buscar dados da empresa"})
    }
}
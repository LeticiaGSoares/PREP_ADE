import Usuario from "../models/usuarioModel";
import createUserToken from '../helpers/create-user-token.js'

export const Logout = (req, res) => {
    res.status(200).json({message: "Usted salió de la aplicacione, merci bocó 🍷"})
}

export const Login = async (req, res) => {
    const {email, senha} = req.body

    try{
        const usuario = await Usuario.findOne({where: {email}})

        if(!email){
            res.status(404).json({message: "Usuário não encontrado"})
        }
        if(!senha){
            res.status(404).json({message: "Usuário não encontrado"})
        }

        const verifySenha = await Usuario.findByPk(usuario.id)

        if(verifySenha.senha !== senha){
            res.status(404).json({message: "Senha não confere"})
        }

        createUserToken(usuario, req, res)

    }catch(error){
        res.status(500).json({err: error})
    }
}
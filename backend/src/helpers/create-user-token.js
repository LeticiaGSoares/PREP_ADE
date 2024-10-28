import jwt from 'jsonwebtoken'

const createUserToken = (usuario, req,res) => {
    console.log('usuário ==>', usuario)
    console.log('request ==>', req)
    console.log('response ==>', res)
    try{
        const token = jwt.sign(
            {//payload --> info usuário
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                nickname: usuario.nickname
            },
            "SENHASUPERSEGURA", //SENHA
            {
                expiresIn:'24h'
            } //header -> crypt, tempo
        )
        
        res.status(200).json({message: "Você está logado"})
    }catch (error){
        res.status(500).json({err: error})
    }
}
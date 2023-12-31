const {response} = require('express');
const bcryptjs=require('bcryptjs')

const Usuario = require('../models/usuario');

const usuariosGet = async(req, res=response) =>{
    const {limite=5, desde=0} = req.query
    const query={estado:true}
   // const {q,limit}=req.query;

    //const usuario = await Usuario.find(query)
    //.skip(Number(desde))
    //.limit(Number(limite));

    //const totalUsuarios= await Usuario.countDocuments(query);

    const [total,usuarios]= await Promise.all([
         Usuario.countDocuments(query),
         Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
    ])


    
    res.json({
        total,
        usuarios
        //msg:'Estas en el get API - Controlador',
        //totalUsuarios,
        //usuario
    });
}

const usuariosPost = async(req,res=response) =>{

  
    const {nombre,correo,password, rol}=req.body;

    const usuario = new Usuario({nombre,correo,password, rol})

    
    //validar el correo
    //const existeCorreo= await Usuario.findOne({correo})
    //if(existeCorreo){
    //    return res.status(400).json({
    //            msg:'Ese correo ya se encuentra registrado'
   //     });
   // }

    //encriptar la contraseña 
    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password,salt);

    //guardar en la base de datos 
    usuario.save();

    res.json({
        msg:'Estas en el post API -Controlador',
        usuario
    });
}

const usuariosPut = async(req, res) =>{
    const {id}=req.params;
    const {password, google, correo, ...resto}=req.body;
    if(password){
        const salt=bcryptjs.genSaltSync();
        resto.password=bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg:'Estas en el put API - Controlador',
        usuario
    });
}




const usuariosDelete = async(req, res=response) =>{

    const {id}=req.params;
    //eliminar usuario fiscamente
    //const usuario= await Usuario.findByIdAndDelete(id);

    const usuario =await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json(usuario);
}




const usuariosPatch = (req, res) =>{
    res.json({
        msg:'Estas en el Patch API - controlador'
    });
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
    
}
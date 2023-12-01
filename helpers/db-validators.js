const Role = require("../models/role")
const Usuario = require('../models/usuario')


const esRoleValidar = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}
const correoExiste = async(correo = '')=>{
        //validar el correo
        const existeCorreo= await Usuario.findOne({correo})
        if(existeCorreo){
            throw new Error(`El correo ${correo} ya se encuentra registrado en la base se datos`)
            };
        }

const existeUsuarioPorId = async( id ) => {
        //validar el correo
    const existeUsuario= await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error(`El Id, no existe ${id}`)
         };
    }
        
module.exports={
    esRoleValidar,
    correoExiste,
 existeUsuarioPorId 

}
const { Schema, model } = require('mongoose')


const UsuarioSchema=Schema({
    nombre:{
        type: String,
        required:[true, 'El nombre del usuario es obligatorio']
    },
    correo:{
        type: String,
        required:[true, 'El correo del usuario es obligatorio'],
        unique:true
    },
    password:{
        type: String,
        required:[true, 'La contraseña del usuario es obligatorio']
    },
    imagen:{
        type: String,
    },
    rol:{
        type: String,
        required:true,
        emun:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type: Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default:false
    }
});

UsuarioSchema.methods.toJSON = function (){
    const {__v,password, ...usuario}=this.toObject();
    return usuario;
}

module.exports=model('Usuario',UsuarioSchema);
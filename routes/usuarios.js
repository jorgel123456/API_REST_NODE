const { check } = require("express-validator");


const {usuariosGet,
        usuariosPost,
        usuariosDelete,
        usuariosPut,
        usuariosPatch} = require("../controllers/usuarios");

const Server = require("../models/server");


const {Router}=require('express');
const { validarCampos } = require("../middlewares/validarCampos");
const { esRoleValidar,correoExiste,existeUsuarioPorId } = require("../helpers/db-validators");

const router= Router();

router.get('/', usuariosGet);
router.post('/', [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('correo','Ingrese formato de correo valido').isEmail(),
        check('correo').custom(correoExiste       ),
        check('password','La contraseña es obligatoria y como minimo 6 caracteres ').isLength({ min: 6}),
        //check('rol','El rol ingresado no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( esRoleValidar),
        validarCampos
],usuariosPost);

router.put('/:id',[
        check('id', 'El id no es valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom( esRoleValidar),
        validarCampos
        ],usuariosPut);

router.delete('/:id',
        [
        check('id', 'El id no es valido').isMongoId(),
        check('id').custom(existeUsuarioPorId), 
        validarCampos  
        ], 
        usuariosDelete);


router.patch('/', usuariosPatch);



module.exports=router;
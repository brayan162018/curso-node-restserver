


const { Router } = require("express");
const { check } = require("express-validator");
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require("../controllers/usuarios");


const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, emailExiste,existeUsuarioPorId } = require("../helpers/db.validators");

const router = Router();

  router.get('/', usuariosGet);

  router.put('/:id', [
    check ("id", "no es un ID valido ").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(  esRoleValido ),
   validarCampos
  ],usuariosPut );
  
  router.post('/',[
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("correo", "el correo no es valido").isEmail(),
    check("correo").custom( emailExiste ),
    check("password", "la contraseña es obligatoria y debe tener mas de 6 letras").isLength({min: 6}),
    //check("rol", "no es un rol valido").isIn(["ADMIN_ROLE","USER_ROLE"]),
    check("rol").custom(  esRoleValido ),
    validarCampos

  ], usuariosPost);


  router.delete('/:id',[
  check ("id", "no es un ID valido ").isMongoId(),
  check("id").custom(existeUsuarioPorId),
     validarCampos
  ] ,usuariosDelete);


  router.patch('/', usuariosPatch);












module.exports = router;
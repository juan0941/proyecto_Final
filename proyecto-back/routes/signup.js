const { jsonResponse } = require('../lib/jsonResponse');
const User = require('../schema/user')
const router = require('express').Router();

router.post('/', async (req, res) => {
    const { username, name, password } = req.body;

    if (!username || !name || !password) {
        return res.status(400).json(jsonResponse(400, {
            error: 'Todos los campos son obligatorios'
        }));
    }

    //const user = new User(username,name,password)

    try{
        const user = new User();
    const exists = await user.usernameExist(username);

    if(exists){
        return res.status(400).json(
            jsonResponse(400,{
                error: "Usuario ya existe"
            })
        )
    }
    const newuser = new User({username,name,password});

    newuser.save()

    res.status(200).json(jsonResponse(200, { message: 'inicio sesion' }));

    }catch (error){
        res.status(500).json(
            jsonResponse(500, {
                error:"Error al crear usuario"
            })
        );
    }

    
});

module.exports = router;

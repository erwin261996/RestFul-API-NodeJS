const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let ciusermodel = {};

ciusermodel.getuser = (req, res, next)=>{
    req.getConnection((err, conx)=>{
        if(err) res.next(err);

        conx.query('SELECT * FROM `tb01_usuario`',(err, result)=>{
            if(err) res.next(err);
            else{
                res.json(result);
            }
        });
    });
}

ciusermodel.guardar = (req, res, next)=>{
    const { nombre, apellido, email, password, vali } = req.body;
    if(nombre && apellido && email && password) {
        req.getConnection((err, conx)=>{
            if(err) next(err);
            else {
                bcrypt.hash(req.body.password, 10, (err, hash)=>{
                    const bcryptpass = hash;
                    conx.query("call splogin(2,?,?,?,?,?,?,'')",[nombre, apellido, email, password, vali, bcryptpass],(err, result)=>{
                        if(err) next(err);
                        else {
                            console.log(result[0]);
                            res.json(result[0]);
                        }
                    });
                });

                
            }
        });
    }else
        res.send('Petición Erronea');
   
}

ciusermodel.login = (req, res, next)=>{
    const {email, password} = req.body;
    req.getConnection((err, conx)=>{
        if(err) next(err);
        else{
            // console.log('emailApi: '+email); expiresIn: 7200
            conx.query("call splogin(3,'','',?,'',0,'','')",[email],(err, result)=>{
                if(err) next(err);
                else {
                    const passdb = result[0][0].encrypt;

                    // console.log('logintoken: ',result[0][0]);

                    if(bcrypt.compareSync(password, passdb)){
                        let token = jwt.sign(JSON.parse(JSON.stringify(result[0][0])), process.env.SECRET_KEY, {
                            expiresIn: 1440
                        });
                        
                        // res.json(token);
                        res.json({"status": 200, "cod": result[0][0].cod,
                        "nombre":result[0][0].nombre, "perfil": result[0][0].perfil, "token": token, "foto": result[0][0].strfoto });
                    } 
                }
            });
        }

    });
}

module.exports = ciusermodel;
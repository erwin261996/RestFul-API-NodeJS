let controller = {};

controller.getFabricantes = (req, res, next) => {
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call sp01_catalogo(?,0,"",0,0,0)',[1],(err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
                else {
                    // res.send(JSON.stringify({"status": 200, "data": result[0]})); 
                    res.send(JSON.stringify(result[0])); 
                }
            })
        }

    })
}

controller.addFabricantes = (req, res)=>{
    const { id, strnombre, estado } = req.body;
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call sp01_catalogo(?,?,?,0,?,0)',[2,id,strnombre,estado], (err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

controller.deleteFabricantes = (req, res)=>{
    const { id } = req.body;
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call sp01_catalogo(?,?,"",0,0,0)',[3,id], (err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

module.exports = controller;




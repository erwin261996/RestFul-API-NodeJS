const controller = {};

controller.getSidebar = (req, res, next) => {
    req.getConnection((err, conx)=>{
        if(err) next(err);
        else{
            conx.query('call sp_pagina(?,?)',[1,11], (err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
                else {
                    res.send(result[0]);
                }
            });
        }
    });
}

module.exports = controller;
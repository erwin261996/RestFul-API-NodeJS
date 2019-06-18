let controller = {};

controller.getCatalogo = (req, res, next) => {
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call sp01_catalogo(?,0,"",0,0,0)',[5],(err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
                else {
                    res.send(JSON.stringify(result[0])); 
                }
            })
        }

    })
}

controller.getClientes = (req, res, next) => {
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call spfactura_02contactos(?,0,0,0,0,0,"","",0,"","",0,0,0,0,"","","",0)',[1],(err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
                else {
                    res.send(JSON.stringify(result[0])); 
                }
            })
        }

    })
}

controller.addCliente = (req, res)=>{
    // console.log('add: ', req.body);
    const { formcod, formnombre, formtipocontacto, formdocumento, formgenero, formemail, formtelefono, formmovil,
        formestado, formempresa, formruc, formsitio, formemptel, formempemail, formnacion, formdep,
        formdirec } = req.body
    // 17
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call spfactura_02contactos(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,"")',
                [2, formcod, formnombre, formtipocontacto, formdocumento, formgenero, formemail, formtelefono, formmovil, formestado,
                    formempresa, formruc, formsitio, formemptel, formempemail, formnacion, formdep, formdirec], (err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

controller.deleteClientesxid = (req, res)=>{
    const { id } = req.body;
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call spfactura_02contactos(?,?,0,0,0,0,"","",0,"","",0,0,0,0,"","","",0)',[3,id], (err, result)=>{
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




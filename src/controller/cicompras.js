let controller = {};

controller.getCatalogo = (req, res, next) => {
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call sp01_catalogo(?,0,"",0,0,0)',[6],(err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
                else {
                    res.send(JSON.stringify(result[0])); 
                }
            })
        }

    })
}

controller.getCatalogoProducto = (req, res, next) => {
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call sp01_catalogo(?,0,"",0,0,0)',[7],(err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
                else {
                    res.send(JSON.stringify(result[0])); 
                }
            })
        }

    })
}

controller.listaProductos = (req, res, next) => {
    
    const { inarticulos, incantidad, inpreciocompra, inprecioventa, codacceso } = req.body;

    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call spfactura_03compras(2,?,?,?,0,?,0,0,"",0,0,0)',[inarticulos, incantidad, inpreciocompra, codacceso],(err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
                else {
                    res.send(JSON.stringify(result[0])); 
                }
            })
        }

    })
}

controller.getDetaCompras = (req, res, next) => {

    const { codacceso } = req.body;

    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call spfactura_03compras(?,0,0,0,0,?,0,0,"",0,0,0)',[1, codacceso],(err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
                else {
                    res.send(JSON.stringify(result[0])); 
                }
            })
        }

    })
}

controller.deleteDetaCompra = (req, res, next)=>{
    const { id, codacceso } = req.body;
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call spfactura_03compras(?,?,0,0,0,?,0,0,"",0,0,0)',[3,id, codacceso], (err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

controller.findDetaComboCompra = (req, res, next)=>{
    const { id } = req.body;
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call spfactura_03compras(?,?,0,0,0,0,0,0,"",0,0,0)',[4,id], (err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

controller.addfacturacompra = (req, res, next) => {

    /* {"inproveedor":"5","intipocomprobante":"530","strseriecomprobante":"2367","strdetallecomp":"dhfjks sdjfhsdkjfhsjkd",
  "subtotal":1033,"iva":68.87,"total":1101.87,"codacceso":9} */

   const { inproveedor, intipocomprobante, strseriecomprobante, strdetallecomp, subtotal, iva, total, codacceso } = req.body;
         
    req.getConnection((err, conx)=>{
        if(err) next(err);
        else{
            conx.query("call spfactura_03compras(?,?,0,0,0,?,?,?,?,?,?,?)",[5,inproveedor,codacceso,intipocomprobante,strseriecomprobante,
                strdetallecomp, subtotal, iva, total ],(err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            });
        }
    });
}

module.exports = controller;




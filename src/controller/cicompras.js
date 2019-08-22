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
                    // Solo Categoria
                    let categoria = result[0].filter(ite => {
                        if(ite.fil == 1) {
                            return ite;
                        }
                    });

                    // Solo Articulo
                    let articulos = result[0].filter(ite => {
                        if(ite.fil == 2) {
                            return ite;
                        }
                    });
                    // Solo Proveedores
                    let listproveedores = result[0].filter(ite => {
                        if(ite.fil == 3) {
                            return ite;
                        }
                    });

                    let proveedores = listproveedores.map(res => {
                        return {value: res.id, label: res.strdescrip}
                    });
                    // Solo Comprobante
                    let listcomprobante = result[0].filter(ite => {
                        if(ite.fil == 4) {
                            return ite;
                        }
                    });

                    let comprobante = listcomprobante.map(res => {
                        return {value: res.id, label: res.strdescrip}
                    });
                    
                    // JSON Armado :: Finalizado
                    res.send(JSON.stringify({
                        "categoria": categoria,
                        "articulos": articulos,
                        "proveedores": proveedores,
                        "comprobante": comprobante
                    }));
                }
            })
        }

    })
}

controller.listaProductos = (req, res, next) => {
    
    const { id, cantidad, costo, codacceso } = req.body;

    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call spfactura_03compras(2,?,?,?,0,?,0,0,"",0,0,0,0)',[id, cantidad, costo, codacceso],(err, result)=>{
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
            conx.query('call spfactura_03compras(?,0,0,0,0,?,0,0,"",0,0,0,0)',[1, codacceso],(err, result)=>{
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
            conx.query('call spfactura_03compras(?,?,0,0,0,?,0,0,"",0,0,0,0)',[3,id, codacceso], (err, result)=>{
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
            conx.query('call spfactura_03compras(?,?,0,0,0,0,0,0,"",0,0,0,0)',[4,id], (err, result)=>{
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

   const { inproveedor, intipocomprobante, strseriecomprobante, strdetallecomp, subtotal, iva, total, codacceso } = req.body;
         
    req.getConnection((err, conx)=>{
        if(err) next(err);
        else{
            conx.query("call spfactura_03compras(?,?,0,0,0,?,?,?,?,0,?,?,?)",[5,inproveedor,codacceso,intipocomprobante,strseriecomprobante,
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

controller.updateitemscompra = (req, res, next) => {
    
    const {codmodal, cantidadmodal, submodaltotal, descuentomodal, impuestomodal, totalmodal, codacceso, desctmodal, ivamodal} = req.body;

    req.getConnection((err, conx)=> {
        err ? next(err)
        : conx.query('call spfactura_03compras( ?, ?, ?, 0, 0, ?, ?, ?, "", ?, ?, ?, ?)', 
        [6, codmodal, cantidadmodal, codacceso, desctmodal, ivamodal, submodaltotal, descuentomodal, impuestomodal, totalmodal], (err, result)=>{
            err ? res.send(JSON.stringify({"status":500, "error": err, "response": null}))
            : res.send(JSON.stringify(result[0]))
        })
    });
}

module.exports = controller;




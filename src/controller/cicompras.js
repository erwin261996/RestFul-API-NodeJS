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
                    let proveedores = result[0].filter(ite => {
                        if(ite.fil == 3) {
                            return ite;
                        }
                    }).map(res => {
                        return {value: res.id, label: res.strdescrip}
                    });
                    // Solo Comprobante
                    let comprobante = result[0].filter(ite => {
                        if(ite.fil == 4) {
                            return ite;
                        }
                    }).map(res => {
                        return {value: res.id, label: res.strdescrip}
                    });
                    // Tipo de CCompra
                    let tipoCompra = result[0].filter(ite => {
                        if(ite.fil == 5) {
                            return ite;
                        }
                    }).map(res => {
                        return {value: res.id, label: res.strdescrip}
                    });
                    // Forma de Pago
                    let fPago = result[0].filter(ite => {
                        if(ite.fil == 6) {
                            return ite;
                        }
                    });
                    
                    // JSON Armado :: Finalizado
                    res.send(JSON.stringify({
                        "categoria": categoria,
                        "articulos": articulos,
                        "proveedores": proveedores,
                        "comprobante": comprobante,
                        "tipocompra": tipoCompra,
                        "FPago": fPago
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

   const { formaPago, pagaCon, cambioPago, codacceso, codProveedor, tipoCompra, detalleCompra, subTotal, descuento, ivaCompra, TotalCompra } = req.body;
         
    req.getConnection((err, conx)=>{
        if(err) next(err);
        else{
            conx.query('call spfactura_03compras(?, 0, ?, ?, ?, ?, ?, ?, "?", ?, ?, ?, ?)',[5, formaPago, pagaCon, cambioPago, codacceso, codProveedor, tipoCompra, detalleCompra, subTotal, descuento, ivaCompra, TotalCompra ],(err, result)=>{
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

controller.updateitemsdetallecompra = (req, res, next) => {
    
    const {coditems, cantidad, codacceso, nPrecio, desc, iva } = req.body;

    req.getConnection((err, conx)=> {
        err ? next(err)
        : conx.query('call spfactura_03compras(7, ?, ?, ?, 0, ?, 0, 0, "", 0, ?, ?, 0)', 
        [coditems, cantidad, nPrecio, codacceso, desc, iva ], (err, result)=>{
            err ? res.send(JSON.stringify({"status":500, "error": err, "response": null}))
            : res.send(JSON.stringify(result[0]))
        })
    });
}

module.exports = controller;




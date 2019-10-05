let controller = {};

controller.getCatalogo = (req, res, next) => {
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call sp01_catalogo(?,0,"",0,0,0)',[4],(err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
                else {
                    res.send(JSON.stringify(result[0])); 
                }
            })
        }

    })
}

// Inicio de nuevas funciones de Inventario

controller.addInventario = (req, res, next) => {
    const { idcod, strcodigo, strnombre, incostos, indolar, inprecio1, inprecio2, inprecio3, inprecio4, 
            inutilidad1, inutilidad2, inutilidad3, inutilidad4, instock, indescuento, contieneVende,
            contieneCompra, ccventa, ccCompra, strdescrip,inselectedTipo, inselectedDivision, inselectedCategory, inselectedSubCategoria,
            inselectedUbicacion, inselectedFabricante, inselectedPreferenciaMoneda, inselectedFacturarCon, inselectedVende,
            inselectedCompra, inselectedIVA, inselectedProveedor } = req.body;

    req.getConnection((err, conn)=>{
        if (err) next(err)
        else {
            conn.query('call spfactura_01inventario(1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"", "","","","", 8)',
                [idcod, strcodigo, strnombre, incostos, indolar, inprecio1, inprecio2, inprecio3, inprecio4, 
            inutilidad1, inutilidad2, inutilidad3, inutilidad4, instock, indescuento, contieneVende,
            contieneCompra, ccventa, ccCompra, strdescrip,inselectedTipo, inselectedDivision, inselectedCategory, inselectedSubCategoria,
            inselectedUbicacion, inselectedFabricante, inselectedPreferenciaMoneda, inselectedFacturarCon, inselectedVende,
            inselectedCompra, inselectedIVA, inselectedProveedor], (err, result)=> {
                if(err)
                res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })

}


controller.listInventario = (req, res, next) => {
    req.getConnection((err, conn)=>{
        if (err) next(err)
        else {
            conn.query('call spfactura_01inventario(2, 0, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "", "", 0)', (err, result)=> {
                if(err)
                res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

controller.deleteInvenntarioxid = (req, res)=>{
    const { id } = req.body;
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call spfactura_01inventario(3, ?, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "", "", 0)',[id], (err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

// Inventario de Elementos Eliminados
controller.listInventarioEliminados = (req, res, next) => {
    req.getConnection((err, conn)=>{
        if (err) next(err)
        else {
            conn.query('call spfactura_01inventario(4, 0, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "", "", 0)', (err, result)=> {
                if(err)
                res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

controller.recuperacionInvenntarioEliminadosxid = (req, res)=>{
    const { id } = req.body;
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call spfactura_01inventario(5, ?, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "", "", 0)',[id], (err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

controller.deleteInvenntarioEliminadosxid = (req, res)=>{
    const { id } = req.body;
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call spfactura_01inventario(6, ?, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "", "", 0)',[id], (err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

// Inventario Conteo de los producto
controller.listInventarioConteo = (req, res, next) => {
    req.getConnection((err, conn)=>{
        if (err) next(err)
        else {
            conn.query('call spfactura_01inventario(7, 0, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "", "", 0)', (err, result)=> {
                if(err)
                res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

controller.AddNewInventarioConteo = (req, res, next) => {
    const { id, codacceso, conteo, codprod, comentario, hstate, hList } = req.body;

    req.getConnection((err, conn)=>{
        if (err) next(err)
        else {
            conn.query('call spfactura_01inventario(8, ?, "", "", ?, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ?, ?, ?, ?, ?, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "", "", 0)',[id, codacceso, conteo, codprod, comentario, hstate, hList], (err, result)=> {
                if(err)
                res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

controller.QuitarNewInventarioConteo = (req, res, next) => {
    const { id } = req.body;

    req.getConnection((err, conn)=>{
        if (err) next(err)
        else {
            conn.query('call spfactura_01inventario(9, ?, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "", "", 0)',[id], (err, result)=> {
                if(err)
                res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

// Lista de Conteo Abiertos
controller.ListaTocaInventarioConteo = (req, res, next) => {
    const { codacceso, toca } = req.body;

    req.getConnection((err, conn)=>{
        if (err) next(err)
        else {
            conn.query('call spfactura_01inventario(10, ?, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "", "", 0)',[codacceso, toca], (err, result)=> {
                if(err)
                res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

// Next Conteo
controller.NexInventarioConteo = (req, res, next) => {
    const { codacceso, estado, opc, hstate, hList } = req.body;

    req.getConnection((err, conn)=>{
        if (err) next(err)
        else {
            conn.query('call spfactura_01inventario(11, ?, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ?, "", ?, ?, ?, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "", "", 0)',[codacceso, estado, opc, hstate, hList], (err, result)=> {
                if(err)
                res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

// Delete Conteo Abierto
controller.DeleteInventarioConteoOpen = (req, res, next) => {
    const { idprod, codacceso } = req.body;

    req.getConnection((err, conn)=>{
        if (err) next(err)
        else {
            conn.query('call spfactura_01inventario(12, ?, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ?, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "", "", 0)',[idprod, codacceso], (err, result)=> {
                if(err)
                res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

// Continuar Conteo Abierto
controller.continuarInventarioConteoOpen = (req, res, next) => {
    const { idList, codacceso } = req.body;

    req.getConnection((err, conn)=>{
        if (err) next(err)
        else {
            conn.query('call spfactura_01inventario(13, ?, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ?, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "", "", 0)',[idList, codacceso], (err, result)=> {
                if(err)
                res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

// Continuar Conteo Cerados
controller.listaConteoCerrados = (req, res, next) => {
    const { idList, codacceso } = req.body;

    req.getConnection((err, conn)=>{
        if (err) next(err)
        else {
            conn.query('call spfactura_01inventario(14, ?, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ?, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "", "", 0)',[idList, codacceso], (err, result)=> {
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




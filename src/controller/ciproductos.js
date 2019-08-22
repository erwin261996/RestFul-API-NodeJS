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

controller.getProductos = (req, res, next) => {
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call spfactura_01productos(?,0,0,"","",0,0,"",0,0,0,0,0,0,0,"",0)',[1],(err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
                else {
                    res.send(JSON.stringify(result[0])); 
                    
                    // {
                    //     "cod": 20,
                    //     "codigo": "34353453",
                    //     "nombre": "Cocina",
                    //     "modelo": "Alter",
                    //     "categoria": "Bebé",
                    //     "codpresentacion": 287,
                    //     "presentacion": "Unidad",
                    //     "strdescrip": "fghfghfghfghfghfgh",
                    //     "codfabi": 38,
                    //     "fabricante": "22 Miles",
                    //     "codmoneda": 536,
                    //     "moneda": "Cordoba",
                    //     "simbolomoneda": "C$",
                    //     "precompra": 234,
                    //     "preventa": 567,
                    //     "estado": 8,
                    //     "existencias": 234,
                    //     "ubicacion": "539",
                    //     "fechacaduca": "2019-08-07"
                    // }
                }
            })
        }

    })
}

controller.addProductos = (req, res)=>{
    // console.log('add: ', req.body);
    // 15
    // const { id, strcodigo, strnombre, strmodelo, categoria, strpresenta, strdescripform,
    //         fabi, strcostos, strpventa, estado, strutilidad, strstock, strubicacion, strdatecadu } = req.body;
    // 15

    // {"id":0,"strcodigo":"38293","strnombre":"nue producto","strmodelo":"modelonew","categoria":"294","strpresenta":"288",
    //     "strdescripform":"descrrip del producto","fabi":"28","tipoMoneda":"536","strcostos":"90","strpventa":"100","estado":8,
    //     "strstock":"30","strubicacion":"539","strdatecadu":"2019-05-16"}
				
    // in opc int, in spcod int, in codigobar int, in strnombre varchar(120), in strmodelo varchar(80), 
    // in incategoria int, in strpresenta int, in strdescripform varchar(255), in codfabri int, 
    // in intipomoneda int, in incostos decimal(18,2), in inpventa decimal(18,2), in inestado int, 
    // in instock int, in inubicacion int, in strdatecadu varchar(20), in codacceso int
    
    const { id, strcodigo, strnombre, strmodelo, selectedCategory, selectedPresentacion, strdescripform, selectedFabricantes, selectedTipoMoneda,
        strcostos, strpventa, selectedEstado, strstock, selectedUbicacion, strdatecadu } = req.body;

    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call spfactura_01productos(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0)',
                [2,id, strcodigo, strnombre, strmodelo, selectedCategory, selectedPresentacion, strdescripform, selectedFabricantes, selectedTipoMoneda,
                    strcostos, strpventa, selectedEstado, strstock, selectedUbicacion, strdatecadu], (err, result)=>{
                if(err)
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                else {
                    res.send(JSON.stringify(result[0]));
                }
            })
        }
    })
}

controller.deleteProductosxid = (req, res)=>{
    const { id } = req.body;
    req.getConnection((err, conx)=>{
        if(err) next(err)
        else {
            conx.query('call spfactura_01productos(?,?,0,"","",0,0,"",0,0,0,0,0,0,0,"",0)',[3,id], (err, result)=>{
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




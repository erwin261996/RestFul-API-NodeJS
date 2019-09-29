const express = require('express');
const router_user = express.Router();
const cors =  require('cors');

router_user.use(cors());
process.env.SECRET_KEY = 'secret';

// Controladores
const ciuser = require('../controller/ciuser');
const cisidebar = require('../controller/cisidebar');
const cifabricante = require('../controller/cifabricantes');
const ciproductos = require('../controller/ciproductos');
const cidirectorio = require('../controller/cidirectorio');
const cicompras = require('../controller/cicompras');

// Todas las rutas dependiendo de los controladores
// Login - Registro - Consulta de usuario de la cuenta
router_user.get('/', ciuser.getuser);
router_user.post('/register', ciuser.guardar);
router_user.post('/login', ciuser.login);

// SideBar
router_user.post('/sidemenu', cisidebar.getSidebar);

// Fabricantes
router_user.post('/fabricante', cifabricante.getFabricantes);
router_user.post('/addfabricantes', cifabricante.addFabricantes);
router_user.post('/delfabricantes', cifabricante.deleteFabricantes);

// Inventario
router_user.post('/getcat_productos', ciproductos.getCatalogo);
router_user.post('/addInventario', ciproductos.addInventario);
router_user.post('/listInventario', ciproductos.listInventario);
router_user.post('/deleteInvenntarioxid', ciproductos.deleteInvenntarioxid);
// Inventario de Elementos Eliminados
router_user.post('/listInventarioEliminados', ciproductos.listInventarioEliminados); 
router_user.post('/recuperacionInvenntarioEliminadosxid', ciproductos.recuperacionInvenntarioEliminadosxid);
router_user.post('/deleteInvenntarioEliminadosxid', ciproductos.deleteInvenntarioEliminadosxid);
// Inventario Conteo de los producto 
router_user.post('/listInventarioConteo', ciproductos.listInventarioConteo);
router_user.post('/AddNewInventarioConteo', ciproductos.AddNewInventarioConteo);
router_user.post('/QuitarNewInventarioConteo', ciproductos.QuitarNewInventarioConteo);

router_user.post('/ListaTocaInventarioConteo', ciproductos.ListaTocaInventarioConteo);
router_user.post('/NexInventarioConteo', ciproductos.NexInventarioConteo);


// Directorio - Cliente
router_user.post('/getcat_cliente', cidirectorio.getCatalogo);
router_user.post('/getcliente', cidirectorio.getClientes);
router_user.post('/addcliente', cidirectorio.addCliente);
router_user.post('/delcliente', cidirectorio.deleteClientesxid);

// Compras
router_user.post('/getcat_compras', cicompras.getCatalogo);
router_user.post('/getCatalogoProducto', cicompras.getCatalogoProducto);
router_user.post('/listDetaCompra', cicompras.listaProductos);
router_user.post('/getDetaCompras', cicompras.getDetaCompras);
router_user.post('/deleteDetaCompra', cicompras.deleteDetaCompra);
router_user.post('/findDetaComboCompra', cicompras.findDetaComboCompra);
router_user.post('/addfacturacompra', cicompras.addfacturacompra);
router_user.post('/updateitemscompra', cicompras.updateitemscompra);
router_user.post('/updateitemsdetallecompra', cicompras.updateitemsdetallecompra);

module.exports = router_user;
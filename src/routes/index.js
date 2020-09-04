const express = require('express');
const router = express.Router();

const model = require('../model/pedidos')();

/*HOME*/
router.get('/', (req, res)=>{
    res.render('home');
})

/*ORDENAR ONLINE*/

//Seccion de pedidos
router.get('/ordenar-online', (req,res)=>{
    res.render('pedidosOnline');
});

//Enviar datos del pedido
router.post('/', (req, res)=>{
    let body = req.body;
    model.create(body, (err, pedido)=>{
        if (err) throw err;
        res.render('sendsuccess');
    })    
});

//ver listado de pedidos
router.get('/list', (req, res)=>{
   model.find({}, (err, pedido)=>{
       if(err) throw err;
       res.render('listadoPedidos',{
           pedido:pedido
       });
   });
});


//Cambiar status
router.get('/changeStatus/:id', (req, res)=>{
    let id = req.params.id;
    model.findById(id, (err, pedido)=>{
        if(err) throw err;
        pedido.status = !pedido.status;
        pedido.save()
            .then(()=>res.redirect('/list'));
    })
 });

//editar pedidos
router.get('/edit/:id' , async (req, res)=>{
    const pedido = await model.findById(req.params.id);
    res.render('edit', {pedido});
});

//actualizar pedido editado
router.post('/edit/:id', async (req, res)=>{
    const {id} = req.params;
    await model.update({_id:id}, req.body);
    res.redirect('/list');

})

//eliminar listado
router.get('/delete/:id', (req, res)=>{
    let id = req.params.id;
    model.remove({_id: id}, (err, pedido)=>{
        if(err) throw err;
        res.redirect('/list');
    });
});

module.exports = router;
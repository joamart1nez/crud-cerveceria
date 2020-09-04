module.exports = function(){
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var db;

    if(!db){
        db = mongoose.connect('mongodb+srv://joa-martinez:1234@cluster0.j3gan.mongodb.net/pedidos-cervezas?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true },
        (err)=>{
            if (!err) {
                console.log('Connect to DB')
            } else {
                console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
            }
        });
    }

    var pedidoSchema = new Schema({
        name: String,
        phone: String,
        direction: String,
        list: String,
        precioTotal: String,
        status : Boolean
    });
    return mongoose.model('pedido', pedidoSchema);
}
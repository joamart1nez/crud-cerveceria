var p = {
    addBeer: document.querySelectorAll('.add-beer'),
    description: document.querySelectorAll('.description'),
    card: document.querySelectorAll('.card'),
    bodyDom: document.querySelector('body'),
    cardEdit : document.querySelector('.card-edit'),
    close : document.querySelector('.close'),
    sendCant : document.querySelector('.send-cant'),
    infoCountCant :  document.querySelector('.card-edit').childNodes[5].childNodes[3].childNodes[3].childNodes[3],
    titleOrderCant : document.querySelector('.title-order').childNodes[3],
    infoFinalOrder: document.querySelector('#infoFinalOrder'),
    inputPrecioT : document.querySelector('#precioTotal'),
    listOrder : document.querySelector('.list-order'),
    total : document.querySelector('.total'),
    itemTotal: 0,
    rutaImg: null,
    title: null,
    precio: null,
    lightbox: null,
}

var m = {
    captEventChoice: function () { //captura el evento que indica la eleccion de un producto
        for (let i = 0; i < p.addBeer.length; i++) {
            p.addBeer[i].addEventListener('click', function () {
                p.rutaImg = p.card[i].childNodes[1];
                p.title = p.description[i].childNodes[1].innerHTML;
                p.precio = p.description[i].childNodes[3].innerHTML;
                m.lightbox();
            });
        }
    },

    lightbox: function () { //crea el fondo oscuro y agrega la foto 
        p.bodyDom.appendChild(document.createElement("DIV")).setAttribute('id', 'lightbox');
        p.lightbox = document.querySelector('#lightbox');

        p.cardEdit.style.display = 'block';
        p.lightbox.style.width = "100%";
        p.lightbox.style.height = "100%";
        p.lightbox.style.position = "fixed";
        p.lightbox.style.zIndex = "1000";
        p.lightbox.style.background = "rgba(0,0,0,.5)"
        p.lightbox.style.top = 0;
        p.lightbox.style.left = 0;

        p.cardEdit.style.display = 'block';
        p.cardEdit.style.position = 'fixed';
        p.cardEdit.style.top = '2rem';
        p.cardEdit.style.left = '30%';
        p.cardEdit.style.zIndex = '10000';

        if (window.matchMedia("(max-width:1000px)").matches) { 
            p.cardEdit.style.width = "80%";
            p.cardEdit.style.left = '10%';
		} else {
			p.cardEdit.style.width = "40%";
	}
        
        setTimeout(()=>{p.cardEdit.style.marginLeft = '0';}, 10);

        p.close.addEventListener('click', m.closeCard);

        m.addInfoCardEdit(p.cardEdit);

        p.sendCant.addEventListener('click', m.sendInfoCard);
        p.sendCant.addEventListener('click', m.createListOrder);
    },

    addInfoCardEdit: function(cardEdit){  //añade la informacion a la carta 
        cardEdit.childNodes[3].src = p.rutaImg.src;
        let cardDescription = cardEdit.childNodes[5].childNodes[1];
        cardDescription.childNodes[1].innerHTML = p.title;
        cardDescription.childNodes[3].innerHTML = p.precio;

        p.infoCountCant.innerHTML = pc.result
    },

    closeCard: function(){ //cierra la carta
        p.cardEdit.style.marginLeft = '-100%';
        setTimeout(()=>{p.cardEdit.style.display = 'none';}, 200);
        setTimeout(()=>{p.bodyDom.removeChild(p.lightbox);}, 200);
        pc.result = 1;
    },

    sendInfoCard: function(){ //envia la informacion
        p.infoFinalOrder.value+= `${p.title} X ${p.infoCountCant.innerHTML}, ${Number(p.precio.substr(1)) * Number(p.infoCountCant.innerHTML)} - `;
        setTimeout(m.closeCard, 200); 
    },

    createListOrder: function(){
        var h3 = document.createElement('h3');
        var h4 = document.createElement('h4');
    
        p.listOrder.appendChild(document.createElement('DIV')).setAttribute('class','item');

        p.listOrder.lastChild.appendChild(h3).innerHTML = `${p.title} X ${p.infoCountCant.innerHTML}`;
        p.listOrder.lastChild.appendChild(h4).innerHTML = `$${Number(p.precio.substr(1)) * Number(p.infoCountCant.innerHTML)}`;

        m.deleteListOrder();
        m.calculaPrecioTotal();
    },

    calculaPrecioTotal: function(paramPrecio, paramItem){
        let itemList = document.querySelectorAll('.item');
        let precioTotalGeneral = 0;
        if (paramPrecio) {
            precioTotalGeneral-paramPrecio;
        }
        for (let i = 0; i < itemList.length; i++) {
            precioTotalGeneral+=Number(itemList[i].childNodes[1].innerHTML.substr(1));

        }
        p.total.childNodes[3].innerHTML = `$${precioTotalGeneral}`;
        p.inputPrecioT.value = `$${precioTotalGeneral}`
        if(paramItem){
            p.itemTotal-=paramItem;
            p.titleOrderCant.innerHTML = `(${p.itemTotal} items)`;
        } else {
            p.itemTotal+= Number(p.infoCountCant.innerHTML);
            p.titleOrderCant.innerHTML = `(${p.itemTotal} items)`;
        }
    },

    deleteListOrder: function(){
        let itemList = document.querySelectorAll('.item');
        for (let i = 0; i < itemList.length; i++) {
            itemList[i].addEventListener('click', function(){
                
                let itemRemove = `${itemList[i].childNodes[0].innerHTML}, ${itemList[i].childNodes[1].innerHTML.substr(1)} - `;
                
                p.infoFinalOrder.value = p.infoFinalOrder.value.replace(itemRemove, '');
 
                p.listOrder.removeChild(itemList[i]);
                m.calculaPrecioTotal(Number(itemList[i].childNodes[1].innerHTML.substr(1)),Number(itemList[i].childNodes[0].innerHTML.substr(itemList[i].childNodes[0].innerHTML.length-1, 1)));
            });  
        }
        
    },
}

m.captEventChoice();


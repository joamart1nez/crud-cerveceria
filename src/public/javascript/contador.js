var pc = {
    resta : document.querySelector('#span1'),
    suma : document.querySelector('#span2'),
    unidad : document.querySelector('#unidad'),
    result : 1
}

var mc = {
    captOperation : function(){
        pc.suma.addEventListener('click', function(){
            pc.result = pc.unidad.innerHTML++;
        });
        pc.resta.addEventListener('click', function(){
            pc.result = pc.unidad.innerHTML--;
        })
    }
}

mc.captOperation();
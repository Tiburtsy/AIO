/*
10-12.03.2016*/

//DESCRIPTION: 


if (app.documents.length == 0) {exit()}

var lockLayers=new Array //массив залоченных слоёв
for(var i=0;i<app.activeDocument.layers.length;i++){//по всем слоям
	l=app.activeDocument.layers[i];
	if(l.locked){
		lockLayers.push(l);//запомнили залоченный слой
		l.locked=false;//разлочить слой
	}
	var items=l.pageItems.everyItem().getElements();//все объекты и группы, БЕЗ объектов в группах
	for(var j=0;j<items.length;j++){
		if(items[j].locked){items[j].locked=false}//в слое разлочить объект
	}
}

// Удаление объектов с залоченных слоёв
for(var i=0;i<lockLayers.length;i++){//по всем бывшим залоченным слоям
	var items=lockLayers[i].pageItems.everyItem().getElements();//все объекты и группы, БЕЗ объектов в группах
	for(var j=0;j<items.length;j++){
		items[j].remove();
	}
}

// Удаление объектов за пределами полосы
var items=app.activeDocument.pageItems.everyItem().getElements();//все объекты и группы, БЕЗ объектов в группах
var objOnPasteBoard=new Array;//массив объектов за пределами полосы
while(objOnPasteBoard=items.pop()){
    if (objOnPasteBoard.parentPage==null ){//за пределами полосы
        objOnPasteBoard.remove();
	}
}



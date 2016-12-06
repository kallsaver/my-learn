// JavaScript Document
documentReady(function(){
	slide('banner')
	position('LocationFloorList');
	show('wrap_navlist');
	var afloor =document.getElementsByClassName('Floor')[0];
	var aLi = afloor.children[0].children[1].children[0].getElementsByTagName('li');
	for(var i=0;i<aLi.length;i++){
		aLi[i].onmouseenter = function(){
			for(var j=0;j<aLi.length;j++){
				aLi[j].className = '';	
			}	
			this.className = 'hover';
		}	
	}
})
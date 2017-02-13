// JavaScript Document
var widget={
	
	"slide":function(id){
		var box=document.getElementById(id)
		var aImg=box.getElementsByTagName("img");
		var before=box.getElementsByClassName("before")[0];
		var after=box.getElementsByClassName("after")[0];
		var ul=box.getElementsByTagName("ul")[0];
		var n=0;
		ul.style.width=tools.getstyle(aImg[0],"width",null)*aImg.length+"px";
		
		
		var consol=document.createElement("div");
		for(var m=0;m<aImg.length;m++){			
			consol.innerHTML+='<a href="#" >'+(m+1)+'</a>';
		}
			consol.className="consol";
			box.appendChild(consol);
			
			
		var aA=consol.getElementsByTagName("a");
		
					
		function change(n){
			console.log(n)
			tools.run(ul,200,{"left":-n*400},null)
			for(var j=0;j<aImg.length;j++){
					aA[j].className="";
				}
			aA[n].className="active";
	
		}
		
		
		for(var i=0;i<aImg.length;i++){
			aA[i].index=i
			aA[i].onclick=function(){
				n=this.index
			change(n)
			}
		}
		
		
		before.onclick=function(){
			n--;
			if(n<0){
				n=0;
			}
			
			change(n)
			
			
		}
		
		after.onclick=function(){
			n++;
			if(n>aImg.length-1){
				n=aImg.length-1;
			}
			change(n)
		}
		
	}
}
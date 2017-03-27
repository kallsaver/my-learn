// JavaScript Document



function modallayer(){
	var modal=document.createElement("div");
	modal.className="modal";
	document.body.appendChild(modal);
	//返回值扔出一个对象
	return modal;
	}


function login_widget(){
		//调用执行比这个函数前的函数
		mod=modallayer();
		var popBox=document.createElement("div");
		popBox.className="popBox";
		//innerHTML写结构时注意单引号和双引号 并且每个小模块拆开
		popBox.innerHTML='<h3 class="title"><span class="close">×</span></h3>'+
        '<span><label>用户名:</label><input class="userName" type="text"></span>'+
    	'<span><label>密码:</label><input type="password"></span>'+
    	'<div><input type="submit" class="btn" value="确定"></div>'
		document.body.appendChild(popBox);
		
		
		
		tools.popCenter(popBox);
		var title=popBox.children[0];
		tools.drag(popBox);
		
		var closeSpan=title.children[0];
		
		closeSpan.onclick=function(){			
			document.body.removeChild(popBox);
			//关闭模态层	
			document.body.removeChild(mod);	
		
		}
}
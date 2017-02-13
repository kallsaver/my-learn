// JavaScript Document
//模态层
function modalLayer(){
	var modal=document.createElement('div');
	modal.className='modal';
	document.body.appendChild(modal);
	return modal;//返回对象
};


//登录框

function loginBox(){

	var mod=modalLayer();//模态层
		
	var loginBox=document.createElement('div');
	loginBox.className='loginBox';
	
	loginBox.innerHTML='<h4>用户登录</h4>'+
    '<a href="javascript:;">×</a>'+
    '<p><label>用户名：<input type="text"></label></p>'+
    '<p><label>密　码：<input type="password"></label></p>'+
    '<p><button class="logonBtn" type="button">登录</button></p>';
	
	document.body.appendChild(loginBox);
	
	popShow(loginBox);//居中显示
	
	var tit=loginBox.children[0];//找到标题
	drag(loginBox,tit);//拖拽
	
	//关闭---------------------------------------
	var closeBtn=loginBox.children[1];//关闭按钮
	
	closeBtn.onclick=function(){
		document.body.removeChild(loginBox);
		document.body.removeChild(mod);
	}
}
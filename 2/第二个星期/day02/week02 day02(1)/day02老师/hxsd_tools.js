// JavaScript Document
//input提示
function placeholder(objInput,txt){//objInput：input框   txt：提示语
	objInput.value=txt;
	objInput.className='placeholder';
	objInput.onfocus=function(){
		if(this.value==txt){
			objInput.value='';
			objInput.className='';
		}
	};
	objInput.onblur=function(){
		if(this.value==""){
			objInput.value=txt;
			objInput.className='placeholder';
		}
	}
};
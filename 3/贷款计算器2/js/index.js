/**
 * Created by hxsd on 2016/10/14.
 */
$(function () {
	//初设值
	var interest=4.78;
    var loanType = '商业贷款';
    var year = 'one'; 
	var option=parseInt($("#select2").val());
	$("#lilv").val(interest)
	
	getInterest(loanType,year,option);
	//console.log(interest)
	
	
	//自定义对象 分类和储存数据 
	function getInterest(loanType,year,option){
		var json={
		
			"商业贷款":{"one":[
						4.78,
						4.13,
						3.91,
						3.83,
						3.7,
						3.05,
						4.35,
						5.06,
						3.91,
						3.22,
						4.6
						],
						"two":[
						5.39,
						4.66,
						4.41,
						4.31,
						4.17,
						3.43,
						4.9,
						5.67,
						4.38,
						3.61,
						5.15
						]
			},
			
			"公积金贷款":{"one":[
						3.03,
						2.61,
						2.48,
						2.42,
						2.34,
						1.93,
						2.75,
						3.03,
						2.34,
						1.93,
						2.75		
						],
						
						"two":[
						3.58,
						3.09,
						2.93,
						2.86,
						2.76,
						2.28,
						3.25,
						3.58,
						2.76,
						2.28,
						3.25
						]
			}
		
		}
		
		interest= json[loanType][year][option]
	}
	
	$("#check input").on("click",function(){
		loanType=$(this).parent().text();
		getInterest(loanType,year,option);
		$("#lilv").val(interest)
	})
		
	$("#select1").on("change",function(){
		year=parseInt($(this).val())<6?"one":"two";
		getInterest(loanType,year,option);
		$("#lilv").val(interest)
	})

	$("#select2").on("change",function(){
		option=parseInt($(this).val());
		getInterest(loanType,year,option);
		
		console.log($(this).val())
		$("#lilv").val(interest)
	})

	 //月均还款
    function getPaymentsPerMonth(loanAmount, months, annualInterestRate) {
        var rateOfMonth = annualInterestRate / (12 * 100);
        return (loanAmount * rateOfMonth * Math.pow((1 + rateOfMonth), months)) / (Math.pow((1 + rateOfMonth), months) - 1);
    }
    //判断输入框的值是否正确
    $('#inner input').on('blur',function () {
        if(isNaN($(this).val())){
            alert('请正确输入数值');
            $(this).val('');
        }
    })
	
    //点击出结果
    $('#start').on('click',function () {
        var price = $('#inner').find('input').eq(0).val()*$('#inner').find('input').eq(1).val(); 
		//贷款总额
        var loanAmount = price*$('#inner').find('select').val()/10;     
        var months =$('#select1').val()*12;
        var annualInterestRate = $('#lilv').val();
        
            //var result = Math.round(getPaymentsPerMonth(loanAmount, months, annualInterestRate)*100)/100;   toFixed(2)四舍五入2位小数
            var result = getPaymentsPerMonth(loanAmount, months, annualInterestRate).toFixed(2);
            $('#result').find('input').eq(0).val(price);  //房款总额
            $('#result').find('input').eq(1).val(loanAmount);    //贷款总额
            $('#result').find('input').eq(2).val((result*months).toFixed(2));   //还款总额
            $('#result').find('input').eq(3).val(Math.round(((result*months)-loanAmount)*100)/100);    //支付利息
            $('#result').find('input').eq(4).val(price-loanAmount);//首期付款
            $('#result').find('input').eq(5).val(months+"(月)");// 还款月数
            $('#result').find('input').eq(6).val(result+'(元)');//月均还款
       
    })
    //重置按钮
    $('#reset').on('click',function () {
        $('#result').find('input').val('');
        $('#inner').find('input').val('')
    })

})
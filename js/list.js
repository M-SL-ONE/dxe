// var str;
var dl;
var listInfo=[];
var saveStr='';
var uid=[];
var num = 0;
var nowNum = 0;
var totalNum =0;
var totalMoney =0;
// var info=[];
// var str2;
$(function(){
	var now = new Date();
	var time = now.getFullYear() + "-" +((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();

	$('.xqrq').val(time)
	//初始化日期插件	
	$('.xqrq').date();	

	$('.config-list').css('height',$(window).height() - $('.header').height()- $('.config-target').outerHeight(true))
	$('.list-info').css('height',$(window).height() - $('.header').height()- $('.list-edit').outerHeight(true)- $('.footer').height());
	$('.type-list').css('height',$(window).height());
	// 返回上一页
	$('.return').click(function(){
		window.history.back(-1);
	})
	// 未审核
	$('.unreviewed').click(function(){
		$('.unreviewed').siblings().removeClass('nowState');
		$('.unreviewed').addClass('nowState');
		if ($('.list-info').children('dl').length==0) {
			alert("当前没有数据")
		} 
	})
	$('.reviewed').click(function(){
		$('.reviewed').siblings().removeClass('nowState');
		$('.reviewed').addClass('nowState');
		if ($('.list-info').children('dl').length==0) {
			alert("当前没有数据")
		}
	})
	$('.all').click(function(){
		$('.all').siblings().removeClass('nowState');
		$('.all').addClass('nowState');
		if ($('.list-info').children('dl').length==0) {
			alert("当前没有数据")
		} 
	})

	// 展开和收缩
	var on = true;
	$('.fold').find('i').click(function(){
		if (on) {
		    $(this).parent().prev().children('p').hide();
		    $(this).parent().prev().children('p:last').show();
			$(this).removeClass('fa-angle-double-down').addClass('fa-angle-double-up');
			$('.list-info').css('top','5.5rem');
			on = false;
		} else {
			$(this).parent().prev().children('p').show()
			$(this).removeClass('fa-angle-double-up').addClass('fa-angle-double-down');
			$('.list-info').css('top','11.5rem');
		    on = true;
		}
		$('.list-info').css('height',$(window).height() - $('.header').height()- $('.list-edit').outerHeight(true)- $('.footer').height())
	})
	// 搜索条码
	$('.searchbtn').click(function(){
		if ($('.tm').val()=='') {
			alert("请输入条码");
		} else {
			alert("开始搜索"+$('.tm').val());
		}
	})

	// 商品排序
	sortGoods();
	// 删除商品
	$(document).on('click','.delete',function(){
		if (delete_goods_confirm($(this).parent().find('dt').find('.name').html())) {
			totalNum-=$(this).parent().find('.num').find('span').text();
		    totalMoney-=$(this).parent().find('.money').find('span').text();
		    $('.totalNum').find('span').text(totalNum);
			$('.totalMoney').find('span').text(totalMoney);
		    $(this).parent().remove();
			sortGoods();
		} 
	})

	// 添加商品
	$('.add').click(function(){
		$('.class-list').show();
		$('.type-list').show();
		$('#search').attr('on','true');
		$('#search').val('');
	})
	// 商品类别排序
	$('.class-list').children('dl').each(function(i,elem){
		$(elem).find('dt').find('i').text(i+1);
	})
	// 选择类别
	$('.class-list').children('dl').each(function(i,elem){
		$(elem).click(function(){
			$('.class-list').hide();
			$('.goods-list').hide();
			$('.goods-list').eq(i).show();
			$('#search').attr('on','false');
		})
	})	
	// 显示商品
	$('.showImg').click(function(){
		if ($(this).text()=="显示图片") {
			$('.class-list').children('dl').find('img').show();
			$('.class-list').children('dl').find('div').css('width','10.5rem');
			$('.goods-list').children('dl').find('img').show();
			$('.goods-list').children('dl').find('div').css('width','10.5rem');
			$(this).text("隐藏图片");
		} else {
			$('.class-list').children('dl').find('img').hide();
			$('.class-list').children('dl').find('div').css('width','14rem');
			$('.goods-list').children('dl').find('img').hide();
			$('.goods-list').children('dl').find('div').css('width','14rem');
			$(this).text("显示图片");
		}
	})
	// 返回上一级
	$('.top').click(function(){
		if ($('.class-list').css('display')=='none') {
			$('.class-list').css('display','block');
			$('.goods-list').css('display','none');
			$('#search').attr('on','true');
			$('.goods-list').children('dl').each(function(i,elem){
				$(elem).siblings().find('div').find('dt').find('span').removeClass('fa-check-square-o').addClass('fa-square-o');
			})
		} else {
			alert('已是最上级')
		}
	})

	// 设置商品序号
	for (var i = 0; i < $('.goods-list').length; i++) {
		$('.goods-list').eq(i).children('dl').each(function(j,elem){
			$(elem).attr('on','false');
			$(elem).find('div').find('dt').find('i').text(j+1);
		})
	}
	// 选择商品
	$('.goods-list').children('dl').each(function(i,elem){
		
		$(elem).click(function(){
			$(this).siblings().find('div').find('dt').find('span').removeClass('fa-check-square-o').addClass('fa-square-o');
			$(this).siblings().attr('on','false');
			if ($(elem).attr('on')=='true') {
				$(this).find('div').find('dt').find('span').removeClass('fa-check-square-o').addClass('fa-square-o');
				$(elem).attr('on','false');
			} else {
				$(this).find('div').find('dt').find('span').removeClass('fa-square-o').addClass('fa-check-square-o');
				$(elem).attr('on','true');
			}
		})
	})	

	// 确定商品
	for (var i = 0; i < $('.goods').length; i++) {
		$('.goods').eq(i).attr('on','false');

	}
	var s1=0;
	var s2=0;
	$('.determain').click(function(){
		$('.goods-list').find('dl').show();
		// $('.goods-list').show();
		s1= $('.fa-check-square-o').parent().parent().parent().attr('id');
		// alert($('.fa-check-square-o').parent().parent().parent().attr('id'))
		if ($('.fa-check-square-o').length==0) {
			alert("至少选择一个商品")
		} else if($('.fa-check-square-o').length>1){
			for (var i = 0; i < $('.fa-check-square-o').length; i++) {
				uid.push($('.fa-check-square-o').eq(i).parent().parent().parent().attr('id'))
			}
			$('.goods-list').hide();
			$('.type-list').hide();
			$('.preGoods').show();
			$('.nextGoods').show();
			$('.goods-info').show();
			$('.goods').hide();
			$('.goods').eq(uid[num]-1).show();
			$('.goods').attr('on','false');
			$('.goods').eq(uid[num]-1).attr('on','true');		
		} else{
			$('.goods-list').hide();
			$('.type-list').hide();
			for (var i = 0; i < $('.goods').length; i++) {
				if ($('.goods').eq(i).attr('uid')==$('.fa-check-square-o').parent().parent().parent().attr('id')) {
					$('.goods-info').show();
					$('.goods').hide();
					$('.goods').eq(i).show();
					// s1=$('.goods').eq(i).parent().index();;
					// s2=$('.goods').eq(i).index();
				}
			}
		}
		// alert(s1+''+s2)
	})
	$('.preGoods').click(function(){
		if (num==0) {
			num=uid.length-1;
		} else{
			num--;
		}
		$('.goods').hide();
		$('.goods').eq(uid[num]-1).show();
		$('.goods').attr('on','false');
		$('.goods').eq(uid[num]-1).attr('on','true');
	})
	$('.nextGoods').click(function(){
		if (num==uid.length-1) {
			num=0;
		} else{
			num++;
		}
		$('.goods').hide();
		$('.goods').eq(uid[num]-1).show();
		$('.goods').attr('on','false');
		$('.goods').eq(uid[num]-1).attr('on','true');
	})	
	// 修改数量
	$(document).on('blur','.sl',function(){
		$(this).attr('value',$(this).val());
		$('.je').eq($(this).parent().parent().parent().parent().parent().index()).attr('value',$('.zkdj').eq($(this).parent().parent().parent().parent().parent().index()).val()*$(this).val())
	})

	// 修改单位
	$(document).on('click','.unit',function(){
		$(this).siblings().removeClass('nowUnit');
		$(this).addClass('nowUnit');
	})

	// 修改单价
	$(document).on('blur','.dj',function(){
		$(this).attr('value',$(this).val());
		var zkdj = $('.zk').eq($(this).parent().parent().parent().parent().parent().index()).val()*$(this).val();
		var num  = $('.sl').eq($(this).parent().parent().parent().parent().parent().index()).val();
		$('.je').eq($(this).parent().parent().parent().parent().parent().index()).attr('value',num*zkdj);
		$('.choosePrice').find("option:selected").text('请选择单价')
	})

	// 修改折扣
	$(document).on('blur','.zk',function(){
		if ($(this).val()>=2) {
		    alert("折扣不能大于2")
		    $(this).val('1')
		} else if($(this).val()<1){
		    alert("折扣不能小于1")
		    $(this).val('1')
		} else{
			$(this).attr('value',$(this).val());
			$('.zkdj').eq($(this).parent().parent().parent().parent().parent().index()).attr('value',$('.dj').eq($(this).parent().parent().parent().parent().parent().index()).val()*$(this).val())
			$('.je').eq($(this).parent().parent().parent().parent().parent().index()).attr('value',$('.zkdj').eq($(this).parent().parent().parent().parent().parent().index()).val()*$('.sl').eq($(this).parent().parent().parent().parent().parent().index()).val())
		}
	})

	// 选择单价
	$('.choosePrice').each(function(i,elem){
		$(elem).change(function(){
			if ($(this).find("option:selected").text().indexOf("：")>0 ){
				var selectedPrice = $(this).find("option:selected").text().substring($(this).find("option:selected").text().indexOf("：")+1,$(this).find("option:selected").text().length);
				// alert(selectedPrice)
				$('.dj').eq(i).val(selectedPrice);
				$('.zkdj').eq(i).attr('value',selectedPrice*$('.zk').eq(i).val())
				$('.je').eq(i).attr('value',$('.zkdj').eq(i).val()*$('.sl').eq(i).val())
			} 
		})
	})

	// 保存商品信息
	$('.saveGoods').click(function(){
		nowNum = s1-1;
		if (save_confirm(nowNum)) {
			listInfo.push({
				"name":$('.goods').eq(nowNum).find('form').find('.goods-head').find('div').find('p').eq(0).text(),
				"bh":$('.goods').eq(nowNum).find('form').find('.goods-head').find('div').find('p').eq(1).find('span').text(),
				"zk":$('.goods').eq(nowNum).find('form').find('.head-body').children('div').eq(3).children('p').eq(0).find('input').attr('value'),
				"num":$('.goods').eq(nowNum).find('form').find('.head-body').children('div').eq(0).find('p').find('input').attr('value'),
				"price":$('.goods').eq(nowNum).find('form').find('.head-body').children('div').eq(2).children('p').eq(0).find('.dj').val(),
				"je":$('.goods').eq(nowNum).find('form').find('.head-body').children('div').eq(4).find('p').find('input').attr('value')
			}) ;
			$('.goods-info').hide();
				if (listInfo[listInfo.length-1].zk==1) {
					listInfo[listInfo.length-1].zk='';
				} else{
					listInfo[listInfo.length-1].zk+='折';
				}
			dl='<dl class="clearfix">'+
				'<dt class="title">'+
					'<i class="queue"></i>'+
					'<span class="number">'+listInfo[listInfo.length-1].bh+'</span>'+
					'<span class="name">'+listInfo[listInfo.length-1].name+'</span>'+
					'<span class="discount">'+listInfo[listInfo.length-1].zk+'</span>'+
				'</dt>'+
				'<dd class="num">数量：<span>'+listInfo[listInfo.length-1].num+'</span>盒</dd>'+
				'<dd class="price">单价：<span>'+listInfo[listInfo.length-1].price+'</span></dd>'+
				'<dd class="money">金额：<span>'+listInfo[listInfo.length-1].je+'</span></dd>'+
				'<dd class="delete"><i class="fa fa-trash"></i></dd>'+
			'</dl>';
			$('.list-info').append(dl);		
			totalNum+=parseFloat(listInfo[listInfo.length-1].num);
			totalMoney+=parseFloat(listInfo[listInfo.length-1].je);
			$('.totalNum').find('span').text(totalNum);
			$('.totalMoney').find('span').text(totalMoney);
			$('.goods-list').children('dl').each(function(i,elem){	
				$(elem).find('div').find('dt').find('span').removeClass('fa-check-square-o').addClass('fa-square-o');
			})
			sortGoods()
			$('.goods').hide();			
		} else {
			alert(saveStr)
		}


	})
	var text = "";
	var n=-1;
	$('#search').focus(function(){
		// for (var i = 0; i < $('.goods-list').length; i++) {
		// 	$('.goods-list').eq(i).find('dl').find('dt').find('i').hide();
		// }
		for (var i = 0; i < $('.queue').length; i++) {
			$('.queue').eq(i).text(i+1);
		}

		if ($('#search').attr('on')=='true') {
			$('.class-list').hide();
			$('.goods-list').show();
		} else {
			for (var i = 0; i < $('.goods-list').length; i++) {
				if ($('.goods-list').eq(i).css('display')=='block') {
					n=i;
					// continue;
				} 
			}
			
		}
		$('.goods-list').show();
		$('.goods-list').find('dl').show();
	})
	var queue=1;
	//实时筛选，不用点击按钮
	setInterval(function(){
		text = $('#search').val();//获取文本框输入
		if($.trim(text) != ""){
			$(".goods-list dl").hide().filter(":contains('"+text+"')").show();
			for (var i = 0; i < $('.queue').length; i++) {
				if ($('.queue').eq(i).css('display')=='block') {
					$('.queue').eq(i).text(queue);
					// queue++;
				} 
			}
		}
	},100);
	$('#search').blur(function(){
		for (var i = 0; i < $('.goods-list').length; i++) {
			$('.goods-list').eq(i).find('dl').find('dt').find('i').show();
		}
		if (text=='') {
			console.log(n)
			if ($('#search').attr('on')=='true') {
				$('.goods-list').hide();
				$('.class-list').show();
			} else {
				$('.goods-list').hide();
				$('.goods-list').eq(n).show();
			}
		} 
	})
})

// 商品排序
function sortGoods(){
	$('.list-info').children('dl').each(function(i,elem){
		$(elem).find('dt').find('.queue').text(toTwo(i+1));
	})	
}
// 删除商品验证
function delete_goods_confirm(name){
	var r = confirm("是否删除 "+name);
	if (r==true) {
	    return true;
	} else {
	    return false;
	}
}
function toTwo(num){
	if (num<9) {
		return '0'+num;
	} else {
		return num;
	}
}


function save_confirm(num){
	saveStr='';
	if ($('.goods').eq(num).find('form').find('.head-body').children('div').eq(0).find('p').find('input').val()=='') {
		saveStr+="请填写数量;";
	} 
	if ($('.goods').eq(nowNum).find('form').find('.head-body').children('div').eq(2).children('p').eq(0).find('.dj').val()=='') {
		saveStr+="请选择单价";
	}
	if (saveStr=='') {
		return true;
	} else {
		return false;
	}
}
var str = '';
$(function(){
		// 提交登录
	$('.login1').click(function(){
		login_confirm1();
	})
})
function login_confirm1(){
	var r = confirm("是否登录");
	if (r==true) {
	    $('form').attr('action','login.html');
	} else {
	    $('form').attr('action','');
	}
}

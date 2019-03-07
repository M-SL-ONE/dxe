$(function(){
	// 密码隐藏和显示
	$('.eye').click(function(){
		if ($('#pwd').attr('type')=='password') {
			$('#pwd').attr('type','text');
			$(this).removeClass('fa-eye-slash').addClass('fa-eye')
		} else {
			$(this).removeClass('fa-eye').addClass('fa-eye-slash')
			$('#pwd').attr('type','password');
		}
	})	
	// 提交登录
	$('.login').click(function(){
		login_confirm();
	})	
})
// 登录验证

function login_confirm(){
	var r = confirm("是否登录");
	if (r==true) {
	    $('form').attr('action','platform.html');
	} else {
	    $('form').attr('action','');
	}
}
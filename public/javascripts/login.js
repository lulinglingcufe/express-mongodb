


$('#signin1').click(function(){
	var Username = $('#userName').val();
	var Password = $('#passWord').val();
	
	if(!Password || !Username){
		alert("账户或密码不能为空！");
		return;
	}
	
	$.post("/signin",{Username:Username,Password:Password},function(result){				
			});
			

})

$('#signup').click(function(){
	var Registeruser = $('#Registeruser').val();
	var Registerpass = $('#Registerpass').val();
	var Registerpass2 = $('#Registerpass2').val();
	var Registeraccount = $('#Registeraccount').val();
	
	
	if(!Registeruser || !Registerpass || !Registerpass2 || !Registeraccount){
		alert("注册信息不能为空！");
		return;
	}
	
	
	if(Registerpass2 !== Registerpass){
    alert('两次密码不一样');
    return;
  }
	
	$.post("/signup",{Registeruser:Registeruser,Registerpass:Registerpass,Registeraccount:Registeraccount },function(result){
				console.log(result);
				window.open("http://localhost:3000");			
			});

})

<?php 
	$my = new mysqli("127.0.0.1","root","","160811","3306");
	//本地服务器地址  用户名 密码  数据库名字 端口号
	if ($my->connect_errno) {
		die("链接失败".$my->connect_error);
	}
	$my->query("set names utf8");
	$sql = "SELECT * FROM product";//获取所有的sql语句  后面跟文件名
	$rs = $my->query($sql);
	$final=$rs->fetch_all(MYSQL_ASSOC);//过滤出关联数组的形式
	echo json_encode($final);//前段只能通过json来解析
 ?>
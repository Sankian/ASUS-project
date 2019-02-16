<?php

    header("Content-Type: text/html;charset=utf-8");

    $username = @$_REQUEST["username"];
    $password = @$_REQUEST["password"];
    // 验证数据是否存在
    if(!$username || !$password){
        die('{"state":"error","errorType":"参数不能为空","errorCode":"3"}');
    }
    require("./connect.php");
    $select_query = "SELECT username FROM user_list";
    $select_res = mysql_query($select_query);

    while($row = mysql_fetch_array($select_res)){
        if($username === $row["username"]){
                mysql_close($con);
                die('{"state":"error","errorType":"用户名已存在","errorCode":"4"}');
        }
    }

    // 插入数据
    $password = md5($password);
    $inster_query = "INSERT INTO user_list (username , password) VALUES('$username','$password')" ;

    $insert_res = mysql_query($inster_query);
    if($insert_res){
        die('{"state":"success","errorType":"注册成功","errorCode":"1"}');
    }else{
        die('{"state":"error","errorType":"注册成功","errorCode":"5"}');
    }


?>
<?php
      $con = mysql_connect("localhost","root","root");
      if(!$con){
            dei('{"state":"error","errorType":"数据库错误","stateCode":"2"}');
      }
      mysql_select_db("userlist");
?>    
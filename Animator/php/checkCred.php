<?php
$trueAccount = false;
$pass = $_REQUEST['pass'];
if(isset($_REQUEST['user'])){
$user = $_REQUEST['user'];
}else{
$user = $_COOKIE['RemAnimatorUser'];
}
$validUsername = false;

if(file_exists('../users/' . $user . '/pass.php')){
$validUsername = true;
$encrypted_pass = md5($pass);

include '../users/'.$user.'/pass.php';

if($encrypted_pass == $X_pass || $pass == $X_pass){
$trueAccount = true;
}
}

?>
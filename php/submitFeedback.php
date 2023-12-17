<?php
include_once("dbconnect.php");

$isValid = true;
$status = 400;

$title = $_POST["title"];
$feedback = $_POST["feedback"];
$userId = $_SESSION["user_id"];

if($feedback == "" || $title == ""){
    $isValid = false;
    $status = 401;
}


if($isValid){
    $stmt = $con -> prepare("INSERT INTO feedback (title,message, user_id) values(?,?,?) ");
    $stmt -> bind_param('ssi',$title, $feedback, $userId);
    $stmt ->execute();
    $stmt -> close();

    $status = 200;
}

$obj = array('feedback'=> $feedback, 'user' => $userId, 'status' => $status);
$json = json_encode($obj, JSON_FORCE_OBJECT);
echo $json;
?>
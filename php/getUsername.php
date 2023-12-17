<?php
include_once("dbconnect.php");

$data = array();

$user_id = $_SESSION["user_id"];

$stmt = $con -> prepare("SELECT firstName, lastName FROM users WHERE user_id = ?");
$stmt ->bind_param("i", $user_id);
$stmt ->execute();
$res = $stmt -> get_result();
$stmt -> close();

while($row = $res -> fetch_assoc()){
    $data[] = $row;
}

$json = json_encode($data);
echo $json;


?>
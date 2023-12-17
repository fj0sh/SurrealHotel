<?php
include_once("dbconnect.php");

$user_id = $_SESSION["user_id"];

$data = array();

$stmt = $con -> prepare("SELECT * FROM booking WHERE user_id = ?");
$stmt -> bind_param('i', $user_id);
$stmt -> execute();

$result = $stmt ->get_result();

while($row = $result -> fetch_assoc()){
    $data[] = $row;
}

$stmt -> close();

$obj = array('data' => $data);
$json = json_encode($obj);

echo $json;
?>
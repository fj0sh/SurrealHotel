<?php
include_once("dbconnect.php");

$room_id = $_POST["roomId"];

$room_num = $_POST["roomNumber"];
$room_type = $_POST["roomType"];
$room_limit = $_POST["roomLimit"];
$room_price = $_POST["roomPrice"];


$stmt = $con -> prepare("UPDATE rooms SET roomNumber = ?, roomType = ?, guestLimit = ?, price = ? WHERE room_id= ? ");
$stmt -> bind_param("ssiii", $room_num, $room_type, $room_limit, $room_price, $room_id);
$stmt -> execute();
$stmt -> close();

$obj = array('id' => $room_id, 'num' => $room_num, 'type' => $room_type,'price' => $room_price);
$json = json_encode($obj, JSON_FORCE_OBJECT);

echo $json;


?>
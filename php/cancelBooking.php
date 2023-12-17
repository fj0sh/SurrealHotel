<?php
include_once("dbconnect.php");

$status = 400;
$retVal = "";

$bookingId = $_POST["bookingId"];
$roomId = $_POST["roomId"];

$user_id = $_SESSION["user_id"];

$stmt = $con -> prepare("UPDATE rooms SET status = 'available', booking_id = NULL WHERE room_id = ?");
$stmt -> bind_param("i", $roomId);
$stmt -> execute();
$stmt -> close();

$stmt2 = $con -> prepare("UPDATE booking SET status = 'cancelled' WHERE booking_id = ?");
$stmt2 -> bind_param("i", $bookingId);
$stmt2 -> execute();
$stmt2 -> close();

$myObj = array('booking' => $bookingId, 'room' => $roomId);
$myJSON = json_encode($myObj, JSON_FORCE_OBJECT);
echo $myJSON;
?>
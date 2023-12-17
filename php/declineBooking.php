<?php
include_once("dbconnect.php");

$booking_id = $_POST["booking_id"];

$stmtbooking = $con -> prepare("UPDATE booking SET status = 'declined' WHERE booking_id = ?");
$stmtbooking -> bind_param("i", $booking_id );
$stmtbooking -> execute();
$stmtbooking-> close();

$stmtrooms = $con -> prepare("UPDATE rooms SET status = 'available', booking_id = NULL WHERE booking_id = ?");
$stmtrooms -> bind_param("i", $booking_id );
$stmtrooms -> execute();
$stmtrooms -> close();
?>
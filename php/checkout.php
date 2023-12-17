<?php
include_once("dbconnect.php");

$currDate = date('y-m-d');

$stmt = $con -> prepare("UPDATE booking SET status = 'checkedOut' WHERE checkOutDate = ?");
$stmt -> bind_param("s", $currDate);
$stmt -> execute();
$stmt -> close();

$stmtRoom = $con->prepare("UPDATE rooms SET status = 'available', booking_id = NULL WHERE booking_id IN (SELECT booking_id FROM booking WHERE checkOutDate = ?)");
$stmtRoom->bind_param("s", $currDate);
$stmtRoom->execute();
$stmtRoom->close();

?>
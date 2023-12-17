<?php
include_once("dbconnect.php");

$stmtGuest = $con -> prepare("SELECT COUNT(*) as totalGuest FROM users");
$stmtGuest -> execute();
$result1 = $stmtGuest -> get_result();
$stmtGuest -> close();

while($row = $result1 -> fetch_assoc()){
    $total_guests = $row['totalGuest'];
}

$stmtBooked = $con -> prepare("SELECT COUNT(*) as totalBookedGuest FROM booking WHERE status = 'booked'");
$stmtBooked -> execute();
$result2 = $stmtBooked -> get_result();
$stmtBooked -> close();

while($row = $result2 -> fetch_assoc()){
    $totalBooked = $row['totalBookedGuest'];
}

$stmtAvailable = $con -> prepare("SELECT COUNT(*) as availableRooms FROM rooms WHERE status = 'available'");
$stmtAvailable -> execute();
$result3 = $stmtAvailable -> get_result();
$stmtAvailable -> close();

while($row = $result3 -> fetch_assoc()){
    $available = $row['availableRooms'];
}

$stmtFeedback = $con -> prepare("SELECT COUNT(*) as totalFeedback FROM feedback");
$stmtFeedback -> execute();
$result4 = $stmtFeedback -> get_result();
$stmtFeedback -> close();

while($row = $result4 -> fetch_assoc()){
    $feedbacks = $row['totalFeedback'];
}

$obj = array('totalguest' => $total_guests, 'totalbooked' => $totalBooked, 'availableRooms' => $available, 'totalFeedback' => $feedbacks);
$json  =json_encode($obj);
echo $json;

?>
<?php
include_once("dbconnect.php");

$firstname = $_POST["firstname"];
$lastname = $_POST["lastname"];
$checkindate = $_POST["checkInDate"];
$checkintime = $_POST["checkInTime"];
$checkoutdate = $_POST["checkOut"];
$guests = $_POST["guestNum"];
$roomType = $_POST["roomType"];

$user_id = $_SESSION["user_id"];

$status = 400;
$isValid = true;
$retVal = "";

if ($firstname === "" || $lastname === "" || $checkindate === "" || $checkintime === "" || $checkoutdate === "" || $guests === "") {
    $isValid = false;
    $retVal = "Input all fields";
    $status = 401;
}

$checkrooms = $con->prepare("SELECT roomType FROM rooms WHERE status='available' AND roomType = ?");
$checkrooms->bind_param("s", $roomType);
$checkrooms->execute();
$checkrooms->store_result();
$numRows = $checkrooms->num_rows;
$checkrooms->close();

if ($numRows <= 0) {
    $status = 404;
    $retVal = "Room Full";
    $isValid = false;
}

if ($isValid) {
    $stmt = $con->prepare("INSERT INTO booking (firstName, lastName, checkInDate, checkInTime, checkOutDate, numberOfGuests,status, user_id) values (?,?,?,?,?,?,'pending',?)");
    $stmt->bind_param("sssssii", $firstname, $lastname, $checkindate, $checkintime, $checkoutdate, $guests, $user_id);
    $stmt->execute();
    $stmt->close();

    $booking_id = $con->insert_id;

    $stmtroom = $con->prepare("UPDATE rooms SET booking_id = ?, status = 'pending' WHERE roomType = ? AND status = 'available' LIMIT 1");
    $stmtroom->bind_param("is", $booking_id, $roomType);
    $stmtroom->execute();
    $stmtroom->close();

    $status = 200;
    $retVal = "Requesting Room";
}

$myObj = array('status' => $status, 'message' => $retVal, 'user' => $user_id,'rooms' => $numRows);
$myJSON = json_encode($myObj, JSON_FORCE_OBJECT);
echo $myJSON;
?>

<?php
include_once("dbconnect.php");

$retVal = "";
$status = 400;
$bookingdata = [];
$roomdata = [];

$user_id = $_SESSION['user_id'];

// Combine queries using JOIN
$stmt = $con->prepare("SELECT booking.*, rooms.* FROM booking LEFT JOIN rooms ON booking.booking_id = rooms.booking_id WHERE booking.user_id = ? AND rooms.status = 'booked'");
$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();
$stmt->close();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $bookingdata[] = array(
            'booking_id' => $row['booking_id'],
            'firstname' => $row['firstName'],
            'lastname' => $row['lastName'],
            'checkInDate' => $row['checkInDate'],
            'checkInTime' => $row['checkInTime'],
            'checkOutDate' => $row['checkOutDate'],
            'numberOfGuests' => $row['numberOfGuests'],

            'room_id' => $row['room_id'], // Adjust this based on your actual column name
            'roomNumber' => $row['roomNumber'],
            'roomType' => $row['roomType'],
            'status' => $row['status']
            
        );
    }

    $status = 200;
    $retVal = "User booking info found";
} else {
    $retVal = "No booking found";
}

$myObj = array('status' => $status, 'message' => $retVal, 'bookingData' => $bookingdata);
$myJSON = json_encode($myObj);
echo $myJSON;
?>

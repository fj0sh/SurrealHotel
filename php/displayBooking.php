<?php
include_once("dbconnect.php");
$status = 200;

$stmt = $con -> prepare("SELECT rooms.roomType, rooms.roomNumber, booking.* FROM rooms JOIN booking ON rooms.booking_id = booking.booking_id WHERE booking.status = 'pending' OR booking.status = 'booked' ");
$stmt -> execute();
$result = $stmt -> get_result();
$stmt -> close();

if($result -> num_rows == 0){
    $data = 404;
    
}else{

while($row = $result-> fetch_assoc()){
    $data[] = $row;
}
}

$json  = json_encode($data);

echo $json;

?>
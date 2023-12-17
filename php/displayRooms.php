<?php
include_once("dbconnect.php");

$stmt = $con -> prepare("SELECT * FROM rooms");
$stmt ->execute();
$result = $stmt -> get_result();
$stmt -> close();

while($row = $result -> fetch_assoc()){
    $roomData[] = $row;
}

$json = json_encode($roomData);

echo($json);

?>
<?php
include_once("dbconnect.php");

$data = array();

$stmt = $con -> prepare("SELECT * FROM feedback LIMIT 5");
$stmt -> execute();
$result = $stmt -> get_result();
$stmt -> close();

while($row = $result -> fetch_assoc()){
    $data[] = $row;
}

$json = json_encode($data);
echo $json;

?>
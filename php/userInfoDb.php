<?php
include_once("dbconnect.php");

$stmt = $con -> prepare("SELECT * FROM users");
$stmt -> execute();
$result = $stmt -> get_result();
$stmt -> close();

while($row = $result -> fetch_assoc()){
    $userInfo[] = $row;
}

$json = json_encode($userInfo);
echo $json;

?>
<?php
include_once("dbconnect.php");

$stmt = $con->prepare("SELECT feedback.*, users.firstName, users.lastName FROM feedback JOIN users ON feedback.user_id = users.user_id");
$stmt->execute();

$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$stmt->close();
$con->close();

$obj = array("data" => $data);
$json = json_encode($obj);

echo $json;
?>
<?php
include_once("dbconnect.php");

$bqav = $con -> prepare("SELECT COUNT(*) FROM rooms where roomType = 'bronze-queen' AND status = 'available' ");
$bqav -> execute();
$bqav -> bind_result($bqavRooms);
$bqav -> fetch();
$bqav ->close();

$bkav = $con -> prepare("SELECT COUNT(*) FROM rooms where roomType = 'bronze-king' AND status = 'available' ");
$bkav -> execute();
$bkav -> bind_result($bkavRooms);
$bkav -> fetch();
$bkav ->close();

$skav = $con -> prepare("SELECT COUNT(*) FROM rooms where roomType = 'silver-king' AND status = 'available' ");
$skav -> execute();
$skav -> bind_result($skavRooms);
$skav -> fetch();
$skav ->close();

$gkav = $con -> prepare("SELECT COUNT(*) FROM rooms where roomType = 'gold-king' AND status = 'available' ");
$gkav -> execute();
$gkav -> bind_result($gkavRooms);
$gkav -> fetch();
$gkav ->close();

$gtav = $con -> prepare("SELECT COUNT(*) FROM rooms where roomType = 'gold-twin' AND status = 'available' ");
$gtav -> execute();
$gtav -> bind_result($gtavRooms);
$gtav -> fetch();
$gtav ->close();




$obj = array('availablebq' => $bqavRooms, 'availablebk' => $bkavRooms,'availablesk' => $skavRooms, 'availablegk' => $gkavRooms, 'availablegt' => $gtavRooms);
$json = json_encode($obj);

echo $json;
?>
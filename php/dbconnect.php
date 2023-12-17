<?php
session_start();

$host = "localhost";
$username = "root";
$password = "";
$db = "surrealdraft";

$con = mysqli_connect($host, $username, $password, $db);

if(!$con){
    die("error".mysqli_connect_error());
}
?>
<?php
include_once("dbconnect.php");

$retVal = "";
$status = 400;
$isValid = true;
$data = [];

$email = $_GET["email"];
$password = $_GET["password"];

if($email == "" || $password == ""){
    $isValid = false;   
    $status = 400;
    $retVal  = "Input all fields";
}

if($isValid){
    $stmt = $con -> prepare("SELECT * FROM users where email = ? ");
    $stmt -> bind_param("s", $email);
    $stmt -> execute();
    $result = $stmt -> get_result();
    $stmt -> close();

    if($result -> num_rows > 0){
        $user = $result -> fetch_assoc();
        if($password === $user["password"]){
            $retVal = "Login Successfully";
            $status = 200;
            $data = $user;

            $_SESSION["user_id"] = $user["user_id"];
        }
        else{
            $retVal = "password not matched";
            $status = 401;
            $isValid = false;
        }
    }
    else{
        $retVal = "Acccount does not exist";
        $status = 402;
        $isValid = false;
    }
}

$myObj = array('status' => $status, 'message' => $retVal, 'data' => $data);
$myJSON = json_encode($myObj, JSON_FORCE_OBJECT);
echo $myJSON;

?>
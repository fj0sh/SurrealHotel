<?php
include_once("dbconnect.php");

$status = 400;
$retval = "";
$isValid = true;

$fname = $_POST["fname"];
$lname = $_POST["lname"];
$email = $_POST["email"];
$password = $_POST["password"];
$confpass = $_POST["confpass"];
$bday = $_POST["bday"];
$contact = $_POST["contact"];
$address = $_POST["address"];

if ($fname == "" || $lname == "" || $email == "" || $password == "" || $confpass == "" || $bday == "" || $contact == "" || $address == "") {
    $retVal  = "Please input all fields";
    $isValid = false;
    $status = 401;
}

if ($password != $confpass) {
    $retVal  = "Password Unmatched";
    $isValid = false;
    $status = 402;
}

if ($isValid) {
    // Check if the email already exists in the database
    $checkStmt = $con->prepare("SELECT email FROM users WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        $status = 403; // Status code for email already exists
        $retVal = "Email address already exists";
    } else {
        // If the email doesn't exist, proceed with the insertion
        $insertStmt = $con->prepare("INSERT INTO users (firstName, lastName, contact, dateOfBirth, email, password, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, 'regular')");
        $insertStmt->bind_param("sssssss", $fname, $lname, $contact, $bday, $email, $password, $address);
        $insertStmt->execute();
        $insertStmt->close();

        $status = 200;
        $retVal = "User Added";
    }

    $checkStmt->close();
}

$myObj = array('status' => $status, 'message' => $retVal);
$myJSON = json_encode($myObj, JSON_FORCE_OBJECT);
echo $myJSON;
?>
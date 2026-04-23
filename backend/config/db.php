<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "workers_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "DB Connection failed"]));
}

$conn->set_charset("utf8");
?>
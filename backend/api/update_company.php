<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "workers_db");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["id"])) {
    echo json_encode(["success" => false, "message" => "Invalid data"]);
    exit;
}

$id = $data["id"];
$karganame = $data["karganame"];
$email = $data["email"];
$phone = $data["phone"];
$title = $data["title"];
$mawadtype = $data["mawadtype"];
$bio = $data["bio"];

$sql = "UPDATE companies SET 
        karganame='$karganame',
        email='$email',
        phone='$phone',
        title='$title',
        mawadtype='$mawadtype',
        bio='$bio'
        WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}
<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "workers_db");

$data = json_decode(file_get_contents("php://input"), true);

$worker_id = $data["worker_id"];
$name = $data["name"];
$email = $data["email"];
$feedback = $data["feedback"];
$rating = $data["rating"];

$sql = "INSERT INTO feedback (worker_id, name, email, feedback, rating)
        VALUES ('$worker_id', '$name', '$email', '$feedback', '$rating')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
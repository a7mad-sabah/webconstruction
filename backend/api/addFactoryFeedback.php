<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "workers_db");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB error"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$factory_id = $data["factory_id"];
$name = $data["name"];
$email = $data["email"];
$feedback = $data["feedback"];
$rating = $data["rating"];

$sql = "INSERT INTO factory_feedback 
(factory_id, name, email, feedback, rating)
VALUES ('$factory_id', '$name', '$email', '$feedback', '$rating')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}
?>
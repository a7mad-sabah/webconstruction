<?php
error_reporting(0);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "workers_db");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "DB connection error"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (!$email || !$password) {
    echo json_encode([
        "success" => false,
        "message" => "تکایە هەموو خانەکان پڕبکەوە"
    ]);
    exit;
}


$stmt = $conn->prepare("SELECT * FROM users WHERE email=? AND password=?");
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    echo json_encode([
        "success" => true,
        "role" => $user['role'], // 👈 admin / user / company
        "data" => $user
    ]);
    exit;
}

echo json_encode([
    "success" => false,
    "message" => "ئیمەیڵ یان وشەی نهێنی هەڵەیە"
]);
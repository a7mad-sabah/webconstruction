<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "workers_db");
if ($conn->connect_error) {
    echo json_encode(["error" => $conn->connect_error]);
    exit;
}

$users = $conn->query("SELECT * FROM users")->fetch_all(MYSQLI_ASSOC);
$companies = $conn->query("SELECT * FROM companies")->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    "users" => $users,
    "companies" => $companies
]);

$conn->close();
?>
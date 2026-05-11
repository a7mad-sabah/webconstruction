<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$conn = new mysqli("localhost", "root", "", "workers_db");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    $data = $_POST;
}

if (!$data || empty($data)) {
    echo json_encode([
        "success" => false,
        "message" => "No data received"
    ]);
    exit;
}

/* inputs */
$karganame = trim($data["karganame"] ?? "");
$email     = trim($data["email"] ?? "");
$password  = $data["password"] ?? ""; // ❌ NO HASH

$mawadtype = trim($data["mawadtype"] ?? "");
$phone     = trim($data["phone"] ?? "");
$bio       = trim($data["bio"] ?? "");

$availableWorkers = !empty($data["availableWorkers"])
    ? intval($data["availableWorkers"])
    : null;

$city = trim($data["city"] ?? "");

$status = "pending";

if (empty($karganame) || empty($email) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "ناو، ئیمەیڵ و پاسۆرد پێویستن"
    ]);
    exit;
}

/* check email */
$check = $conn->prepare("SELECT id FROM companies WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "ئیمەیڵ پێشتر هەیە"
    ]);
    exit;
}

/* ❌ NO PASSWORD HASH */
$stmt = $conn->prepare("
    INSERT INTO companies 
    (karganame, email, password, mawadtype, phone, bio, available_workers, city, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssssssiss",
    $karganame,
    $email,
    $password, // مستقیم
    $mawadtype,
    $phone,
    $bio,
    $availableWorkers,
    $city,
    $status
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Company registered successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Insert failed",
        "error" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();

?>
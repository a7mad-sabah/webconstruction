<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

/* OPTIONS request */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

/* DB connection */
$conn = new mysqli("localhost", "root", "", "workers_db");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}

/* Read JSON input */
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

/* JSON validation */
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON format",
        "error" => json_last_error_msg()
    ]);
    exit;
}

/* fallback for form-data */
if (!$data) {
    $data = $_POST;
}

/* check empty */
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
$password  = $data["password"] ?? "";

$mawadtype = trim($data["mawadtype"] ?? "");
$phone     = trim($data["phone"] ?? "");
$bio       = trim($data["bio"] ?? "");

$availableWorkers = !empty($data["availableWorkers"])
    ? intval($data["availableWorkers"])
    : null;

$city = trim($data["city"] ?? "");

/* default status */
$status = "pending";

/* validation */
if (empty($karganame) || empty($email) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "کێشە: ناو، ئیمەیڵ و وشەی نهێنی پێویستن"
    ]);
    exit;
}

/* email check */
$check = $conn->prepare("SELECT id FROM companies WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "ئیمەیڵ پێشتر تۆمارکراوە"
    ]);
    exit;
}

/* hash password */
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

/* insert */
$stmt = $conn->prepare("
    INSERT INTO companies 
    (karganame, email, password, mawadtype, phone, bio, available_workers, city, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssssssiss",
    $karganame,
    $email,
    $hashedPassword,
    $mawadtype,
    $phone,
    $bio,
    $availableWorkers,
    $city,
    $status
);

/* execute */
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

/* close */
$stmt->close();
$conn->close();

?>
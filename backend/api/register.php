<?php

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
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No JSON data received"
    ]);
    exit();
}

$firstName = trim($data["firstName"] ?? "");
$lastName  = trim($data["lastName"] ?? "");
$email     = trim($data["email"] ?? "");
$password  = $data["password"] ?? ""; // ❌ NO HASH
$jobType   = trim($data["jobType"] ?? "");
$phone     = trim($data["phone"] ?? "");
$bio       = trim($data["bio"] ?? "");

$experienceYears = !empty($data["experienceYears"])
    ? intval($data["experienceYears"])
    : null;

$city   = trim($data["city"] ?? "");
$cvFile = trim($data["cvFile"] ?? "");

$status = "pending";

if (empty($firstName) || empty($lastName) || empty($email) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "فیلدە سەرەکیەکان پێویستن"
    ]);
    exit();
}

/* check email */
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "ئیمەیڵ هەیە پێشتر"
    ]);
    exit();
}

$check->close();

/* ❌ NO HASH PASSWORD */
$sql = "INSERT INTO users 
(first_name, last_name, email, password, job_type, phone, bio, experience_years, city, cv_file, status)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssssssissss",
    $firstName,
    $lastName,
    $email,
    $password, // مستقیم
    $jobType,
    $phone,
    $bio,
    $experienceYears,
    $city,
    $cvFile,
    $status
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "User registered successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Insert failed"
    ]);
}

$stmt->close();
$conn->close();

?>
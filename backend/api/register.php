<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/* DB CONNECTION */
$conn = new mysqli("localhost", "root", "", "workers_db");

if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]));
}

/* GET JSON DATA */
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No JSON data received"
    ]);
    exit();
}

/* GET VALUES */
$firstName = trim($data["firstName"] ?? "");
$lastName  = trim($data["lastName"] ?? "");
$email     = trim($data["email"] ?? "");
$password  = trim($data["password"] ?? "");
$jobType   = trim($data["jobType"] ?? "");
$phone     = trim($data["phone"] ?? "");
$bio       = trim($data["bio"] ?? "");

$experienceYears = !empty($data["experienceYears"])
    ? intval($data["experienceYears"])
    : null;

$city   = trim($data["city"] ?? "");
$cvFile = trim($data["cvFile"] ?? "");

$status = "pending";

/* REQUIRED */
if (
    empty($firstName) ||
    empty($lastName) ||
    empty($email) ||
    empty($password)
) {
    echo json_encode([
        "success" => false,
        "message" => "Please fill all required fields"
    ]);
    exit();
}

/* CHECK EMAIL */
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");

if (!$check) {
    echo json_encode([
        "success" => false,
        "message" => "Prepare failed: " . $conn->error
    ]);
    exit();
}

$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Email already exists"
    ]);
    exit();
}

$check->close();

/* HASH PASSWORD */
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

/* INSERT USER */
$sql = "INSERT INTO users 
(first_name, last_name, email, password, job_type, phone, bio, experience_years, city, cv_file, status)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Insert prepare failed: " . $conn->error
    ]);
    exit();
}

$stmt->bind_param(
    "ssssssissss",
    $firstName,
    $lastName,
    $email,
    $hashedPassword,
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
        "message" => "Insert failed: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();

?>
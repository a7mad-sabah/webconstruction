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
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "No data"]);
    exit();
}

$firstName = $data["firstName"] ?? "";
$lastName  = $data["lastName"] ?? "";
$email     = $data["email"] ?? "";
$password  = $data["password"] ?? "";
$title     = $data["title"] ?? "";
$jobType   = $data["jobType"] ?? "";
$phone     = $data["phone"] ?? "";
$bio       = $data["bio"] ?? "";
$profileImage = $data["profileImage"] ?? "";

// required
if (!$firstName || !$lastName || !$email || !$password) {
    echo json_encode(["success" => false, "message" => "Required fields missing"]);
    exit();
}

// check email
$check = $conn->prepare("SELECT id FROM users WHERE email=?");
$check->bind_param("s", $email);
$check->execute();
$res = $check->get_result();

if ($res->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email exists"]);
    exit();
}

// ✅ image convert
if ($profileImage) {
    $folder = "../uploads/";

    if (!file_exists($folder)) {
        mkdir($folder, 0777, true);
    }

    $image_parts = explode(";base64,", $profileImage);

    if (count($image_parts) == 2) {
        $image_base64 = base64_decode($image_parts[1]);

        $fileName = uniqid() . ".png";
        $filePath = $folder . $fileName;

        file_put_contents($filePath, $image_base64);

        $profileImage = "uploads/" . $fileName;
    }
}

// ❗ (پێشنیار) password hash
$password = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users 
(first_name,last_name,email,password,title,job_type,phone,bio,profile_image)
VALUES (?,?,?,?,?,?,?,?,?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sssssssss",
    $firstName,
    $lastName,
    $email,
    $password,
    $title,
    $jobType,
    $phone,
    $bio,
    $profileImage
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}
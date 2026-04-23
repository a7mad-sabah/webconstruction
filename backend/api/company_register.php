<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// handle preflight request
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

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

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

/* fields */
$karganame = $data["karganame"] ?? "";
$email = $data["email"] ?? "";
$password = $data["password"] ?? ""; // ✅ plain password
$title = $data["title"] ?? "";
$mawadtype = $data["mawadtype"] ?? "";
$phone = $data["phone"] ?? "";
$bio = $data["bio"] ?? "";
$imageBase64 = $data["profileImage"] ?? "";

/* validation */
if (!$karganame || !$email || !$password) {
    echo json_encode([
        "success" => false,
        "message" => "Please fill required fields"
    ]);
    exit;
}

/* check email exists */
$check = $conn->prepare("SELECT id FROM companies WHERE email=?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Email already exists"
    ]);
    exit;
}

/* IMAGE UPLOAD */
$imageName = null;

if (!empty($imageBase64)) {
    $parts = explode(",", $imageBase64);

    if (isset($parts[1])) {
        $decoded = base64_decode($parts[1]);

        $uploadDir = __DIR__ . "/../../uploads/";

        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $imageName = time() . "_" . rand(1000,9999) . ".png";
        file_put_contents($uploadDir . $imageName, $decoded);
    }
}

/* ❌ NO HASH - plain password saved */
$stmt = $conn->prepare("
    INSERT INTO companies 
    (karganame, email, password, title, mawadtype, phone, bio, profile_image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssssssss",
    $karganame,
    $email,
    $password, // ❌ مستقیم هەڵگیراوە
    $title,
    $mawadtype,
    $phone,
    $bio,
    $imageName
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Company registered successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Insert failed"
    ]);
}

$conn->close();
?>
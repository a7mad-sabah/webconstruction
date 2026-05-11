<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

/* Handle preflight */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/* DB */
$conn = mysqli_connect("localhost", "root", "", "workers_db");

if (!$conn) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit();
}

/* READ INPUT */
$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? null;
$type = $data["type"] ?? null;
$status = $data["status"] ?? null;

/* VALIDATION */
if (!$id || !$type || !$status) {
    echo json_encode([
        "success" => false,
        "message" => "Missing data"
    ]);
    exit();
}

/* INIT */
$stmt = null;

/* USER */
if ($type === "user") {

    $stmt = $conn->prepare("UPDATE users SET status=? WHERE id=?");
    $stmt->bind_param("si", $status, $id);
}

/* COMPANY */
else if ($type === "company") {

    $stmt = $conn->prepare("UPDATE companies SET status=? WHERE id=?");
    $stmt->bind_param("si", $status, $id);
}

/* FEEDBACK ⭐ NEW */
else if ($type === "feedback") {

    $stmt = $conn->prepare("UPDATE feedback SET status=? WHERE id=?");
    $stmt->bind_param("si", $status, $id);
}

/* INVALID TYPE */
else {
    echo json_encode([
        "success" => false,
        "message" => "Invalid type"
    ]);
    exit();
}

/* EXECUTE SAFELY */
if ($stmt && $stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Status updated successfully"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Update failed"
    ]);
}

/* CLOSE */
if ($stmt) $stmt->close();
$conn->close();

?>
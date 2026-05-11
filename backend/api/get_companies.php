<?php
header("Content-Type: application/json; charset=UTF-8");

/* ✅ CORS FIX (important) */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

/* ✅ handle preflight */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

/* DB CONNECTION */
$conn = new mysqli("localhost", "root", "", "workers_db");
$conn->set_charset("utf8");

/* CHECK DB */
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}

/* QUERY */
$sql = "SELECT * FROM companies ORDER BY id DESC";
$result = $conn->query($sql);

/* SAFETY CHECK */
if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => "Query failed"
    ]);
    exit;
}

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = [
        "id" => $row["id"] ?? 0,
        "name" => $row["karganame"] ?? "",
        "type" => $row["mawadtype"] ?? "",
        "description" => $row["bio"] ?? "",
        "city" => $row["city"],  
        "phone" => $row["phone"] ?? "",
        "rating" => 4.5,
    ];
}

/* RESPONSE */
echo json_encode([
    "success" => true,
    "data" => $data
], JSON_UNESCAPED_UNICODE);

$conn->close();
?>
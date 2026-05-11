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

$data = json_decode(file_get_contents("php://input"), true);

if(!$data || !isset($data["id"])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request"
    ]);
    exit;
}

$id = (int)$data["id"];
$type = $data["type"] ?? "user";

$table = ($type === "company") ? "companies" : "users";

$stmt = $conn->prepare("DELETE FROM $table WHERE id=?");

if(!$stmt){
    echo json_encode([
        "success"=>false,
        "message"=>$conn->error
    ]);
    exit;
}

$stmt->bind_param("i", $id);

if($stmt->execute()){
    echo json_encode(["success"=>true]);
}else{
    echo json_encode([
        "success"=>false,
        "message"=>$stmt->error
    ]);
}

$conn->close();
?>
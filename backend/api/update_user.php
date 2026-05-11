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

if(!$data){
    echo json_encode(["success"=>false]);
    exit;
}

$stmt = $conn->prepare("UPDATE users SET 
first_name=?, last_name=?, email=?, phone=?, job_type=?, bio=?, role=? 
WHERE id=?");

$stmt->bind_param(
    "sssssssi",
    $data["first_name"],
    $data["last_name"],
    $data["email"],
    $data["phone"],
    $data["job_type"],
    $data["bio"],
    $data["role"],
    $data["id"]
);

if($stmt->execute()){
    echo json_encode(["success"=>true]);
}else{
    echo json_encode(["success"=>false]);
}

$conn->close();
?>
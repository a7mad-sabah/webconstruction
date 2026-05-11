<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "workers_db");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB error"]);
    exit;
}

$result = $conn->query("SELECT * FROM users WHERE role != 'admin'");

$workers = [];

while ($row = $result->fetch_assoc()) {

    $workers[] = [
        "id" => $row["id"],
        "name" => $row["first_name"] . " " . $row["last_name"],
        "job" => $row["job_type"],
        "city" => $row["city"],  
        "rating" => 0,
        "description" => $row["bio"],
        "phone" => $row["phone"]
    ];
}

echo json_encode([
    "success" => true,
    "workers" => $workers
]);
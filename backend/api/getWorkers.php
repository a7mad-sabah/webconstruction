<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "workers_db");

if ($conn->connect_error) {
    echo json_encode(["success" => false]);
    exit;
}

$baseUrl = "http://localhost/goldenhand/my-project/backend/";

// 👇 لابردنی ئەدمین
$result = $conn->query("SELECT * FROM users WHERE role != 'admin'");

$workers = [];

while ($row = $result->fetch_assoc()) {

    $image = $row["profile_image"];

    if ($image) {
        $image = $baseUrl . $image;
    }

    $workers[] = [
        "id" => $row["id"],
        "name" => $row["first_name"] . " " . $row["last_name"],
        "job" => $row["job_type"],
        "rating" => 0,
        "description" => $row["bio"],
        "phone" => $row["phone"],
        "title" => $row["title"],
        "profile_image" => $image
    ];
}

echo json_encode([
    "success" => true,
    "workers" => $workers
]);
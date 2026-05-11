<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$conn = mysqli_connect("localhost", "root", "", "workers_db");

if (!$conn) {
    die(json_encode(["success" => false]));
}

/* USERS */
$users = [];
$userQuery = mysqli_query($conn, "SELECT id, first_name, last_name, email, phone, status FROM users WHERE status='pending'");

while ($row = mysqli_fetch_assoc($userQuery)) {
    $users[] = [
        "id" => $row["id"],
        "firstName" => $row["first_name"],
        "lastName" => $row["last_name"],
        "email" => $row["email"],
        "phone" => $row["phone"],
        "type" => "user"
    ];
}

/* COMPANIES */
$companies = [];
$companyQuery = mysqli_query($conn, "SELECT id, karganame, email, phone, status FROM companies WHERE status='pending'");

while ($row = mysqli_fetch_assoc($companyQuery)) {
    $companies[] = [
        "id" => $row["id"],
        "karganame" => $row["karganame"],
        "email" => $row["email"],
        "phone" => $row["phone"],
        "type" => "company"
    ];
}

/* FEEDBACK */
$feedbacks = [];
$feedbackQuery = mysqli_query($conn, "SELECT id, name, email, feedback, rating, worker_id FROM feedback WHERE status='pending'");

while ($row = mysqli_fetch_assoc($feedbackQuery)) {
    $feedbacks[] = [
        "id" => $row["id"],
        "name" => $row["name"],
        "email" => $row["email"],
        "feedback" => $row["feedback"],
        "rating" => $row["rating"],
        "type" => "feedback"
    ];
}

echo json_encode([
    "success" => true,
    "users" => $users,
    "companies" => $companies,
    "feedbacks" => $feedbacks
]);

$conn->close();
?>
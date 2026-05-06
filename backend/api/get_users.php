<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$conn = new mysqli("localhost", "root", "", "workers_db");

if ($conn->connect_error) {
    echo json_encode(["error" => $conn->connect_error]);
    exit;
}

/* 👤 USERS */
$usersResult = $conn->query("SELECT 
    id,
    first_name,
    last_name,
    email,
    phone,
    job_type,
    bio,
    profile_image,
    role
FROM users");

if (!$usersResult) {
    echo json_encode(["error" => $conn->error]);
    exit;
}

$users = $usersResult->fetch_all(MYSQLI_ASSOC);

/* 🏢 COMPANIES */
$companiesResult = $conn->query("SELECT 
    id,
    karganame,
    email,
    phone,
    title,
    mawadtype,
    bio,
    profile_image
FROM companies");

if (!$companiesResult) {
    echo json_encode(["error" => $conn->error]);
    exit;
}

$companies = $companiesResult->fetch_all(MYSQLI_ASSOC);

/* 📦 FINAL OUTPUT */
echo json_encode([
    "users" => $users,
    "companies" => $companies
]);




$conn->close();
?>
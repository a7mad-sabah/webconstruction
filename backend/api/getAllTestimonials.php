<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$conn = new mysqli("localhost", "root", "", "workers_db");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB error"]);
    exit;
}

/* =========================
   WORKERS FEEDBACK
========================= */
$workersQuery = "
SELECT 
  name,
  feedback AS text,
  rating,
  created_at AS date,
  'worker' AS source
FROM feedback
ORDER BY created_at DESC
";

$workersResult = $conn->query($workersQuery);
$workers = [];

while ($row = $workersResult->fetch_assoc()) {
    $row["img"] = "https://i.pravatar.cc/150?u=" . $row["name"];
    $workers[] = $row;
}

/* =========================
   FACTORY FEEDBACK
========================= */
$factoryQuery = "
SELECT 
  name,
  feedback AS text,
  rating,
  created_at AS date,
  'factory' AS source
FROM factory_feedback
ORDER BY created_at DESC
";

$factoryResult = $conn->query($factoryQuery);
$factories = [];

while ($row = $factoryResult->fetch_assoc()) {
    $row["img"] = "https://i.pravatar.cc/150?u=" . $row["name"];
    $factories[] = $row;
}

/* =========================
   MERGE BOTH
========================= */
$all = array_merge($workers, $factories);

echo json_encode([
    "success" => true,
    "data" => $all
]);
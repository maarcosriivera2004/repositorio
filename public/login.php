<?php
$servername = "bgnwbezv162rppz88e7e-mysql.services.clever-cloud.com";
$username = "usjzyvhsmzwuhjfa";
$password = "zVJqTkPlVTGLfwARYGfX";
$dbname = "bgnwbezv162rppz88e7e";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST["email"];
  $password = $_POST["password"];

  $sql = "SELECT * FROM Usuario WHERE email='$email'";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user["password"])) {
      // Login successful
      session_start();
      $_SESSION["user_id"] = $user["id"];
      header("Location: index.html"); // Redirige a la página del dashboard
      exit();
    } else {
      // Invalid password
      echo "Invalid password";
    }
  } else {
    // No user found with that email
    echo "No user found with that email";
  }
}

$conn->close();
?>

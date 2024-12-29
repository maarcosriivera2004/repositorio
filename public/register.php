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
  $name = $_POST["name"];
  $email = $_POST["email"];
  $password = password_hash($_POST["password"], PASSWORD_DEFAULT); // Hash the password

  $sql = "INSERT INTO Usuario (nombre, email, password) VALUES ('$name', '$email', '$password')";

  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
    header("Location: index.html"); // Redirige a la página de login
    exit();
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

$conn->close();
?>

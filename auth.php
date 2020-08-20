<?php

$pass = $_GET["pass"];
$user = $_GET["user"];
$filename = "auth.json";
$file = fopen($filename, "a") or die("unable to open file");
fwrite($file, $json."\n");
fclose($file);

echo "Sucessfully wrote to file :)";

?>
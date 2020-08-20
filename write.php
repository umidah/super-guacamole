<?php

$json = $_GET["json"];
$user = $_GET["user"];
$filename = "./userData/".$user."/".$user.".json";
$file = fopen($filename, "w") or die("unable to open file");
fwrite($file, $json."\n");
fclose($file);

echo "Sucessfully wrote to file :)";

?>
<?php

$json = $_GET["json"];
$filename = "./data.json";
$file = fopen($filename, "w") or die("unable to open file");
fwrite($file, $json."\n");
fclose($file);

echo "Sucessfully wrote to file :)";

?>
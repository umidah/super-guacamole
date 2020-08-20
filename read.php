<?php

$filename = "./data.json";
$file = fopen($filename, "r") or die("unable to open file");
echo fread($file, filesize($filename));
fclose($file);

?>
<?php

$user = $_GET["user"];
$filename = "./userData/".$user."/".$user.".json";
$file = fopen($filename, "r") or die("unable to open file");
echo fread($file, filesize($filename));
fclose($file);

?>
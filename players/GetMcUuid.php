<?php 
header('Access-Control-Allow-Origin:*');
$url='https://api.mojang.com/users/profiles/minecraft/' . $_GET["name"];
$html = file_get_contents($url);
echo $html;
?>
<?php
$ip = $_SERVER['REMOTE_ADDR'] . "\n";
file_put_contents('ip.log', $ip, FILE_APPEND);

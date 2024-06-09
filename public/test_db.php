<?php

// Define as variáveis de conexão à base de dados
$db_host = 'deca-sara.ua.pt';
$db_port = '3306';
$db_database = 'sara';
$db_username = 'administrator';
$db_password = 'z.H5sCcO*.%*7_6vk4dg4o';

// Tenta estabelecer uma conexão à base de dados
try {
    $pdo = new PDO("mysql:host=$db_host;port=$db_port;dbname=$db_database", $db_username, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexão à base de dados bem-sucedida!";
} catch(PDOException $e) {
    echo "Erro na conexão à base de dados: " . $e->getMessage();
}

<?php
$servername="localhost";
$username="root";
$password="";
$dbname="eventearla";

try
{
    $conn=new PDO("mysql:host=$servername;dbname=$dbname",$username,$password);
    $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    echo "Conexion Exitosa";
}
catch(PDOException $e)
{
    echo "Conexion fallida: ".$e->getMessage();
}

?>
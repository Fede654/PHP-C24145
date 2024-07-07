<?php
$servername="localhost";
$username="root";
$password="root";
$dbname="eventearla";

// Settings para 000webhost
// $servername="localhost";
// $username="id22402964_service";
// $password="fsDf-23ff3";
// $dbname="id22402964_eventearla";

try
{
    $conn=new PDO("mysql:host=$servername;dbname=$dbname",$username,$password);
    $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    // echo "Conexion Exitosa";
}
catch(PDOException $e)
{
    echo "Conexion fallida: ".$e->getMessage();
    echo "--End of Error--";
}

?>
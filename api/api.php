<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';
include 'Conferencia.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGet($conn);
        break;
    case 'POST':
        handlePost($conn);
        break;
    case 'PUT':
        handlePut($conn);
        break;
    case 'DELETE':        
        handleDelete($conn);
        break;
    default:
        echo json_encode(['message' => 'Método no permitido']);
        break;
}

//
// Metodo que devuelve una conferencia o todas las conferencias
//
function handleGet($conn) 
{
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($id > 0) 
    {
        $stmt = $conn->prepare("SELECT * FROM conferencias WHERE id = ?");
        $stmt->execute([$id]);
        $conferencia = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($conferencia) 
        {
            $conferenciaObj = Conferencia::fromArray($conferencia);
            echo json_encode($conferenciaObj->toArray());
        } 
        else 
        {
            http_response_code(404);
            echo json_encode(['message' => 'No se encontraron datos']);
        }
    } 
    else 
    {
        $stmt = $conn->query("SELECT * FROM conferencias");
        $conferencias = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conferenciaObjs = array_map(fn($conferencia) => Conferencia::fromArray($conferencia)->toArray(), $conferencias);
        echo json_encode(['conferencias' => $conferenciaObjs]);
    }
    // throw new Exception(json_encode($conferencias));
}

//
// Metodo para ingresar conferencias
//
function handlePost($conn) 
{
    if ($conn === null) 
    {
        echo json_encode(['message' => 'Error en la conexión a la base de datos']);
        return;
    }

    $data = json_decode(file_get_contents('php://input'), true);

    $requiredFields = ['id', 'titulo','orador', 'fecha'];
    foreach ($requiredFields as $field) 
    {
        if (!isset($data[$field])) 
        {
            echo json_encode(['message' => 'Datos de la Conferencia incompletos']);
            return;
        }
    }

    $conferencia = Conferencia::fromArray($data);

    try 
    {
        $stmt = $conn->prepare("INSERT INTO conferencias (id, titulo, orador, fecha, horario, ubicacion, categoria, sinopsis) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $conferencia->id,
            $conferencia->titulo,
            $conferencia->orador,
            $conferencia->fecha,
            $conferencia->horario,
            $conferencia->ubicacion,
            $conferencia->categoria,
            $conferencia->sinopsis
        ]);

        echo json_encode(['message' => 'Conferencia ingresada correctamente']);
    } 
    catch (PDOException $e) 
    {
        echo json_encode(['message' => 'Error al ingresar la conferencia', 'error' => $e->getMessage()]);
    }
}

//
// Metodo para modificar conferencias
//
function handlePut($conn) 
{
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    
    
    if ($id > 0) 
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $conferencia = Conferencia::fromArray($data);
        $conferencia->id = $id;

        $fields = [];
        $params = [];

        if ($conferencia->id !== null) {
            $fields[] = 'id = ?';
            $params[] = $conferencia->id;
        }
        if ($conferencia->titulo !== null) {
            $fields[] = 'titulo = ?';
            $params[] = $conferencia->titulo;
        }
        if ($conferencia->orador !== null) {
            $fields[] = 'orador = ?';
            $params[] = $conferencia->orador;
        }
        if ($conferencia->fecha !== null) {
            $fields[] = 'fecha = ?';
            $params[] = $conferencia->fecha;
        }
        if ($conferencia->horario !== null) {
            $fields[] = 'horario = ?';
            $params[] = $conferencia->horario;
        }
        if ($conferencia->ubicacion !== null) {
            $fields[] = 'ubicacion = ?';
            $params[] = $conferencia->ubicacion;
        }
        if ($conferencia->categoria !== null) {
            $fields[] = 'categoria = ?';
            $params[] = $conferencia->categoria;
        }                 
        if ($conferencia->sinopsis !== null) {
            $fields[] = 'sinopsis = ?';
            $params[] = $conferencia->sinopsis;
        }

        if (!empty($fields)) 
        {
            $params[] = $id;
            $stmt = $conn->prepare("UPDATE conferencias SET " . implode(', ', $fields) . " WHERE id = ?");
            $stmt->execute($params);
            echo json_encode(['message' => 'Conferencia actualizada con éxito']);
        } 
        else 
        {
            echo json_encode(['message' => 'No hay campos para actualizar']);
        }
    } 
    else 
    {
        echo json_encode(['message' => 'ID no proporcionado']);
    }
}

//
// Metodo para borrar registros
//
function handleDelete($conn) 
{
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($id > 0) 
    {
        $stmt = $conn->prepare("DELETE FROM conferencias WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['message' => 'Conferencia eliminada con éxito']);
    } 
    else 
    {
        echo json_encode(['message' => 'ID no proporcionado']);
    }
}
?>
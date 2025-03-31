<?php 
include('config.php');

header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Credentials:true');
header ('Access-Control-Allow-Methods: PUT,GET,POST,DELETE,OPTIONS');
header ('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token');
header ('ContentType:application/json; charset=utf-8');

$post = json_decode(file_get_contents("php://input"), true);



$respuesta = "";
if (isset($_GET['accion']) && $_GET['accion'] == "subirImagen") {
    require_once './imagenes.php';
} else {
    // Aquí solo puedes incluir los otros archivos cuando no se trata de la acción de subir imagen
    require_once './inventory.php';
    require_once './floors.php';
    require_once './login.php';
    require_once './branch.php';
}



<?php
if (isset($_GET['accion']) && $_GET['accion'] == "subirImagen") {
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
        $targetDir = "./uploads/inventario/";
        $fileName = basename($_FILES['imagen']['name']);
        $targetFilePath = $targetDir . $fileName;

        // Mover el archivo a la carpeta de destino
        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetFilePath)) {
            $respuesta = json_encode(array('estado' => true, 'rutaImagen' => 'uploads/inventario/' . $fileName));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al mover el archivo.'));
        }
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No se subió ninguna imagen.'));
    }
} else {
    $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Acción no válida.'));
}
echo $respuesta;


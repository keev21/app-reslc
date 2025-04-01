<?php
// Cargar categorías por sucursal
// Cargar categorías por sucursal
if ($post['accion'] == "cargarCategorias") {
    $sucursal = $post['sucursal'];

    $sentencia = sprintf(
        "SELECT CAT_CODE as id, CAT_NAME as nombre, CAT_TYPE as tipo, CAT_STATUS as estado 
        FROM res_category 
        WHERE BRAN_CODE = '%s'",
        mysqli_real_escape_string($mysqli, $sucursal)
    );
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $categorias = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $categorias[] = $row;
        }
        $respuesta = json_encode(array('estado' => true, "categorias" => $categorias));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron categorías para esta sucursal."));
    }

    echo $respuesta;
}

// Cargar datos de una categoría
if ($post['accion'] == "cargarCategoria") {
    $id = $post['id'];

    $sentencia = sprintf(
        "SELECT CAT_CODE as id, CAT_NAME as nombre, CAT_TYPE as tipo, CAT_STATUS as estado 
        FROM res_category 
        WHERE CAT_CODE = '%s'",
        mysqli_real_escape_string($mysqli, $id)
    );
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $categoria = mysqli_fetch_assoc($result);
        $respuesta = json_encode(array('estado' => true, "categoria" => $categoria));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontró la categoría."));
    }

    echo $respuesta;
}


// Guardar nueva categoría
if ($post['accion'] == "guardarCategoria") {
    $nombre = $post['nombre'];
    $tipo = $post['tipo'];
    $estado = $post['estado'];
    $sucursal = $post['sucursal'];

    $sentencia = sprintf(
        "INSERT INTO res_category (CAT_NAME, CAT_TYPE, CAT_STATUS, BRAN_CODE) 
        VALUES ('%s', '%s', '%s', '%s')",
        mysqli_real_escape_string($mysqli, $nombre),
        mysqli_real_escape_string($mysqli, $tipo),
        mysqli_real_escape_string($mysqli, $estado),
        mysqli_real_escape_string($mysqli, $sucursal)
    );

    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Categoría guardada correctamente."));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al guardar la categoría."));
    }

    echo $respuesta;
}

// Editar categoría
if ($post['accion'] == "editarCategoria") {
    $id = $post['id'];
    $nombre = $post['nombre'];
    $tipo = $post['tipo'];
    $estado = $post['estado'];
    $sucursal = $post['sucursal']; // Nueva sucursal seleccionada

    $sentencia = sprintf(
        "UPDATE res_category 
        SET CAT_NAME = '%s', CAT_TYPE = '%s', CAT_STATUS = '%s', BRAN_CODE = '%s' 
        WHERE CAT_CODE = '%s'",
        mysqli_real_escape_string($mysqli, $nombre),
        mysqli_real_escape_string($mysqli, $tipo),
        mysqli_real_escape_string($mysqli, $estado),
        mysqli_real_escape_string($mysqli, $sucursal),
        mysqli_real_escape_string($mysqli, $id)
    );

    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Categoría actualizada correctamente."));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al actualizar la categoría."));
    }

    echo $respuesta;
}

// Eliminar categoría
if ($post['accion'] == "eliminarCategoria") {
    $id = $post['id'];

    $sentencia = sprintf(
        "DELETE FROM res_category WHERE CAT_CODE = '%s'",
        mysqli_real_escape_string($mysqli, $id)
    );

    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Categoría eliminada correctamente."));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al eliminar la categoría."));
    }

    echo $respuesta;
}

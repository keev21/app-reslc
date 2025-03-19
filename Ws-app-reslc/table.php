<?php

// Cargar mesas por piso
if ($post['accion'] == "cargarMesas") {
    $piso = $post['piso'];

    $sentencia = sprintf(
        "SELECT TAB_CODE as id, TAB_NAME as nombre, TAB_TYPE as tipo, FLOO_CODE as piso, TAB_STATUS as estado 
        FROM res_table 
        WHERE FLOO_CODE = '%s'",
        mysqli_real_escape_string($mysqli, $piso))
    ;
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $mesas = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $mesas[] = $row;
        }
        $respuesta = json_encode(array('estado' => true, "mesas" => $mesas));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron mesas para este piso."));
    }

    echo $respuesta;
}

// Cargar datos de una mesa
if ($post['accion'] == "cargarMesa") {
    $id = $post['id'];

    $sentencia = sprintf(
        "SELECT TAB_CODE as id, TAB_NAME as nombre, TAB_TYPE as tipo, FLOO_CODE as piso, TAB_STATUS as estado 
        FROM res_table 
        WHERE TAB_CODE = '%s'",
        mysqli_real_escape_string($mysqli, $id))
    ;
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $mesa = mysqli_fetch_assoc($result);
        $respuesta = json_encode(array('estado' => true, "mesa" => $mesa));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontró la mesa."));
    }

    echo $respuesta;
}

// Guardar nueva mesa
if ($post['accion'] == "guardarMesa") {
    $nombre = $post['nombre'];
    $tipo = $post['tipo'];
    $piso = $post['piso'];
    $estado = $post['estado'];

    $sentencia = sprintf(
        "INSERT INTO res_table (TAB_NAME, TAB_TYPE, FLOO_CODE, TAB_STATUS) 
        VALUES ('%s', '%s', '%s', '%s')",
        mysqli_real_escape_string($mysqli, $nombre),
        mysqli_real_escape_string($mysqli, $tipo),
        mysqli_real_escape_string($mysqli, $piso),
        mysqli_real_escape_string($mysqli, $estado))
    ;

    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Mesa guardada correctamente."));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al guardar la mesa."));
    }

    echo $respuesta;
}

// Editar mesa
if ($post['accion'] == "editarMesa") {
    $id = $post['id'];
    $nombre = $post['nombre'];
    $tipo = $post['tipo'];
    $piso = $post['piso'];
    $estado = $post['estado'];

    $sentencia = sprintf(
        "UPDATE res_table 
        SET TAB_NAME = '%s', TAB_TYPE = '%s', FLOO_CODE = '%s', TAB_STATUS = '%s' 
        WHERE TAB_CODE = '%s'",
        mysqli_real_escape_string($mysqli, $nombre),
        mysqli_real_escape_string($mysqli, $tipo),
        mysqli_real_escape_string($mysqli, $piso),
        mysqli_real_escape_string($mysqli, $estado),
        mysqli_real_escape_string($mysqli, $id))
    ;

    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Mesa actualizada correctamente."));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al actualizar la mesa."));
    }

    echo $respuesta;
}

// Eliminar mesa
if ($post['accion'] == "eliminarMesa") {
    $id = $post['id'];

    $sentencia = sprintf(
        "DELETE FROM res_table WHERE TAB_CODE = '%s'",
        mysqli_real_escape_string($mysqli, $id))
    ;

    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Mesa eliminada correctamente."));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al eliminar la mesa."));
    }

    echo $respuesta;
}
// Cargar pisos
if ($post['accion'] == "cargarPisos") {
    $sentencia = "SELECT FLOO_CODE as id, FLOO_NAME as nombre, FLOO_TYPE as tipo, BRAN_CODE as sucursal, FLOO_STATUS as estado FROM res_floor";
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $pisos = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $pisos[] = $row;
        }
        $respuesta = json_encode(array('estado' => true, "pisos" => $pisos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron pisos."));
    }

    echo $respuesta;
}
if ($post['accion'] == "cargarPisosPorSucursal") {
    $sucursal = $post['sucursal'];

    $sentencia = sprintf(
        "SELECT FLOO_CODE as id, FLOO_NAME as nombre, FLOO_TYPE as tipo, FLOO_STATUS as estado 
        FROM res_floor 
        WHERE BRAN_CODE = '%s'",
        mysqli_real_escape_string($mysqli, $sucursal))
    ;
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $pisos = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $pisos[] = $row;
        }
        $respuesta = json_encode(array('estado' => true, "pisos" => $pisos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron pisos para esta sucursal."));
    }

    echo $respuesta;
}
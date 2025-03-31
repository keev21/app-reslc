<?php
if ($post['accion'] == "consultarSucursales") {
    $nombreSucursal = isset($post['nombreSucursal']) ? $post['nombreSucursal'] : '';
    if ($nombreSucursal != '') {
        $sentencia = sprintf(
            "SELECT * FROM res_branch_office WHERE BRAN_NAME = '%s'",
            mysqli_real_escape_string($mysqli, $nombreSucursal)
        );
    } else {
        $sentencia = "SELECT * FROM res_branch_office";
    }
    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'codigo' => $row['BRAN_CODE'],
                'nombre' => $row['BRAN_NAME'],
                'direccion' => $row['BRAN_ADDRES'],
                'estatus' => $row['BRAN_STATUS'],
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }
    echo $respuesta;
}

if ($post['accion'] == "loadSucursal") {
    $codigo = $post['codigo'];
    $sentencia = sprintf("SELECT * FROM res_branch_office WHERE BRAN_CODE = '%s'", mysqli_real_escape_string($mysqli, $codigo));
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = mysqli_fetch_array($result);
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }
    echo $respuesta;
}

if ($post['accion'] == "AgregarSucursal" || $post['accion'] == "ActualizarSucursal") {
    $nombre = $post['nombre'];
    $ubicacion = $post['ubicacion'];
    $estado = $post['estado'];

    if ($post['accion'] == "AgregarSucursal") {
        $sentencia = sprintf(
            "INSERT INTO res_branch_office (BRAN_NAME, BRAN_ADDRES, BRAN_STATUS) VALUES ('%s', '%s', '%s')",
            mysqli_real_escape_string($mysqli, $nombre),
            mysqli_real_escape_string($mysqli, $ubicacion),
            mysqli_real_escape_string($mysqli, $estado)
        );
    } else {
        $codigo = $post['codigo'];
        $sentencia = sprintf(
            "UPDATE res_branch_office SET BRAN_NAME='%s', BRAN_ADDRES='%s', BRAN_STATUS='%s' WHERE BRAN_CODE='%s'",
            mysqli_real_escape_string($mysqli, $nombre),
            mysqli_real_escape_string($mysqli, $ubicacion),
            mysqli_real_escape_string($mysqli, $estado),
            mysqli_real_escape_string($mysqli, $codigo)
        );
    }
    
    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Sucursal guardada correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al guardar la sucursal"));
    }
    echo $respuesta;
}

if ($post['accion'] == "eliminarSucursal") {
    $codigo = $post['codigo'];
    $sentencia = sprintf("DELETE FROM res_branch_office WHERE BRAN_CODE = '%s'", mysqli_real_escape_string($mysqli, $codigo));

    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Sucursal eliminada correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al eliminar la sucursal"));
    }
    echo $respuesta;
}


if ($post['accion'] == "loadbranch") {
    $codigo = $post['codigo']; // Asegúrate de que el parámetro se llama `codigousu`
    $sentencia = sprintf("SELECT * FROM res_branch_office WHERE BRAN_CODE = $codigo ", ); // Usa sprintf para formatear la consulta
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = [];
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'nombre' => $row['BRAN_NAME'],
                'ubicacion' => $row['BRAN_ADDRES'],
                'estado' => $row['BRAN_STATUS'],
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }
    echo $respuesta;
}
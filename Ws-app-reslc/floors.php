<?php
if ($post['accion'] == "consultarPisos") {
    $nombrePisos = isset($post['nombrePiso']) ? $post['nombrePiso'] : '';
    if ($nombrePisos != '') {
        $sentencia = sprintf(
            "SELECT * FROM res_floor WHERE FLOO_NAME = '%s'",
            mysqli_real_escape_string($mysqli, $nombrePisos)
        );
    } else {
        $sentencia = "SELECT * FROM res_floor rf INNER JOIN res_branch_office rbo ON rf.BRAN_CODE = rbo.BRAN_CODE";
    }
    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'codigo' => $row['FLOO_CODE'],
                'nombre' => $row['FLOO_NAME'],
                'tipo' => $row['FLOO_TYPE'],
                'codigobranch' => $row['BRAN_NAME'],
                'estatus' => $row['FLOO_STATUS'],
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }
    echo $respuesta;
}

if ($post['accion'] == "loadpiso") {
    $codigo = $post['codigo']; // Asegúrate de que el parámetro se llama `codigousu`
    $sentencia = sprintf("SELECT * FROM res_floor WHERE FLOO_CODE = $codigo ", ); // Usa sprintf para formatear la consulta
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = [];
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'nombre' => $row['FLOO_NAME'],
                'tipo' => $row['FLOO_TYPE'],
                'rama' => $row['BRAN_CODE'],
                'estado' => $row['FLOO_STATUS'],
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }
    echo $respuesta;
}

if ($post['accion'] == "loadbranchinfs") {
    // Realizamos el INNER JOIN para obtener BUSH_CODE y BUIF_NAME
    $sentencia = sprintf("SELECT rbo.BRAN_CODE, rbo.BRAN_NAME FROM res_branch_office rbo INNER JOIN res_floor rf ON rbo.BRAN_CODE = rf.BRAN_CODE");

    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'BRAN_CODE' => $row['BRAN_CODE'],
                'BRAN_NAME' => $row['BRAN_NAME']
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "ERROR"));
    }

    echo $respuesta;
}

if ($post['accion'] == "loadbranchinfo") {
    // Realizamos el INNER JOIN para obtener BUSH_CODE y BUIF_NAME
    $sentencia = sprintf("SELECT * FROM res_branch_office");

    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'BRAN_CODE' => $row['BRAN_CODE'],
                'BRAN_NAME' => $row['BRAN_NAME']
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "ERROR"));
    }

    echo $respuesta;
}







if ($post['accion'] == "Agregarpiso" || $post['accion'] == "Actualizarpiso") {
    $nombre = $post['nombre'];
    $tipo = $post['tipo'];
    $rama = $post['rama'];
    $estado = $post['estado'];
    // Preparar la consulta SQL
    if ($post['accion'] == "Agregarpiso") {
        $insertarRegla = sprintf(
            "INSERT INTO res_floor (FLOO_NAME, FLOO_TYPE, BRAN_CODE, FLOO_STATUS) 
            VALUES ('%s', '%s', '%s', '%s')",
            mysqli_real_escape_string($mysqli, $nombre),
            mysqli_real_escape_string($mysqli, $tipo),
            mysqli_real_escape_string($mysqli, $rama),
            mysqli_real_escape_string($mysqli, $estado)
        );

        if (mysqli_query($mysqli, $insertarRegla)) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Piso agregada correctamente.'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al agregar regla: ' . mysqli_error($mysqli)));
        }
    } elseif ($post['accion'] == "Actualizarpiso") {
        $codigo = $post['codigo'];
        $Actualizarpiso = sprintf(
            "UPDATE res_floor SET FLOO_NAME = '%s', FLOO_TYPE = '%s', BRAN_CODE = '%s', FLOO_STATUS = '%s' 
            WHERE FLOO_CODE = '%s'",
            mysqli_real_escape_string($mysqli, $nombre),
            mysqli_real_escape_string($mysqli, $tipo),
            mysqli_real_escape_string($mysqli, $rama),
            mysqli_real_escape_string($mysqli, $estado),
            mysqli_real_escape_string($mysqli, $codigo)
        );

        if (mysqli_query($mysqli, $Actualizarpiso)) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Piso actualizada correctamente.'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar regla: ' . mysqli_error($mysqli)));
        }
    }
    echo $respuesta;
}

//FUNCION PARA ELIMINAR EMPRESA 
if ($post['accion'] == "eliminarPiso") {
    $codigo = $post['codigo'];
    $sentencia = sprintf(
        "DELETE FROM res_floor WHERE FLOO_CODE = '%s'",
        $codigo
    );
    $result = mysqli_query($mysqli, $sentencia);
    if ($result) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Datos eliminados correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al eliminar datos"));
    }
    echo $respuesta;
}
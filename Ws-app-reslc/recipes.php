<?php
if ($post['accion'] == "consultarRecetas") {
    $codigoProducto = isset($post['codigoProducto']) ? $post['codigoProducto'] : '';
    if ($codigoProducto != '') {
        $sentencia = sprintf("SELECT * FROM res_recipe rsr Inner join res_product rsp on rsr.PRO_CODE= rsp.PRO_CODE WHERE PRO_NAME = '%s'", mysqli_real_escape_string($mysqli, $codigoProducto));
    } else {
        $sentencia = "SELECT * FROM res_recipe rsr Inner join res_product rsp on rsr.PRO_CODE= rsp.PRO_CODE";
    }
    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $datos[] = array(
                'REC_CODE' => $row['REC_CODE'],
                'PRO_NAME' => $row['PRO_NAME'],
                'PRO_CODE' => $row['PRO_CODE'],
                'REC_STATUS' => $row['REC_STATUS']
            );
        }
        echo json_encode(array('estado' => true, 'datos' => $datos));
    } else {
        echo json_encode(array('estado' => false, 'mensaje' => 'No se encontraron recetas'));
    }
}

if ($post['accion'] == "eliminarReceta") {
    $codigo = $post['codigo'];
    $query = "DELETE FROM res_recipe WHERE REC_CODE = '$codigo'";
    if (mysqli_query($mysqli, $query)) {
        echo json_encode(array('estado' => true));
    } else {
        echo json_encode(array('estado' => false, 'mensaje' => 'Error al eliminar receta'));
    }
}


if ($post['accion'] == "agregarreceta" || $post['accion'] == "actualizarreceta") {
    $producto = $post['producto'];
    $estado = $post['estado'];

    if ($post['accion'] == "agregarreceta") {
        $sentencia = sprintf(
            "INSERT INTO res_recipe (PRO_CODE, REC_STATUS) 
            VALUES ('%s', '%s')",
            mysqli_real_escape_string($mysqli, $producto),
            mysqli_real_escape_string($mysqli, $estado),
     
        );
    } else {
        $codigo = $post['codigo'];
        $sentencia = sprintf(
            "UPDATE res_recipe SET PRO_CODE='%s',REC_STATUS='%s'WHERE REC_CODE ='%s'",
            mysqli_real_escape_string($mysqli, $producto),
            mysqli_real_escape_string($mysqli, $estado),
            mysqli_real_escape_string($mysqli, $codigo)
        );
    }
    
    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Receta guardada correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al guardar la Receta: " . mysqli_error($mysqli)));
    }
    echo $respuesta;
}


if ($post['accion'] == "loadproductoss") {
    // Realizamos el INNER JOIN para obtener BUSH_CODE y BUIF_NAME
    $sentencia = sprintf("SELECT * FROM res_product");

    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'PRO_CODE' => $row['PRO_CODE'],
                'PRO_NAME' => $row['PRO_NAME']
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "ERROR"));
    }

    echo $respuesta;
}

if ($post['accion'] == "loadreceta") {
    $codigo = $post['codigo']; // Asegúrate de que el parámetro se llama `codigousu`
    $sentencia = sprintf("SELECT * FROM res_recipe WHERE REC_CODE  = $codigo ", ); // Usa sprintf para formatear la consulta
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = [];
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'PRO_CODE' => $row['PRO_CODE'],
                'REC_STATUS' => $row['REC_STATUS'],
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron resultados."));
    }
    echo $respuesta;
}
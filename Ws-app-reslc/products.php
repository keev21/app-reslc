<?php
if ($post['accion'] == "consultProductos") {
    $nombreProducto = isset($post['nombreProducto']) ? $post['nombreProducto'] : '';
    if ($nombreProducto != '') {
        $sentencia = sprintf(
            "SELECT * FROM res_product WHERE PRO_NAME LIKE '%%%s%%'",
            mysqli_real_escape_string($mysqli, $nombreProducto)
        );
    } else {
        $sentencia = "SELECT * FROM res_product";
    }
    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'codigo' => $row['PRO_CODE'],
                'nombre' => $row['PRO_NAME'],
                'precio' => $row['PRO_PRICE'],
                'imagen' => $row['PRO_IMAGE'],
                'stock' => $row['PRO_QUANTY'],
                'estado' => $row['PRO_STATE'],
                'descripcion' => $row['PRO_DESCRIPTION'],
                'categoria' => $row['CAT_CODE']
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron productos."));
    }
    echo $respuesta;
}

if ($post['accion'] == "loadProducts") {
    $codigo = $post['codigo'];
    $sentencia = sprintf("SELECT * FROM res_product WHERE PRO_CODE = '%s'", mysqli_real_escape_string($mysqli, $codigo));
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = mysqli_fetch_array($result);
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontró el producto."));
    }
    echo $respuesta;
}

if ($post['accion'] == "AgProducts" || $post['accion'] == "ActProducts") {
    $nombre = $post['nombre'];
    $precio = $post['precio'];
    $imagen = $post['imagen'];
    $stock = $post['cantidad'];
    $estado = $post['estado'];
    $descripcion = $post['descripcion'];
    $categoria = $post['categoria'];

    if ($post['accion'] == "AgProducts") {
        $sentencia = sprintf(
            "INSERT INTO res_product (PRO_NAME, PRO_PRICE, PRO_IMAGE, PRO_QUANTY, PRO_STATE, PRO_DESCRIPTION, CAT_CODE) 
            VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s')",
            mysqli_real_escape_string($mysqli, $nombre),
            mysqli_real_escape_string($mysqli, $precio),
            mysqli_real_escape_string($mysqli, $imagen),
            mysqli_real_escape_string($mysqli, $stock),
            mysqli_real_escape_string($mysqli, $estado),
            mysqli_real_escape_string($mysqli, $descripcion),
            mysqli_real_escape_string($mysqli, $categoria)
        );
    } else {
        $codigo = $post['codigo'];
        $sentencia = sprintf(
            "UPDATE res_product SET 
            PRO_NAME='%s', 
            PRO_PRICE='%s', 
            PRO_IMAGE='%s', 
            PRO_QUANTY='%s', 
            PRO_STATE='%s', 
            PRO_DESCRIPTION='%s', 
            CAT_CODE='%s' 
            WHERE PRO_CODE='%s'",
            mysqli_real_escape_string($mysqli, $nombre),
            mysqli_real_escape_string($mysqli, $precio),
            mysqli_real_escape_string($mysqli, $imagen),
            mysqli_real_escape_string($mysqli, $stock),
            mysqli_real_escape_string($mysqli, $estado),
            mysqli_real_escape_string($mysqli, $descripcion),
            mysqli_real_escape_string($mysqli, $categoria),
            mysqli_real_escape_string($mysqli, $codigo)
        );
    }
    
    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Producto guardado correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al guardar el producto: " . mysqli_error($mysqli)));
    }
    echo $respuesta;
}

if ($post['accion'] == "elProduct") {
    $codigo = $post['codigo'];
    $sentencia = sprintf("DELETE FROM res_product WHERE PRO_CODE = '%s'", mysqli_real_escape_string($mysqli, $codigo));

    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Producto eliminado correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al eliminar el producto"));
    }
    echo $respuesta;
}


// Añadir esta función al archivo products.php que ya teníamos
if ($post['accion'] == "cargarCategory") {
    $sentencia = "SELECT * FROM res_category"; // Asumiendo que tienes una tabla de categorías
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'CAT_CODE' => $row['CAT_CODE'],
                'CAT_NAME' => $row['CAT_NAME']
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron categorías."));
    }
    echo $respuesta;
}
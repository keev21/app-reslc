<?php


if ($post['accion'] == "cargarSucursales1") {
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





if ($post['accion'] == "consultarProductos") {
    $nombreProducto = isset($post['nombreProducto']) ? $post['nombreProducto'] : '';
    if ($nombreProducto != '') {
        $sentencia = sprintf(
            "SELECT * FROM res_inventory WHERE INV_NAME LIKE '%%%s%%'",
            mysqli_real_escape_string($mysqli, $nombreProducto)
        );
    } else {
        $sentencia = "SELECT * FROM res_inventory";
    }
    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'codigo' => $row['INV_CODE'],
                'nombre' => $row['INV_NAME'],
                'tipo' => $row['INV_TYPE'],
                'iva' => $row['INV_IVA'],
                'imagen' => $row['INV_IMAGE'],
                'stock' => $row['INV_STOCK'],
                'precio' => $row['INV_PRICE'],
                'sucursal' => $row['BRAN_CODE']
            );
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron productos."));
    }
    echo $respuesta;
}

if ($post['accion'] == "loadProducto") {
    $codigo = $post['codigo'];
    $sentencia = sprintf("SELECT * FROM res_inventory WHERE INV_CODE = '%s'", mysqli_real_escape_string($mysqli, $codigo));
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $datos = mysqli_fetch_array($result);
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontró el producto."));
    }
    echo $respuesta;
}

if ($post['accion'] == "AgregarProducto" || $post['accion'] == "ActualizarProducto") {
    $nombre = $post['nombre'];
    $tipo = $post['tipo'];
    $iva = $post['iva'];
    $imagen = $post['imagen'];
    $stock = $post['stock'];
    $precio = $post['precio'];
    $sucursal = $post['sucursal'];

    if ($post['accion'] == "AgregarProducto") {
        $sentencia = sprintf(
            "INSERT INTO res_inventory (INV_NAME, INV_TYPE, INV_IVA, INV_IMAGE, INV_STOCK, INV_PRICE, BRAN_CODE) 
            VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s')",
            mysqli_real_escape_string($mysqli, $nombre),
            mysqli_real_escape_string($mysqli, $tipo),
            mysqli_real_escape_string($mysqli, $iva),
            mysqli_real_escape_string($mysqli, $imagen),
            mysqli_real_escape_string($mysqli, $stock),
            mysqli_real_escape_string($mysqli, $precio),
            mysqli_real_escape_string($mysqli, $sucursal)
        );
    } else {
        $codigo = $post['codigo'];
        $sentencia = sprintf(
            "UPDATE res_inventory SET 
            INV_NAME='%s', 
            INV_TYPE='%s', 
            INV_IVA='%s', 
            INV_IMAGE='%s', 
            INV_STOCK='%s', 
            INV_PRICE='%s', 
            BRAN_CODE='%s' 
            WHERE INV_CODE='%s'",
            mysqli_real_escape_string($mysqli, $nombre),
            mysqli_real_escape_string($mysqli, $tipo),
            mysqli_real_escape_string($mysqli, $iva),
            mysqli_real_escape_string($mysqli, $imagen),
            mysqli_real_escape_string($mysqli, $stock),
            mysqli_real_escape_string($mysqli, $precio),
            mysqli_real_escape_string($mysqli, $sucursal),
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

if ($post['accion'] == "eliminarProducto") {
    $codigo = $post['codigo'];
    $sentencia = sprintf("DELETE FROM res_inventory WHERE INV_CODE = '%s'", mysqli_real_escape_string($mysqli, $codigo));

    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Producto eliminado correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al eliminar el producto"));
    }
    echo $respuesta;
}








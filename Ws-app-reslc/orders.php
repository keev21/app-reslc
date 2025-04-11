<?php
// Obtener detalles de una orden específica
if ($post['accion'] == "getOrderDetails") {
    $ord_code = mysqli_real_escape_string($mysqli, $post['ord_code']);
    $boo_code = mysqli_real_escape_string($mysqli, $post['boo_code']);
    
    $sql = "SELECT 
                ORD_CODE, 
                BOO_CODE, 
                DATE_FORMAT(ORD_DATE, '%Y-%m-%d %H:%i:%s') as ORD_DATE, 
                ORD_STATUS, 
                ORD_TOTAL,
                ORD_PAYMENT,
                ORD_PAYMENT_ID,
                ORD_IMAGE
            FROM res_order 
            WHERE ORD_CODE = '$ord_code' AND BOO_CODE = '$boo_code'";
    
    $result = mysqli_query($mysqli, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        $order = mysqli_fetch_assoc($result);
        echo json_encode([
            'estado' => true, 
            'order' => $order
        ]);
    } else {
        echo json_encode([
            'estado' => false,
            'mensaje' => 'No se encontró la orden'
        ]);
    }
    exit;
}

// Obtener todas las categorías
if ($post['accion'] == "getCategories") {
    $sql = "SELECT CAT_CODE, CAT_NAME FROM res_category WHERE CAT_STATUS = '0' ORDER BY CAT_NAME";
    $result = mysqli_query($mysqli, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        $categories = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $categories[] = $row;
        }
        echo json_encode(['estado' => true, 'categories' => $categories]);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'No se encontraron categorías']);
    }
    exit;
}

// Obtener productos del inventario con filtros
if ($post['accion'] == "getInventoryProducts") {
    $searchTerm = isset($post['searchTerm']) ? mysqli_real_escape_string($mysqli, $post['searchTerm']) : '';
    $category = isset($post['category']) ? mysqli_real_escape_string($mysqli, $post['category']) : null;
    
    $sql = "SELECT 
                i.INV_CODE, 
                i.INV_NAME, 
                
                i.INV_TYPE, 
                i.INV_IVA, 
                i.INV_IMAGE, 
                i.INV_UNIT_NAME, 
                i.INV_STOCK, 
                i.INV_PRICE,
                i.INV_PRICE_IVA_MARGIN,
                c.CAT_NAME
            FROM res_inventory i
            LEFT JOIN res_category c ON i.CAT_CODE = c.CAT_CODE
            WHERE 1=1";
    
    if (!empty($searchTerm)) {
        $sql .= " AND i.INV_NAME LIKE '%$searchTerm%'";
    }
    
    if ($category !== null) {
        $sql .= " AND i.CAT_CODE = '$category'";
    }
    
    $sql .= " ORDER BY i.INV_NAME";
    
    $result = mysqli_query($mysqli, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        $products = [];
        while ($row = mysqli_fetch_assoc($result)) {
            // Si no hay imagen, usar una por defecto
            if (empty($row['INV_IMAGE'])) {
                $row['INV_IMAGE'] = 'assets/images/default-product.png';
            }
            $products[] = $row;
        }
        echo json_encode(['estado' => true, 'products' => $products]);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'No se encontraron productos']);
    }
    exit;
}

if ($post['accion'] == "checkProductInOrder") {
    $ord_code = mysqli_real_escape_string($mysqli, $post['ORD_CODE']);
    $inv_code = mysqli_real_escape_string($mysqli, $post['INV_CODE']);
    
    $sql = "SELECT ORDD_CODE FROM res_order_details 
            WHERE ORD_CODE = '$ord_code' AND INV_CODE = '$inv_code'";
    
    $result = mysqli_query($mysqli, $sql);
    
    echo json_encode([
        'estado' => true,
        'existe' => mysqli_num_rows($result) > 0
    ]);
    exit;
}

// Agregar un producto a una orden
if ($post['accion'] == "addProductToOrder") {
    $ord_code = mysqli_real_escape_string($mysqli, $post['ORD_CODE']);
    $inv_code = mysqli_real_escape_string($mysqli, $post['INV_CODE']);
    $quantity = isset($post['ORDD_QUANTITY']) ? mysqli_real_escape_string($mysqli, $post['ORDD_QUANTITY']) : 0;
    $price = isset($post['ORDD_PRICE']) ? mysqli_real_escape_string($mysqli, $post['ORDD_PRICE']) : 0;
    $notes = "Pendiente";
    
    $sql = "INSERT INTO res_order_details 
            (ORD_CODE, INV_CODE, ORDD_QUANTITY, ORDD_PRICE, ORDD_STATUS)
            VALUES 
            ('$ord_code', '$inv_code', '$quantity', '$price', '$notes')";
    
    if (mysqli_query($mysqli, $sql)) {
        // Obtenemos el ID autoincremental que se acaba de insertar
        $ordd_code = mysqli_insert_id($mysqli);
        
        echo json_encode([
            'estado' => true,
            'mensaje' => 'Producto agregado correctamente',
            'ORDD_CODE' => $ordd_code
        ]);
    } else {
        echo json_encode([
            'estado' => false,
            'mensaje' => 'Error al agregar el producto: ' . mysqli_error($mysqli)
        ]);
    }
    exit;
}

// Obtener productos de una orden específica
if ($post['accion'] == "getOrderProducts") {
    $ord_code = mysqli_real_escape_string($mysqli, $post['ord_code']);
    
    $sql = "SELECT 
                od.ORDD_CODE,
                od.ORD_CODE,
                od.INV_CODE,
                od.ORDD_QUANTITY,
                od.ORDD_PRICE,
                od.ORDD_STATUS,
                i.INV_NAME,
                i.INV_IMAGE,
                i.INV_UNIT_NAME
            FROM res_order_details od
            JOIN res_inventory i ON od.INV_CODE = i.INV_CODE
            WHERE od.ORD_CODE = '$ord_code'";
    
    $result = mysqli_query($mysqli, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        $orderDetails = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $orderDetails[] = $row;
        }
        echo json_encode([
            'estado' => true,
            'orderDetails' => $orderDetails
        ]);
    } else {
        echo json_encode([
            'estado' => false,
            'mensaje' => 'No se encontraron productos en esta orden'
        ]);
    }
    exit;
}

// Eliminar un producto de una orden
if ($post['accion'] == "deleteProductFromOrder") {
    $ordd_code = mysqli_real_escape_string($mysqli, $post['ordd_code']);
    
    // Primero obtenemos el ORD_CODE para actualizar el total después
    $sql = "SELECT ORD_CODE FROM res_order_details WHERE ORDD_CODE = '$ordd_code'";
    $result = mysqli_query($mysqli, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $ord_code = $row['ORD_CODE'];
        
        // Eliminamos el producto
        $sql = "DELETE FROM res_order_details WHERE ORDD_CODE = '$ordd_code'";
        
        if (mysqli_query($mysqli, $sql)) {
           
            
            echo json_encode([
                'estado' => true,
                'mensaje' => 'Producto eliminado correctamente'
            ]);
        } else {
            echo json_encode([
                'estado' => false,
                'mensaje' => 'Error al eliminar el producto: ' . mysqli_error($mysqli)
            ]);
        }
    } else {
        echo json_encode([
            'estado' => false,
            'mensaje' => 'No se encontró el producto a eliminar'
        ]);
    }
    exit;
}


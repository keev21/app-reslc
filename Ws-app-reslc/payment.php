<?php
// Obtener el total de la orden
if ($post['accion'] == "getOrderTotal") {
    $ord_code = mysqli_real_escape_string($mysqli, $post['ORD_CODE']);
    
    $sql = "SELECT SUM(ORDD_QUANTITY * ORDD_PRICE) as total 
            FROM res_order_details 
            WHERE ORD_CODE = '$ord_code'";
    
    $result = mysqli_query($mysqli, $sql);
    
    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode([
            'estado' => true,
            'total' => $row['total'] ? (float)$row['total'] : 0
        ]);
    } else {
        echo json_encode([
            'estado' => false,
            'mensaje' => 'No se pudo calcular el total'
        ]);
    }
    exit;
}
if ($post['accion'] == "completeOrderPayment") {
    $ord_code = mysqli_real_escape_string($mysqli, $post['ORD_CODE']);
    $payment_method = mysqli_real_escape_string($mysqli, $post['ORD_PAYMENT']);
    $payment_id = mysqli_real_escape_string($mysqli, $post['ORD_PAYMENT_ID']);
    $payment_image = mysqli_real_escape_string($mysqli, $post['ORD_IMAGE']);
    $total = mysqli_real_escape_string($mysqli, $post['ORD_TOTAL']);
    
    // Iniciar transacción
    mysqli_begin_transaction($mysqli);
    
    try {
        // 1. Actualizar la orden
        $sql_order = "UPDATE res_order SET 
                     ORD_PAYMENT = '$payment_method',
                     ORD_PAYMENT_ID = '$payment_id',
                     ORD_IMAGE = '$payment_image',
                     ORD_STATUS = '1',
                     ORD_TOTAL = '$total',
                     ORD_DATE = NOW()
                     WHERE ORD_CODE = '$ord_code'";
        
        if (!mysqli_query($mysqli, $sql_order)) {
            throw new Exception('Error al actualizar la orden: ' . mysqli_error($mysqli));
        }
        
        // 2. Actualizar el stock de inventario
        // Primero obtenemos todos los productos de la orden
        $sql_order_details = "SELECT INV_CODE, ORDD_QUANTITY 
                             FROM res_order_details 
                             WHERE ORD_CODE = '$ord_code'";
        $result_details = mysqli_query($mysqli, $sql_order_details);
        
        if (!$result_details) {
            throw new Exception('Error al obtener detalles de la orden: ' . mysqli_error($mysqli));
        }
        
        while ($row = mysqli_fetch_assoc($result_details)) {
            $inv_code = mysqli_real_escape_string($mysqli, $row['INV_CODE']);
            $quantity = mysqli_real_escape_string($mysqli, $row['ORDD_QUANTITY']);
            
            // Actualizamos el stock restando la cantidad vendida
            $sql_update_stock = "UPDATE res_inventory 
                                SET INV_STOCK = INV_STOCK - $quantity 
                                WHERE INV_CODE = '$inv_code'";
            
            if (!mysqli_query($mysqli, $sql_update_stock)) {
                throw new Exception('Error al actualizar el stock: ' . mysqli_error($mysqli));
            }
        }
        
        // 3. Actualizar estado de la reserva (si es necesario)
        if (isset($post['BOO_CODE'])) {
            $boo_code = mysqli_real_escape_string($mysqli, $post['BOO_CODE']);
            $sql_booking = "UPDATE res_booking SET 
                           BOO_STATE = '1' 
                           WHERE BOO_CODE = '$boo_code'";
            
            if (!mysqli_query($mysqli, $sql_booking)) {
                throw new Exception('Error al actualizar la reserva: ' . mysqli_error($mysqli));
            }
        }
        
        // Confirmar transacción
        mysqli_commit($mysqli);
        
        echo json_encode([
            'estado' => true,
            'mensaje' => 'Pago procesado y stock actualizado correctamente'
        ]);
        
    } catch (Exception $e) {
        // Revertir transacción en caso de error
        mysqli_rollback($mysqli);
        
        echo json_encode([
            'estado' => false,
            'mensaje' => $e->getMessage()
        ]);
    }
    exit;
}

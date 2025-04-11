<?php
if ($post['accion'] == "consultarDetallesPedido") {
    $sentencia = "SELECT o.ORDD_CODE, o.ORD_CODE, o.ORDD_QUANTITY, o.ORDD_STATUS, 
                         d.ORD_DATE, d.ORD_TOTAL, 
                         i.INV_NAME,
                         f.TAB_NAME
                  FROM res_order_details o
                  INNER JOIN res_order d ON o.ORD_CODE = d.ORD_CODE
                  INNER JOIN res_inventory i ON o.INV_CODE = i.INV_CODE
                  INNER JOIN res_booking b ON d.BOO_CODE = b.BOO_CODE
                  INNER JOIN res_table f ON b.TAB_CODE = f.TAB_CODE
                  ORDER BY d.ORD_DATE DESC, o.ORD_CODE";

    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'ORDD_CODE' => $row['ORDD_CODE'],
                'ORD_CODE' => $row['ORD_CODE'],
                'ORD_DATE' => $row['ORD_DATE'],
                'ORD_TOTAL' => $row['ORD_TOTAL'],
                'TAB_NAME' => $row['TAB_NAME'],
                'ORDD_QUANTITY' => $row['ORDD_QUANTITY'],
                'INV_NAME' => $row['INV_NAME'],
                'ORDD_STATUS' => $row['ORDD_STATUS']
            );
        }
        echo json_encode(array('estado' => true, "datos" => $datos));
    } else {
        echo json_encode(array('estado' => false, "mensaje" => "No se encontraron detalles."));
    }
}

if ($post['accion'] == "actualizarEstadoPedido") {
    $ORDD_CODE = $post['ORDD_CODE'];
    $ORDD_STATUS = $post['ORDD_STATUS'];
    
    $sentencia = "UPDATE res_order_details 
                  SET ORDD_STATUS = ?
                  WHERE ORDD_CODE = ?";
    
    $stmt = mysqli_prepare($mysqli, $sentencia);
    mysqli_stmt_bind_param($stmt, "si", $ORDD_STATUS, $ORDD_CODE);
    mysqli_stmt_execute($stmt);
    
    if (mysqli_stmt_affected_rows($stmt) > 0) {
        echo json_encode(array('estado' => true, "mensaje" => "Estado actualizado correctamente"));
    } else {
        echo json_encode(array('estado' => false, "mensaje" => "No se pudo actualizar el estado"));
    }
}

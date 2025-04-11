<?php
// Reportes administrativos consolidados
if ($post['accion'] == "generarReporte") {
    $tipo = $post['tipo'];
    $periodo = $post['periodo'] ?? 'all';
    
    // Condición de fecha según período seleccionado
    $fechaCondicion = "";
    if ($periodo === 'month') {
        $fechaCondicion = " AND o.ORD_DATE >= DATE_SUB(NOW(), INTERVAL 1 MONTH)";
    } elseif ($periodo === 'week') {
        $fechaCondicion = " AND o.ORD_DATE >= DATE_SUB(NOW(), INTERVAL 1 WEEK)";
    }
    
    switch ($tipo) {
        case 'mostConsumed':
            // Productos más consumidos en todas las sucursales
            $sentencia = "SELECT 
                            i.INV_NAME as product_name, 
                            SUM(d.ORDD_QUANTITY) as quantity, 
                            SUM(d.ORDD_QUANTITY * d.ORDD_PRICE) as total_sales
                          FROM res_order_details d
                          JOIN res_inventory i ON d.INV_CODE = i.INV_CODE
                          JOIN res_order o ON d.ORD_CODE = o.ORD_CODE
                          WHERE o.ORD_STATUS IN (1, 2) $fechaCondicion
                          GROUP BY d.INV_CODE
                          ORDER BY quantity DESC
                          LIMIT 10";
            break;
            
        case 'salesByCategory':
            // Ventas por categoría
            $sentencia = "SELECT 
                            c.CAT_NAME as category_name,
                            SUM(d.ORDD_QUANTITY) as total_products,
                            SUM(d.ORDD_QUANTITY * d.ORDD_PRICE) as total_sales,
                            ROUND(SUM(d.ORDD_QUANTITY * d.ORDD_PRICE) / 
                            (SELECT SUM(ORDD_QUANTITY * ORDD_PRICE) 
                             FROM res_order_details 
                             JOIN res_order ON res_order_details.ORD_CODE = res_order.ORD_CODE
                             WHERE res_order.ORD_STATUS IN (1, 2) $fechaCondicion) * 100, 2) as percentage
                          FROM res_order_details d
                          JOIN res_inventory i ON d.INV_CODE = i.INV_CODE
                          JOIN res_category c ON i.CAT_CODE = c.CAT_CODE
                          JOIN res_order o ON d.ORD_CODE = o.ORD_CODE
                          WHERE o.ORD_STATUS IN (1, 2) $fechaCondicion
                          GROUP BY c.CAT_CODE
                          ORDER BY total_sales DESC";
            break;
            
        case 'bestCustomers':
            // Mejores clientes
            $sentencia = "SELECT 
                            CONCAT(i.INFO_NAME, ' ', i.INFO_LASTNAME) as customer_name,
                            COUNT(DISTINCT o.ORD_CODE) as visits,
                            SUM(d.ORDD_QUANTITY * d.ORDD_PRICE) as total_spent,
                            ROUND(SUM(d.ORDD_QUANTITY * d.ORDD_PRICE) / 
                            (SELECT SUM(ORDD_QUANTITY * ORDD_PRICE) 
                             FROM res_order_details 
                             JOIN res_order ON res_order_details.ORD_CODE = res_order.ORD_CODE
                             WHERE res_order.ORD_STATUS IN (1, 2) $fechaCondicion) * 100, 2) as percentage
                          FROM res_order_details d
                          JOIN res_order o ON d.ORD_CODE = o.ORD_CODE
                          JOIN res_booking b ON o.BOO_CODE = b.BOO_CODE
                          JOIN res_info i ON b.INFO_CODE = i.INFO_CODE
                          WHERE o.ORD_STATUS IN (1, 2) $fechaCondicion
                          GROUP BY i.INFO_CODE
                          ORDER BY total_spent DESC
                          LIMIT 10";
            break;
            
        default:
            $respuesta = json_encode(array('estado' => false, "mensaje" => "Tipo de reporte no válido."));
            echo $respuesta;
            return;
    }
    
    $result = mysqli_query($mysqli, $sentencia);
    
    if (mysqli_num_rows($result) > 0) {
        $datos = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $datos[] = $row;
        }
        $respuesta = json_encode(array('estado' => true, "datos" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No hay datos para mostrar."));
    }
    
    echo $respuesta;
}
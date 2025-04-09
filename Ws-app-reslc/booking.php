<?php
// Cargar reservas con filtros
if ($post['accion'] == "cargarReservas") {
    $sucursal = $post['sucursal'];
    $nombre = isset($post['nombre']) ? $post['nombre'] : '';
    $fecha = isset($post['fecha']) ? $post['fecha'] : '';
    
    $where = "rb.BOO_STATE = '0' AND rf.BRAN_CODE = '".mysqli_real_escape_string($mysqli, $sucursal)."'";
    
    if ($nombre != '') {
        $where .= " AND (ri.INFO_NAME LIKE '%".mysqli_real_escape_string($mysqli, $nombre)."%' OR 
                      ri.INFO_LASTNAME LIKE '%".mysqli_real_escape_string($mysqli, $nombre)."%')";
    }
    
    if ($fecha != '') {
        $where .= " AND DATE(rb.BOO_DATEBOOKING) = '".mysqli_real_escape_string($mysqli, $fecha)."'";
    }
    
    $sql = "SELECT rb.BOO_CODE as id, rb.BOO_DATEBOOKING as fecha_reserva, rb.BOO_STATE as estado,
                   rt.TAB_NAME as mesa_nombre, rt.TAB_CODE as mesa_id,
                   CONCAT(ri.INFO_NAME, ' ', ri.INFO_LASTNAME) as nombre_cliente, 
                   ri.INFO_CODE as cliente_id, ri.INFO_PHONE as telefono_cliente
            FROM res_booking rb
            JOIN res_table rt ON rb.TAB_CODE = rt.TAB_CODE
            JOIN res_floor rf ON rt.FLOO_CODE = rf.FLOO_CODE
            JOIN res_info ri ON rb.INFO_CODE = ri.INFO_CODE
            WHERE $where
            ORDER BY rb.BOO_DATEBOOKING DESC";
    
    $result = mysqli_query($mysqli, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        $reservas = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $reservas[] = $row;
        }
        echo json_encode(['estado' => true, 'reservas' => $reservas]);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'No se encontraron reservas']);
    }
    exit;
}

// Cargar mesas disponibles para reservas
if ($post['accion'] == "cargarMesasParaReservas") {
    $sucursal = $post['sucursal'];
    
    $sql = "SELECT rt.TAB_CODE as id, rt.TAB_NAME as nombre, rt.TAB_TYPE as tipo
            FROM res_table rt
            JOIN res_floor rf ON rt.FLOO_CODE = rf.FLOO_CODE
            WHERE rf.BRAN_CODE = '".mysqli_real_escape_string($mysqli, $sucursal)."'
            AND rt.TAB_STATUS = '0'";
    
    $result = mysqli_query($mysqli, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        $mesas = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $mesas[] = $row;
        }
        echo json_encode(['estado' => true, 'mesas' => $mesas]);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'No se encontraron mesas disponibles']);
    }
    exit;
}

// Cargar clientes (usuarios con rol de cliente)
if ($post['accion'] == "cargarClientes3") {
    $sql = "SELECT i.INFO_CODE as codigo, i.INFO_NAME as nombre, i.INFO_LASTNAME as apellido, 
                   i.INFO_PHONE as telefono, i.INFO_ADDRES as direccion
            FROM res_info i
            JOIN res_rol r ON i.ROL_CODE = r.ROL_CODE
            WHERE r.ROL_TYPE = 'Cliente' ";
    
    $result = mysqli_query($mysqli, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        $clientes = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $clientes[] = $row;
        }
        echo json_encode(['estado' => true, 'clientes' => $clientes]);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'No se encontraron clientes']);
    }
    exit;
}

// Cargar datos de una reserva específica
if ($post['accion'] == "cargarReserva") {
    $id = $post['id'];
    
    $sql = "SELECT rb.BOO_CODE as id, rb.INFO_CODE as cliente_id, rb.BOO_DATEBOOKING as fecha_reserva, 
                   rb.TAB_CODE as mesa_id, rb.BOO_STATE as estado,
                   CONCAT(ri.INFO_NAME, ' ', ri.INFO_LASTNAME) as nombre_cliente
            FROM res_booking rb
            JOIN res_info ri ON rb.INFO_CODE = ri.INFO_CODE
            WHERE rb.BOO_CODE = '".mysqli_real_escape_string($mysqli, $id)."'";
    
    $result = mysqli_query($mysqli, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        $reserva = mysqli_fetch_assoc($result);
        echo json_encode(['estado' => true, 'reserva' => $reserva]);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'No se encontró la reserva']);
    }
    exit;
}

// Crear/editar reserva con validaciones
if ($post['accion'] == "crearReserva" || $post['accion'] == "editarReserva") {
    // Verificar que todos los campos requeridos estén presentes
    $requiredFields = ['cliente_id', 'fecha_reserva', 'mesa_id'];
    foreach ($requiredFields as $field) {
        if (!isset($post[$field]) || empty($post[$field])) {
            echo json_encode(['estado' => false, 'mensaje' => "El campo $field es requerido"]);
            exit;
        }
    }

    $clienteId = mysqli_real_escape_string($mysqli, $post['cliente_id']);
    $fecha = mysqli_real_escape_string($mysqli, $post['fecha_reserva']);
    $mesa = mysqli_real_escape_string($mysqli, $post['mesa_id']);
    $estado = isset($post['estado']) ? mysqli_real_escape_string($mysqli, $post['estado']) : '0';

    // Verificar que el cliente existe
    $checkCliente = mysqli_query($mysqli, "SELECT INFO_CODE FROM res_info WHERE INFO_CODE = '$clienteId'");
    if (mysqli_num_rows($checkCliente) == 0) {
        echo json_encode(['estado' => false, 'mensaje' => 'El cliente seleccionado no existe']);
        exit;
    }

    // Verificar que la mesa existe
    $checkMesa = mysqli_query($mysqli, "SELECT TAB_CODE FROM res_table WHERE TAB_CODE = '$mesa'");
    if (mysqli_num_rows($checkMesa) == 0) {
        echo json_encode(['estado' => false, 'mensaje' => 'La mesa seleccionada no existe']);
        exit;
    }

    // Verificar disponibilidad de la mesa
    $fechaFormateada = date('Y-m-d H:i:s', strtotime($fecha));
    $checkDisponibilidad = mysqli_query($mysqli, 
        "SELECT BOO_CODE FROM res_booking 
         WHERE TAB_CODE = '$mesa' 
         AND BOO_DATEBOOKING = '$fechaFormateada'
         AND BOO_STATE = '0'");
    
    if (mysqli_num_rows($checkDisponibilidad) > 0 && $post['accion'] == "crearReserva") {
        echo json_encode(['estado' => false, 'mensaje' => 'La mesa ya está reservada para esa fecha y hora']);
        exit;
    }

    // Iniciar transacción para asegurar la integridad de los datos
    mysqli_begin_transaction($mysqli);

    try {
        if ($post['accion'] == "crearReserva") {
            $sql = "INSERT INTO res_booking (INFO_CODE, BOO_DATEBOOKING, TAB_CODE, BOO_STATE)
                    VALUES ('$clienteId', '$fechaFormateada', '$mesa', '$estado')";
        } else {
            $id = mysqli_real_escape_string($mysqli, $post['id']);
            
            // Primero, obtener la mesa anterior para volverla a disponible
            $sql_old_mesa = "SELECT TAB_CODE FROM res_booking WHERE BOO_CODE = '$id'";
            $result_old_mesa = mysqli_query($mysqli, $sql_old_mesa);
            if (mysqli_num_rows($result_old_mesa) > 0) {
                $old_mesa = mysqli_fetch_assoc($result_old_mesa)['TAB_CODE'];
                mysqli_query($mysqli, "UPDATE res_table SET TAB_STATUS = '0' WHERE TAB_CODE = '$old_mesa'");
            }
            
            $sql = "UPDATE res_booking SET 
                    INFO_CODE = '$clienteId',
                    BOO_DATEBOOKING = '$fechaFormateada',
                    TAB_CODE = '$mesa',
                    BOO_STATE = '$estado'
                    WHERE BOO_CODE = '$id'";
        }
        
        // Ejecutar la consulta de reserva
        if (!mysqli_query($mysqli, $sql)) {
            throw new Exception('Error al guardar reserva: ' . mysqli_error($mysqli));
        }
        
        // Actualizar el estado de la mesa a inactivo (1)
        $updateMesa = "UPDATE res_table SET TAB_STATUS = '1' WHERE TAB_CODE = '$mesa'";
        if (!mysqli_query($mysqli, $updateMesa)) {
            throw new Exception('Error al actualizar estado de mesa: ' . mysqli_error($mysqli));
        }
        
        // Confirmar la transacción
        mysqli_commit($mysqli);
        echo json_encode(['estado' => true, 'mensaje' => 'Reserva guardada correctamente']);
        
    } catch (Exception $e) {
        // Revertir la transacción en caso de error
        mysqli_rollback($mysqli);
        echo json_encode(['estado' => false, 'mensaje' => $e->getMessage()]);
    }
    exit;
}

// Eliminar reserva
if ($post['accion'] == "eliminarReserva") {
    $id = mysqli_real_escape_string($mysqli, $post['id']);
    
    // Iniciar transacción
    mysqli_begin_transaction($mysqli);

    try {
        // Primero, obtener la mesa asociada a la reserva
        $sql_mesa = "SELECT TAB_CODE FROM res_booking WHERE BOO_CODE = '$id'";
        $result_mesa = mysqli_query($mysqli, $sql_mesa);
        
        if (mysqli_num_rows($result_mesa) == 0) {
            throw new Exception('La reserva no existe');
        }
        
        $mesa = mysqli_fetch_assoc($result_mesa)['TAB_CODE'];
        
        // Eliminar la reserva
        $sql = "DELETE FROM res_booking WHERE BOO_CODE = '$id'";
        if (!mysqli_query($mysqli, $sql)) {
            throw new Exception('Error al eliminar reserva');
        }
        
        // Actualizar el estado de la mesa a disponible (0)
        $updateMesa = "UPDATE res_table SET TAB_STATUS = '0' WHERE TAB_CODE = '$mesa'";
        if (!mysqli_query($mysqli, $updateMesa)) {
            throw new Exception('Error al actualizar estado de mesa');
        }
        
        // Confirmar la transacción
        mysqli_commit($mysqli);
        echo json_encode(['estado' => true, 'mensaje' => 'Reserva eliminada correctamente']);
        
    } catch (Exception $e) {
        // Revertir la transacción en caso de error
        mysqli_rollback($mysqli);
        echo json_encode(['estado' => false, 'mensaje' => $e->getMessage()]);
    }
    exit;
}
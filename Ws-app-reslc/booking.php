<?php
// Cargar pisos de una sucursal
if ($post['accion'] == "cargarPisos2") {
    $branch = mysqli_real_escape_string($mysqli, $post['branch']);
    
    $query = "SELECT FLOO_CODE, FLOO_NAME, FLOO_TYPE 
              FROM res_floor 
              WHERE BRAN_CODE = '$branch' AND FLOO_STATUS = 1
              ORDER BY FLOO_NAME";
    
    $result = mysqli_query($mysqli, $query);
    
    if ($result && mysqli_num_rows($result) > 0) {
        $pisos = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $pisos[] = $row;
        }
        echo json_encode(['estado' => true, 'pisos' => $pisos]);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'No se encontraron pisos']);
    }
    exit;
}

// Cargar mesas de un piso
if ($post['accion'] == "cargarMesas2") {
    $piso = mysqli_real_escape_string($mysqli, $post['piso']);
    
    $query = "SELECT TAB_CODE, TAB_NAME, TAB_TYPE 
              FROM res_table 
              WHERE FLOO_CODE = '$piso' AND TAB_STATUS = 1
              ORDER BY TAB_NAME";
    
    $result = mysqli_query($mysqli, $query);
    
    if ($result && mysqli_num_rows($result) > 0) {
        $mesas = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $mesas[] = $row;
        }
        echo json_encode(['estado' => true, 'mesas' => $mesas]);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'No se encontraron mesas']);
    }
    exit;
}

// Cargar reservas
if ($post['accion'] == "cargarReservas") {
    $branch = mysqli_real_escape_string($mysqli, $post['branch']);
    $fecha = mysqli_real_escape_string($mysqli, $post['fecha']);
    $busqueda = isset($post['busqueda']) ? mysqli_real_escape_string($mysqli, $post['busqueda']) : '';
    
    $query = "SELECT 
                b.BOO_CODE, b.BOO_DATEBOOKING, b.BOO_STATE,
                i.INFO_CODE, i.INFO_NAME, i.INFO_LASTNAME,
                t.TAB_CODE, t.TAB_NAME,
                f.FLOO_CODE, f.FLOO_NAME
              FROM res_booking b
              INNER JOIN res_info i ON b.INFO_CODE = i.INFO_CODE
              INNER JOIN res_table t ON b.TAB_CODE = t.TAB_CODE
              INNER JOIN res_floor f ON t.FLOO_CODE = f.FLOO_CODE
              WHERE f.BRAN_CODE = '$branch'
                AND DATE(b.BOO_DATEBOOKING) = '$fecha'";
    
    if (!empty($busqueda)) {
        $query .= " AND (i.INFO_NAME LIKE '%$busqueda%' OR i.INFO_LASTNAME LIKE '%$busqueda%')";
    }
    
    $query .= " ORDER BY b.BOO_DATEBOOKING DESC";
    
    $result = mysqli_query($mysqli, $query);
    
    if ($result && mysqli_num_rows($result) > 0) {
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

// Eliminar reserva
if ($post['accion'] == "eliminarReserva") {
    $id = mysqli_real_escape_string($mysqli, $post['id']);
    
    $query = "DELETE FROM res_booking WHERE BOO_CODE = '$id'";
    
    if (mysqli_query($mysqli, $query)) {
        echo json_encode(['estado' => true, 'mensaje' => 'Reserva eliminada correctamente']);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'Error al eliminar reserva']);
    }
    exit;
}
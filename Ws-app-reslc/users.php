<?php


// Cargar usuarios con búsqueda
if ($post['accion'] == "cargarEmpleados") {
    $busqueda = isset($post['busqueda']) ? mysqli_real_escape_string($mysqli, $post['busqueda']) : '';
    $branch = isset($post['branch']) ? mysqli_real_escape_string($mysqli, $post['branch']) : '';

    $query = "SELECT 
                u.USER_CODE as id, 
                u.USER_EMAIL as email,
                u.BRAN_CODE as branch,
                i.INFO_NAME as nombre, 
                i.INFO_CODE as id_info,
                i.INFO_LASTNAME as apellido, 
                i.INFO_PHONE as telefono, 
                i.INFO_ADDRES as direccion, 
                i.ROL_CODE as rol,
                r.ROL_TYPE as tipo_rol
              FROM res_user u
              INNER JOIN res_info i ON u.INFO_CODE = i.INFO_CODE
              LEFT JOIN res_rol r ON i.ROL_CODE = r.ROL_CODE
              WHERE u.BRAN_CODE = '$branch'
                AND (i.INFO_NAME LIKE '%$busqueda%' 
                     OR i.INFO_LASTNAME LIKE '%$busqueda%'
                     OR CONCAT(i.INFO_NAME, ' ', i.INFO_LASTNAME) LIKE '%$busqueda%')
              ORDER BY i.INFO_NAME ASC";

    $result = mysqli_query($mysqli, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $usuarios = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $usuarios[] = $row;
        }
        echo json_encode(['estado' => true, "usuarios" => $usuarios]);
    } else {
        echo json_encode(['estado' => false, "mensaje" => "No se encontraron empleados en esta sucursal."]);
    }
    exit;
}
if ($post['accion'] == "cargarClientes") {
    $busqueda = isset($post['busqueda']) ? mysqli_real_escape_string($mysqli, $post['busqueda']) : '';

    $query = "SELECT 
                i.INFO_CODE as id_info,
                '' as email,
                '' as branch,
                i.INFO_NAME as nombre, 
                i.INFO_LASTNAME as apellido, 
                i.INFO_PHONE as telefono, 
                i.INFO_ADDRES as direccion, 
                i.ROL_CODE as rol,
                'Cliente' as tipo_rol
              FROM res_info i
              LEFT JOIN res_user u ON i.INFO_CODE = u.INFO_CODE
              WHERE u.INFO_CODE IS NULL
                AND (i.INFO_NAME LIKE '%$busqueda%' 
                     OR i.INFO_LASTNAME LIKE '%$busqueda%'
                     OR CONCAT(i.INFO_NAME, ' ', i.INFO_LASTNAME) LIKE '%$busqueda%')
              ORDER BY i.INFO_NAME ASC";

    $result = mysqli_query($mysqli, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $usuarios = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $usuarios[] = $row;
        }
        echo json_encode(['estado' => true, "usuarios" => $usuarios]);
    } else {
        echo json_encode(['estado' => false, "mensaje" => "No se encontraron clientes."]);
    }
    exit;
}



// Cargar datos de un usuario específico
if ($post['accion'] == "cargarUsuario") {
    $id = mysqli_real_escape_string($mysqli, $post['id']);

    $query = "SELECT 
                u.USER_CODE as id, 
                u.USER_EMAIL as email,
                u.BRAN_CODE as branch,
                i.INFO_NAME as nombre, 
                i.INFO_LASTNAME as apellido, 
                i.INFO_PHONE as telefono, 
                i.INFO_ADDRES as direccion, 
                i.ROL_CODE as rol
              FROM res_user u
              INNER JOIN res_info i ON u.INFO_CODE = i.INFO_CODE
              WHERE u.USER_CODE = '$id'";

    $result = mysqli_query($mysqli, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $usuario = mysqli_fetch_assoc($result);
        echo json_encode(['estado' => true, "usuario" => $usuario]);
    } else {
        echo json_encode(['estado' => false, "mensaje" => "No se encontró el usuario."]);
    }
    exit;
}

// Eliminar empleado
if ($post['accion'] == "eliminarEmpleado") {
    $id = mysqli_real_escape_string($mysqli, $post['id']);

    mysqli_begin_transaction($mysqli);
    
    try {
        // Primero obtenemos el INFO_CODE
        $info_code = mysqli_fetch_assoc(mysqli_query($mysqli, 
            "SELECT INFO_CODE FROM res_user WHERE USER_CODE = '$id'"
        ))['INFO_CODE'];
        
        // Eliminar de res_user
        mysqli_query($mysqli, "DELETE FROM res_user WHERE USER_CODE = '$id'");
        
        // Eliminar de res_info
        mysqli_query($mysqli, "DELETE FROM res_info WHERE INFO_CODE = '$info_code'");
        
        mysqli_commit($mysqli);
        echo json_encode(['estado' => true, "mensaje" => "Empleado eliminado correctamente."]);
    } catch (Exception $e) {
        mysqli_rollback($mysqli);
        echo json_encode(['estado' => false, "mensaje" => "Error al eliminar empleado."]);
    }
    exit;
}

// Eliminar cliente
if ($post['accion'] == "eliminarCliente") {
    $id = mysqli_real_escape_string($mysqli, $post['id']);

    $query = "DELETE FROM res_info WHERE INFO_CODE = '$id'";
    
    if (mysqli_query($mysqli, $query)) {
        echo json_encode(['estado' => true, "mensaje" => "Cliente eliminado correctamente."]);
    } else {
        echo json_encode(['estado' => false, "mensaje" => "Error al eliminar cliente."]);
    }
    exit;
}

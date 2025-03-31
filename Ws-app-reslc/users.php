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

// Obtener datos de un empleado
if ($post['accion'] == "obtenerEmpleado") {
    $id = mysqli_real_escape_string($mysqli, $post['id']);
    
    $query = "SELECT 
                i.INFO_CODE, i.INFO_NAME, i.INFO_LASTNAME, 
                i.INFO_PHONE, i.INFO_ADDRES, i.ROL_CODE, i.INFO_DATE,
                u.USER_CODE, u.USER_EMAIL, u.BRAN_CODE
              FROM res_user u
              INNER JOIN res_info i ON u.INFO_CODE = i.INFO_CODE
              WHERE u.USER_CODE = '$id'";
    
    $result = mysqli_query($mysqli, $query);
    
    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode([
            'estado' => true,
            'info' => [
                'INFO_CODE' => $row['INFO_CODE'],
                'INFO_NAME' => $row['INFO_NAME'],
                'INFO_LASTNAME' => $row['INFO_LASTNAME'],
                'INFO_PHONE' => $row['INFO_PHONE'],
                'INFO_ADDRES' => $row['INFO_ADDRES'],
                'ROL_CODE' => $row['ROL_CODE'],
                'INFO_DATE' => $row['INFO_DATE']
            ],
            'user' => [
                'USER_CODE' => $row['USER_CODE'],
                'USER_EMAIL' => $row['USER_EMAIL'],
                'BRAN_CODE' => $row['BRAN_CODE']
            ]
        ]);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'Empleado no encontrado']);
    }
    exit;
}

// Obtener datos de un cliente
if ($post['accion'] == "obtenerCliente") {
    $id = mysqli_real_escape_string($mysqli, $post['id']);
    
    $query = "SELECT 
                INFO_CODE, INFO_NAME, INFO_LASTNAME, 
                INFO_PHONE, INFO_ADDRES, ROL_CODE, INFO_DATE
              FROM res_info
              WHERE INFO_CODE = '$id' ";
    
    $result = mysqli_query($mysqli, $query);
    
    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode([
            'estado' => true,
            'info' => [
                'INFO_CODE' => $row['INFO_CODE'],
                'INFO_NAME' => $row['INFO_NAME'],
                'INFO_LASTNAME' => $row['INFO_LASTNAME'],
                'INFO_PHONE' => $row['INFO_PHONE'],
                'INFO_ADDRES' => $row['INFO_ADDRES'],
                'ROL_CODE' => $row['ROL_CODE'],
                'INFO_DATE' => $row['INFO_DATE']
            ]
        ]);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'Cliente no encontrado']);
    }
    exit;
}

// Cargar roles
if ($post['accion'] == "cargarRoles2") {
    $query = "SELECT ROL_CODE, ROL_TYPE FROM res_rol WHERE ROL_STATUS = 1 AND ROL_CODE != 'CLI'";
    $result = mysqli_query($mysqli, $query);
    
    if ($result && mysqli_num_rows($result) > 0) {
        $roles = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $roles[] = $row;
        }
        echo json_encode(['estado' => true, 'roles' => $roles]);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'No se encontraron roles']);
    }
    exit;
}

// Cargar sucursales
if ($post['accion'] == "cargarSucursales2") {
    $query = "SELECT BRAN_CODE, BRAN_NAME FROM res_branch_office WHERE BRAN_STATUS = 1";
    $result = mysqli_query($mysqli, $query);
    
    if ($result && mysqli_num_rows($result) > 0) {
        $sucursales = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $sucursales[] = $row;
        }
        echo json_encode(['estado' => true, 'sucursales' => $sucursales]);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'No se encontraron sucursales']);
    }
    exit;
}

// Crear empleado
if ($post['accion'] == "crearEmpleado") {
    mysqli_begin_transaction($mysqli);
    
    try {
        // Insertar en res_info
        $infoQuery = "INSERT INTO res_info (
            INFO_NAME, INFO_LASTNAME, INFO_PHONE, 
            INFO_ADDRES, ROL_CODE, INFO_DATE
        ) VALUES (
            '{$post['INFO_NAME']}', '{$post['INFO_LASTNAME']}', '{$post['INFO_PHONE']}', 
            '{$post['INFO_ADDRES']}', '{$post['ROL_CODE']}', NOW()
        )";
        mysqli_query($mysqli, $infoQuery);
        $infoId = mysqli_insert_id($mysqli);
        
        // Insertar en res_user
        $userQuery = "INSERT INTO res_user (
            INFO_CODE, USER_EMAIL, USER_PASSWORD, BRAN_CODE
        ) VALUES (
            '$infoId', '{$post['USER_EMAIL']}', '{$post['USER_PASSWORD']}', '{$post['BRAN_CODE']}'
        )";
        mysqli_query($mysqli, $userQuery);
        
        mysqli_commit($mysqli);
        echo json_encode(['estado' => true, 'mensaje' => 'Empleado creado correctamente']);
    } catch (Exception $e) {
        mysqli_rollback($mysqli);
        echo json_encode(['estado' => false, 'mensaje' => 'Error al crear empleado']);
    }
    exit;
}

// Crear cliente
if ($post['accion'] == "crearCliente") {
    $query = "INSERT INTO res_info (
        INFO_NAME, INFO_LASTNAME, INFO_PHONE, 
        INFO_ADDRES, ROL_CODE, INFO_DATE
    ) VALUES (
        '{$post['INFO_NAME']}', '{$post['INFO_LASTNAME']}', '{$post['INFO_PHONE']}', 
        '{$post['INFO_ADDRES']}', '2', NOW()
    )";
    
    if (mysqli_query($mysqli, $query)) {
        echo json_encode(['estado' => true, 'mensaje' => 'Cliente creado correctamente']);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'Error al crear cliente']);
    }
    exit;
}

// Actualizar empleado
if ($post['accion'] == "actualizarEmpleado") {
    mysqli_begin_transaction($mysqli);
    
    try {
        // Actualizar res_info
        $infoQuery = "UPDATE res_info SET
            INFO_NAME = '{$post['INFO_NAME']}',
            INFO_LASTNAME = '{$post['INFO_LASTNAME']}',
            INFO_PHONE = '{$post['INFO_PHONE']}',
            INFO_ADDRES = '{$post['INFO_ADDRES']}',
            ROL_CODE = '{$post['ROL_CODE']}'
            WHERE INFO_CODE = '{$post['INFO_CODE']}'";
        mysqli_query($mysqli, $infoQuery);
        
        // Actualizar res_user (solo email y sucursal, no password a menos que se proporcione)
        $userQuery = "UPDATE res_user SET
            USER_EMAIL = '{$post['USER_EMAIL']}',
            BRAN_CODE = '{$post['BRAN_CODE']}'";
            
        if (!empty($post['USER_PASSWORD'])) {
            $userQuery .= ", USER_PASSWORD = '{$post['USER_PASSWORD']}'";
        }
        
        $userQuery .= " WHERE USER_CODE = '{$post['USER_CODE']}'";
        mysqli_query($mysqli, $userQuery);
        
        mysqli_commit($mysqli);
        echo json_encode(['estado' => true, 'mensaje' => 'Empleado actualizado correctamente']);
    } catch (Exception $e) {
        mysqli_rollback($mysqli);
        echo json_encode(['estado' => false, 'mensaje' => 'Error al actualizar empleado']);
    }
    exit;
}

// Actualizar cliente
if ($post['accion'] == "actualizarCliente") {
    $query = "UPDATE res_info SET
        INFO_NAME = '{$post['INFO_NAME']}',
        INFO_LASTNAME = '{$post['INFO_LASTNAME']}',
        INFO_PHONE = '{$post['INFO_PHONE']}',
        INFO_ADDRES = '{$post['INFO_ADDRES']}'
        WHERE INFO_CODE = '{$post['INFO_CODE']}'";
    
    if (mysqli_query($mysqli, $query)) {
        echo json_encode(['estado' => true, 'mensaje' => 'Cliente actualizado correctamente']);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'Error al actualizar cliente']);
    }
    exit;
}
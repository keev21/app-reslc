<?php


// Cargar usuarios con búsqueda
if ($post['accion'] == "cargarUsuarios") {
    $busqueda = isset($post['busqueda']) ? mysqli_real_escape_string($mysqli, $post['busqueda']) : '';
    
    $query = "SELECT 
                u.USER_CODE as id, 
                u.USER_EMAIL as email,
                u.BRAN_CODE as branch,
                i.INFO_NAME as nombre, 
                i.INFO_LASTNAME as apellido, 
                i.INFO_PHONE as telefono, 
                i.INFO_ADDRES as direccion, 
                i.ROL_CODE as rol,
                r.ROL_TYPE as tipo_rol
              FROM res_user u
              INNER JOIN res_info i ON u.INFO_CODE = i.INFO_CODE
              LEFT JOIN res_rol r ON i.ROL_CODE = r.ROL_CODE
              WHERE i.INFO_NAME LIKE '%$busqueda%' 
                 OR i.INFO_LASTNAME LIKE '%$busqueda%'
              ORDER BY i.INFO_NAME ASC";

    $result = mysqli_query($mysqli, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $usuarios = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $usuarios[] = $row;
        }
        echo json_encode(['estado' => true, "usuarios" => $usuarios]);
    } else {
        echo json_encode(['estado' => false, "mensaje" => "No se encontraron usuarios."]);
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

// Crear nuevo usuario
if ($post['accion'] == "crearUsuario") {
    $nombre = mysqli_real_escape_string($mysqli, $post['nombre']);
    $apellido = mysqli_real_escape_string($mysqli, $post['apellido']);
    $email = mysqli_real_escape_string($mysqli, $post['email']);
    $telefono = mysqli_real_escape_string($mysqli, $post['telefono']);
    $direccion = mysqli_real_escape_string($mysqli, $post['direccion']);
    $rol = mysqli_real_escape_string($mysqli, $post['rol']);
    $branch = mysqli_real_escape_string($mysqli, $post['branch']);
    $password = password_hash($post['password'], PASSWORD_DEFAULT);

    mysqli_begin_transaction($mysqli);
    
    try {
        // Primero insertamos en res_info
        $query_info = "INSERT INTO res_info (
                        INFO_NAME, INFO_LASTNAME, INFO_PHONE, INFO_ADDRES, ROL_CODE
                      ) VALUES (
                        '$nombre', '$apellido', '$telefono', '$direccion', '$rol'
                      )";
        
        if (!mysqli_query($mysqli, $query_info)) {
            throw new Exception(mysqli_error($mysqli));
        }
        
        $info_code = mysqli_insert_id($mysqli);
        
        // Luego insertamos en res_user
        $query_user = "INSERT INTO res_user (
                        INFO_CODE, USER_EMAIL, USER_PASSWORD, BRAN_CODE
                      ) VALUES (
                        '$info_code', '$email', '$password', '$branch'
                      )";
        
        if (!mysqli_query($mysqli, $query_user)) {
            throw new Exception(mysqli_error($mysqli));
        }
        
        mysqli_commit($mysqli);
        echo json_encode(['estado' => true, "mensaje" => "Usuario creado correctamente."]);
    } catch (Exception $e) {
        mysqli_rollback($mysqli);
        echo json_encode(['estado' => false, "mensaje" => "Error al crear el usuario: " . $e->getMessage()]);
    }
    exit;
}

// Editar usuario existente
if ($post['accion'] == "editarUsuario") {
    $id = mysqli_real_escape_string($mysqli, $post['id']);
    $nombre = mysqli_real_escape_string($mysqli, $post['nombre']);
    $apellido = mysqli_real_escape_string($mysqli, $post['apellido']);
    $email = mysqli_real_escape_string($mysqli, $post['email']);
    $telefono = mysqli_real_escape_string($mysqli, $post['telefono']);
    $direccion = mysqli_real_escape_string($mysqli, $post['direccion']);
    $rol = mysqli_real_escape_string($mysqli, $post['rol']);
    $branch = mysqli_real_escape_string($mysqli, $post['branch']);
    $password = isset($post['password']) ? password_hash($post['password'], PASSWORD_DEFAULT) : null;

    mysqli_begin_transaction($mysqli);
    
    try {
        // Actualizar res_info
        $query_info = "UPDATE res_info i
                      JOIN res_user u ON i.INFO_CODE = u.INFO_CODE
                      SET i.INFO_NAME = '$nombre',
                          i.INFO_LASTNAME = '$apellido',
                          i.INFO_PHONE = '$telefono',
                          i.INFO_ADDRES = '$direccion',
                          i.ROL_CODE = '$rol'
                      WHERE u.USER_CODE = '$id'";
        
        if (!mysqli_query($mysqli, $query_info)) {
            throw new Exception(mysqli_error($mysqli));
        }
        
        // Actualizar res_user
        $query_user = "UPDATE res_user SET
                      USER_EMAIL = '$email',
                      BRAN_CODE = '$branch'";
        
        if ($password) {
            $query_user .= ", USER_PASSWORD = '$password'";
        }
        
        $query_user .= " WHERE USER_CODE = '$id'";
        
        if (!mysqli_query($mysqli, $query_user)) {
            throw new Exception(mysqli_error($mysqli));
        }
        
        mysqli_commit($mysqli);
        echo json_encode(['estado' => true, "mensaje" => "Usuario actualizado correctamente."]);
    } catch (Exception $e) {
        mysqli_rollback($mysqli);
        echo json_encode(['estado' => false, "mensaje" => "Error al actualizar el usuario: " . $e->getMessage()]);
    }
    exit;
}

// Eliminar usuario
if ($post['accion'] == "eliminarUsuario") {
    $id = mysqli_real_escape_string($mysqli, $post['id']);

    mysqli_begin_transaction($mysqli);
    
    try {
        // Primero obtenemos el INFO_CODE
        $query_info_code = "SELECT INFO_CODE FROM res_user WHERE USER_CODE = '$id'";
        $result = mysqli_query($mysqli, $query_info_code);
        
        if (!$result || mysqli_num_rows($result) == 0) {
            throw new Exception("Usuario no encontrado");
        }
        
        $row = mysqli_fetch_assoc($result);
        $info_code = $row['INFO_CODE'];
        
        // Eliminar de res_user
        $query_user = "DELETE FROM res_user WHERE USER_CODE = '$id'";
        if (!mysqli_query($mysqli, $query_user)) {
            throw new Exception(mysqli_error($mysqli));
        }
        
        // Eliminar de res_info
        $query_info = "DELETE FROM res_info WHERE INFO_CODE = '$info_code'";
        if (!mysqli_query($mysqli, $query_info)) {
            throw new Exception(mysqli_error($mysqli));
        }
        
        mysqli_commit($mysqli);
        echo json_encode(['estado' => true, "mensaje" => "Usuario eliminado correctamente."]);
    } catch (Exception $e) {
        mysqli_rollback($mysqli);
        echo json_encode(['estado' => false, "mensaje" => "Error al eliminar el usuario: " . $e->getMessage()]);
    }
   
}


?>
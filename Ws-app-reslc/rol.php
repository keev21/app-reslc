<?php


// Cargar roles
if ($post['accion'] == "cargarRoles") {
    $sentencia = "SELECT ROL_CODE as id, ROL_TYPE as tipo, ROL_STATUS as estado FROM res_rol";
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $roles = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $roles[] = $row;
        }
        $respuesta = json_encode(array('estado' => true, "roles" => $roles));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron roles."));
    }

    echo $respuesta;
}

// Cargar datos de un rol
if ($post['accion'] == "cargarRol") {
    $id = $post['id'];

    $sentencia = sprintf(
        "SELECT ROL_CODE as id, ROL_TYPE as tipo, ROL_STATUS as estado 
        FROM res_rol 
        WHERE ROL_CODE = '%s'",
        mysqli_real_escape_string($mysqli, $id))
    ;
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $rol = mysqli_fetch_assoc($result);
        $respuesta = json_encode(array('estado' => true, "rol" => $rol));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontró el rol."));
    }

    echo $respuesta;
}

// Guardar nuevo rol
if ($post['accion'] == "guardarRol") {
    $tipo = $post['tipo'];
    $estado = $post['estado'];

    $sentencia = sprintf(
        "INSERT INTO res_rol (ROL_TYPE, ROL_STATUS) 
        VALUES ('%s', '%s')",
        mysqli_real_escape_string($mysqli, $tipo),
        mysqli_real_escape_string($mysqli, $estado))
    ;

    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Rol guardado correctamente."));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al guardar el rol."));
    }

    echo $respuesta;
}

// Editar rol
if ($post['accion'] == "editarRol") {
    $id = $post['id'];
    $tipo = $post['tipo'];
    $estado = $post['estado'];

    $sentencia = sprintf(
        "UPDATE res_rol 
        SET ROL_TYPE = '%s', ROL_STATUS = '%s' 
        WHERE ROL_CODE = '%s'",
        mysqli_real_escape_string($mysqli, $tipo),
        mysqli_real_escape_string($mysqli, $estado),
        mysqli_real_escape_string($mysqli, $id))
    ;

    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Rol actualizado correctamente."));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al actualizar el rol."));
    }

    echo $respuesta;
}

// Eliminar rol
if ($post['accion'] == "eliminarRol") {
    $id = $post['id'];

    $sentencia = sprintf(
        "DELETE FROM res_rol WHERE ROL_CODE = '%s'",
        mysqli_real_escape_string($mysqli, $id))
    ;

    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Rol eliminado correctamente."));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al eliminar el rol."));
    }

    echo $respuesta;
}
?>
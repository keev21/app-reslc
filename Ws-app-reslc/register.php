<?php
if ($post['accion'] == "cargarSucursales") {
    $sentencia = "SELECT BRAN_CODE, BRAN_NAME, BRAN_ADDRES FROM res_branch_office WHERE BRAN_STATUS = 1";
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $sucursales = [];
        while ($row = mysqli_fetch_array($result)) {
            $sucursales[] = array(
                'id' => $row['BRAN_CODE'],
                'nombre' => $row['BRAN_NAME'],
                'direccion' => $row['BRAN_ADDRES']
            );
        }
        $respuesta = json_encode(array('estado' => true, "sucursales" => $sucursales));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No se encontraron sucursales."));
    }

    echo $respuesta;
}





if ($post['accion'] == "guardarUsuario") {
    $nombre = $post['nombre'];
    $apellido = $post['apellido'];
    $email = $post['email'];
    $password = password_hash($post['password'], PASSWORD_DEFAULT); // Encriptar la contraseña
    $telefono = $post['telefono'];
    $direccion = $post['direccion'];
    $rol = $post['rol'];
    $sucursal = $post['sucursal'];

    $sentencia = sprintf(
        "INSERT INTO res_user (USER_NAME, USER_LASTNAME, USER_EMAIL, USER_PASSWORD, USER_PHONE, USER_ADDRES, ROL_CODE, BRAN_CODE) 
        VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
        mysqli_real_escape_string($mysqli, $nombre),
        mysqli_real_escape_string($mysqli, $apellido),
        mysqli_real_escape_string($mysqli, $email),
        mysqli_real_escape_string($mysqli, $password),
        mysqli_real_escape_string($mysqli, $telefono),
        mysqli_real_escape_string($mysqli, $direccion),
        mysqli_real_escape_string($mysqli, $rol),
        mysqli_real_escape_string($mysqli, $sucursal)
    );

    if (mysqli_query($mysqli, $sentencia)) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Usuario registrado correctamente."));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al registrar el usuario."));
    }

    echo $respuesta;
}



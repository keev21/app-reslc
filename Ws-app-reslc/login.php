<?php

if ($post['accion'] == "login") {
    $email = $post['email'];
    $password = $post['password'];

    // Verificar si el usuario existe
    $sentencia = sprintf("SELECT * FROM res_user WHERE USER_EMAIL = '%s'", mysqli_real_escape_string($mysqli, $email));
    $result = mysqli_query($mysqli, $sentencia);

    if (mysqli_num_rows($result) > 0) {
        $usuario = mysqli_fetch_assoc($result);

        // Verificar la contraseña
        if (password_verify($password, $usuario['USER_PASSWORD'])) {
            // Devolver los datos del usuario
            $respuesta = json_encode(array(
                'estado' => true,
                'mensaje' => 'Inicio de sesión exitoso.',
                'usuario' => array(
                    'id' => $usuario['USER_CODE'],
                    'nombre' => $usuario['USER_NAME'],
                    'email' => $usuario['USER_EMAIL'],
                    'rol' => $usuario['ROL_CODE']
                )
            ));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Contraseña incorrecta.'));
        }
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'El usuario no existe.'));
    }

    echo $respuesta;
}
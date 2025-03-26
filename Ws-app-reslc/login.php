<?php

if ($post['accion'] == "login") {
    $email = $post['email'];
    $password = $post['password'];

    // Verificar si el usuario existe con INNER JOIN a res_info
    $sentencia = sprintf("
    SELECT 
    u.USER_CODE, 
  
    u.USER_EMAIL, 
    u.USER_PASSWORD, 

    u.BRAN_CODE,
    i.ROL_CODE
FROM 
    res_user u
INNER JOIN 
    res_info i ON u.INFO_CODE = i.INFO_CODE
WHERE 
    u.USER_EMAIL= '%s'", 
        mysqli_real_escape_string($mysqli, $email));
    
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
                    'email' => $usuario['USER_EMAIL'],
                    'branch' => $usuario['BRAN_CODE'],
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
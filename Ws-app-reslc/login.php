<?php

if (isset($post['accion']) && $post['accion'] == "login") {
    $email = mysqli_real_escape_string($mysqli, $post['USAD_EMAIL']);
    $password = mysqli_real_escape_string($mysqli, $post['USAD_PASSWORD']); // Se escapa la contraseña por seguridad

    $query = "SELECT * FROM res_user WHERE USER_EMAIL = '$email'";
    $result = mysqli_query($mysqli, $query);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);

        if ($password === $row['USER_PASSWORD']) {
            $datos = array(
                'USER_CODE' => $row['USER_CODE'],
                'USER_NAME' => $row['USER_NAME'],
                'USER_LASTNAME' => $row['USER_LASTNAME'],
                'USER_EMAIL' => $row['USER_EMAIL'],
                'ROL_CODE' => $row['ROL_CODE'],
                'USER_DATE' => $row['USER_DATE'],
                'BRAN_CODE' => $row['BRAN_CODE']
            );
        
            // La clave debe llamarse "user_admin" para que coincida con el frontend
            $respuesta = array("estado" => true, "user_admin" => [$datos], "mensaje" => "Inicio de sesión exitoso");
        } else {
            $respuesta = array("estado" => false, "mensaje" => "Contraseña incorrecta");
        }
    }
    echo $respuesta;
}

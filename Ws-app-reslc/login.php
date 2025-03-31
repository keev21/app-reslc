<?php


if (isset($post['accion']) && $post['accion'] == "login") {
    $email = mysqli_real_escape_string($mysqli, $post['USAD_EMAIL']);
    $password = $post['USAD_PASSWORD']; // No se escapa la contraseña porque no se usa directamente en la consulta

    $query = "SELECT * FROM res_user WHERE USER_EMAIL = '$email'";
    $result = mysqli_query($mysqli, $query);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_array($result);

        // Verificar la contraseña con password_verify
        if (password_verify($password, $row['USER_PASSWORD'])) {
            $datos = array(
                'USER_CODE' => $row['USER_CODE'],
                'USER_EMAIL' => $row['USER_EMAIL'],
                'ROL_CODE' => $row['ROL_CODE'],
                'BRAN_CODE' => $row['BRAN_CODE']
            );
            $respuesta = json_encode(array('estado' => true, "user_admin" => $datos, "mensaje" => "EXITO: BIENVENIDOS AL SISTEMA"));
        } else {
            // Contraseña incorrecta
            $respuesta = json_encode(array('estado' => false, "mensaje" => "ERROR: CORREO O CONTRASEÑA INCORRECTOS"));
        }
    } else {
        // No se encontró el usuario
        $respuesta = json_encode(array('estado' => false, "mensaje" => "ERROR: CORREO O CONTRASEÑA INCORRECTOS"));
    }

    echo $respuesta;
}

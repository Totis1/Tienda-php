<?php
    require_once BASE_PATH.'../services/tokenService.php';

    class AuthMiddleware {
        public static function verificaToken(){
            $headers = apache_request_headers();
            if (!isset($headers['Authorization'])){
                return ['mensaje' => 'Token no proporcionado', 'codigo' => 404];
            }
            $token = str_replace('Bearer', '',$headers['Authorization']);
            $tokenService = new TokenService();
            if (!$tokenService->verificarToken($token)){
                return ['mensaje' => 'Token inválido', 'codigo' => 401];
            }
            return ['mensaje' => 'Token Valido', 'codigo' => 200];
        }
    }

?>
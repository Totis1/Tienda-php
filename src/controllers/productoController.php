<?php
    require_once BASE_PATH.'../repositories/productoRepository.php';
    require_once BASE_PATH.'../models/productoModel.php';

    class ProductoController {
        private $productoRpository;

        public function __construct() {
            $this->productoRpository = new ProductoRepository();
        }

        public function crearProducto($data){
            $producto = new Producto();
            $producto->nombre = $data['nombre'];
            $producto->descripcion = $data['descripcion'];
            $producto->tipo = $data['tipo'];
            $producto->precio = $data['precio'];
            $producto->imagen = $data['imagen'];
            return $this->productoRpository->crearProducto($producto);
        }

        public function actualizarProducto($data){
            $producto = new Producto();
            $producto ->idproducto = $data['idproducto'];
            $producto->nombre = $data['nombre'];
            $producto->descripcion = $data['descripcion'];
            $producto->tipo = $data['tipo'];
            $producto->precio = $data['precio'];
            $producto->imagen = $data['imagen'];
            return $this->productoRpository->actualizarProducto($producto);
        }

        public function borrarProducto($idproducto){
            return $this->productoRpository->borrarProducto($idproducto['id']);
        }

        public function obtenerProductos(){
            return $this->productoRpository->obtenerProductos();
        }

        public function obtenerProductosPorNombre($nombre){
            return $this->productoRpository->obtenerProductosPorNombre($nombre);
        }
        public function obtenerProductoPorId($id){
            return $this->productoRpository->obtenerProductoPorId($id['id']);
        }
    }

?>
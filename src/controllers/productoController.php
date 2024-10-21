<?php
    require_once '../repositories/productoRepository.php';

    class ProductoControlles {
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
            $producto->nombre = $data['nombre'];
            $producto->descripcion = $data['descripcion'];
            $producto->tipo = $data['tipo'];
            $producto->precio = $data['precio'];
            $producto->imagen = $data['imagen'];
            return $this->productoRpository->actualizarProducto($producto);
        }

        public function borrarProducto8($idproducto){
            return $this->productoRpository->borrarProducto($idproducto);
        }

        public function obtenerProductos(){
            return $this->productoRpository->obtenerProductos();
        }

        public function obtenerProductosPorNombre($nombre){
            return $this->productoRpository->obtenerProductosPorNombre($nombre);
        }
    }

?>
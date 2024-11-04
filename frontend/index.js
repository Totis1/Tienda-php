const apiUrl = 'http://localhost/tienda-php/src/index.php'
const productForm = document.getElementById('productForm')
const alertContainer = document.getElementById('alertContainer')
const productTableBody = document.getElementById('productTableBody')
const submitBtn = document.getElementById('submitBtn')

document.addEventListener('DOMContentLoaded', () => {
    loadProductos()
})

const borrarProducto = async (id) => {
    try {
      const send = {
        id: id
      }
      const res = await fetch(apiUrl + '/productos', {
        method: 'DELETE',
        body: JSON.stringify(send)
      })
      const borrado = await res.json()
      if (borrado && borrado.mensaje && borrado.mensaje === 'Producto Borrado')
      {
        loadProductos()
        showAlert('Producto Borrado','danger')
      }
      console.log('@@@ res => ', borrado)
    } catch (error) {
      console.error('Error: ', error)
    }
}

const getProducto = async (id) => {
    try {
        const send = {
          id: id
        }
        const res = await fetch(apiUrl + '/productos/detalle', {
          method: 'POST',
          body: JSON.stringify(send)
        })
        const producto = await res.json()
        if (producto) {
            document.getElementById('productId').value = producto.idproducto
            document.getElementById('nombre').value = producto.nombre
            document.getElementById('descripcion').value = producto.descripcion
            document.getElementById('tipo').value = producto.tipo
            document.getElementById('precio').value = producto.precio
            document.getElementById('imagen').value = producto.imagen
        }
        //console.log('@@@ res => ', borrado)
      } catch (error) {
        console.error('Error: ', error)
      }
}

const loadProductos = async() => {
    try{
        const res = await fetch(apiUrl + '/productos',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const productos = await res.json()
        productTableBody.innerHTML = ''
        productos.forEach((item) => {
            const row = document.createElement('tr')
            row.innerHTML = `
                <td>${item.idproducto}</td>
                <td>${item.nombre}</td>
                <td>${item.descripcion}</td>
                <td>${item.tipo}</td>
                <td>${item.precio}</td>
                <td><img src="${item.imagen}" alt="${item.nombre}" width="100"></td>
                <td>
                    <button class="btn btn-warning btn-sm" data_id="${item.idproducto}">Editar</button>
                    <button class="btn btn-danger btn-sm" data_id="${item.idproducto}">Borrar</button>
                </td>
                
                `
            productTableBody.appendChild(row)
        })
    } catch (error){
        console.log('Error ->',error)
    }
}

productTableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-danger')) {
        console.log("click",e.target.getAttribute('data_id'))
        borrarProducto(e.target.getAttribute('data_id'))
    }
    if (e.target.classList.contains('btn-warning')) {
        getProducto(e.target.getAttribute('data_id'));
    }
})

const crearProducto = async () => {
    const productId = document.getElementById('productId').value
    let producto 
    if(productId){
        producto = {
            idproducto: productId,
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            tipo: document.getElementById('tipo').value,
            precio: document.getElementById('precio').value,
            imagen: document.getElementById('imagen').value
        }
    } else {
        producto = {
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            tipo: document.getElementById('tipo').value,
            precio: document.getElementById('precio').value,
            imagen: document.getElementById('imagen').value
        }
    }
    
    const url = `${apiUrl}/productos`
    const method = productId ? 'PUT' : 'POST'

    const resultado = await fetch(url, {
        method: method,
        body: JSON.stringify(producto)
    })

    const response = await resultado.json()
    if (response.mensaje === 'Producto Creado'){
        showAlert('Producto Agregado', 'success')
        loadProductos()
        productForm.reset()
    } else if(response.mensaje === 'Producto Actualizado'){
        showAlert('Producto Actualizado', 'warning')
        loadProductos()
        productForm.reset()
    }else {
        showAlert('Error al agregar el producto', 'danger')
    }
    document.getElementById('productId').value = ''
    console.log('@@@ response ->',response)
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault()
    crearProducto()
    
})

submitBtn.addEventListener('submit', (event) => {
    event.preventDefault()
    crearProducto()
})

const showAlert = (mensaje, tipo) => {
    alertContainer.innerHTML = 
    `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close">
            </button>
        </div>
    `
    setTimeout(() => {
        alertContainer.innerHTML = ''
    }, 3000)
}
const fs = require('fs').promises
const path = require('fs').promises


class ProductManager {
    constructor() {
        this.products = []
        this.productIdCounter = 1
        this.path = "products.json"
    }

    async addProduct(product) {

        try {
            if (!product.title && !product.description && !product.price && !product.thumbnail && !product.code && !product.stock) {
                console.log("Todos los campos son obligatorios.")
                return
            }
    
            if (this.products.some(p => p.code === product.code)) {
                console.log("El código del producto ya existe.")
                return
            }
    
            product.id = this.productIdCounter++
            let products = await this.getProducts()
            products.push(product)
            await fs.writeFile(this.path, JSON.stringify(products, null, 2))
            console.log("producto creado correctamente")



            
            /* 
            product.id = this.productIdCounter++
            this.products.push(product)
            await fs.writeFile(this.path, JSON.stringify(products, null, 2))
            console.log("producto creado correctamente") */
        } catch (error) {
            console.error("Error al crear el producto", error)
        }
    }

    async getProducts(){
        try{
            const data = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        }catch(error){
            if(error.code === 'ENOENT'){
                return []
            }else{
                throw error
            }
        }
    }
    
    async getProductById(id){
        try{
            let productSougth = await fs.readFile(this.path, () =>{
                if(productSougth.id === id ){
                    console.log(productSougth)
                }else{
                    console.log("el producto no se encuentra")
                }
            })
            
        }catch (error)  {
                console.log("error al leer el archivo", error)
        }
    }
    


}

//crear producto nuevo
const manager = new ProductManager()

// Agregar productos
/* manager.addProduct({
    title: "Producto 1",
    description: "Descripción del Producto 1",
    price: 10,
    thumbnail: "thumbnail1.jpg",
    code: "001",
    stock: 100
})

manager.addProduct({
    title: "Producto 2",
    description: "Descripción del Producto 2",
    price: 10,
    thumbnail: "thumbnail1.jpg",
    code: "002",
    stock: 100
}) */

console.log(manager.getProductById(1))
class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct = (title, description, price, thumbnail, stock) => {

        if(!title || !description || !price || !thumbnail || !stock){
            console.log("Todos los campos son obligatorios");
        }else{
            const product = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                stock: stock,
                code: this.findMaxID() + 1,
            }
            this.products.push(product);
            console.log(this.products);
        }
    }
    

    findMaxID = () => {
        let maxId = 0
        this.products.map((product) => {
            if (product.code > maxId) maxId = product.code
        })
        return maxId
    }

    getProducts() {
        console.log(this.products);
        return this.products

    }

    getProductById = (productId) => {
        const searchedProduct = this.products.find(product => product.code === productId);

        if (searchedProduct) return searchedProduct;

        else console.log("Not found")
    }


}

const productManager = new ProductManager();

productManager.addProduct("test1", "Esto es prueba", 120, "Sin imagen", 10) //correcto
productManager.addProduct("test2", "Esto es prueba", 170, "Sin imagen", 5) //correcto
productManager.addProduct("test3", "Esto es prueba", 270, "Sin imagen", 57) //correcto
productManager.addProduct("test4", "Esto es prueba", 100, "Sin imagen", 7) //correcto
productManager.addProduct("testfallido", "Esto es prueba", 1210, "Sin imagen")    //falla porque falta 1 parámetro

productManager.getProductById(2)
productManager.getProductById(27)

productManager.getProducts();

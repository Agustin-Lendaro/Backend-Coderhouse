class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct = (title, description, price, thumbnail, stock, code) => {

        if(!title || !description || !price || !thumbnail || !stock|| !code){
            console.log("Todos los campos son obligatorios");
        }else if (this.products.find(item => item.code === code) !== undefined) {
            console.log("El código del producto está repedito");
        }else {
            const product = {
                Id: this.findMaxID() + 1,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                stock: stock,
                code: code,
            }
            this.products.push(product);
            console.log(this.products);
        }
    }
    

    findMaxID = () => {
        let maxId = 0
        this.products.map((product) => {
            if (product.Id > maxId) maxId = product.Id
        })
        return maxId
    }

    getProducts() {
        console.log(this.products);
        return this.products

    }

    getProductById = (productId) => {
        const searchedProduct = this.products.find(product => product.Id === productId);

        if (searchedProduct) return searchedProduct;

        else console.log("Not found")
    }


}

const productManager = new ProductManager();

productManager.addProduct("test1", "Esto es prueba", 120, "Sin imagen", 10, 1) //correcto
productManager.addProduct("test2", "Esto es prueba", 170, "Sin imagen", 5, 2) //correcto
productManager.addProduct("test3", "Esto es prueba", 270, "Sin imagen", 57, 3) //correcto
productManager.addProduct("test4", "Esto es prueba", 100, "Sin imagen", 7, 4) //correcto
productManager.addProduct("testfallido", "Esto es prueba", 1210, "Sin imagen")    //falla porque falta 1 parámetro
productManager.addProduct("testfallidocodigo", "Esto es prueba", 100, "Sin imagen", 7, 4) //falla por código repetido

productManager.getProductById(2)
productManager.getProductById(27)

productManager.getProducts();

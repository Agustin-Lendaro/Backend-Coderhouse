const fs = require('fs')

class ProductManager {
  constructor(filename) {
    this.path = filename
    fs.existsSync(this.filename) ? this.products = JSON.parse(fs.readFileSync(this.filename, 'utf-8')) : this.products = [];
  }

  addProduct = (title = "neededParameter", description = "neededParameter", price = "neededParameter", thumbnail = "neededParameter", code = "neededParameter", stock = "neededParameter") => {
    let product = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    }
 
    this.products.length === 0 ? product["id"] = 1 : product["id"] = this.products[this.products.length -1 ]["id"] + 1
    let duplicateCodes = this.products.some(product => product.code === code)

    if (duplicateCodes)
    console.error('Cannot add a product with a duplicate code.')
    else if (title == "neededParameter"|| description == "neededParameter"|| price == "neededParameter"|| thumbnail == "neededParameter"|| code == "neededParameter" || stock == "neededParameter"){
      console.error('A parameter is missing.')
    }
    else {
      this.products.push(product)
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
    }
  }

  getProducts = () => {
    console.log('Products array:')
    return this.products
  }

  getElementById = (id) => {
    let productId = this.products.find(product => product.id === id)
    console.log('The product by ID:', productId || 'Not found')
  }

  updateProduct(id, partToUpdate, newValue) {

    let index = this.products.findIndex(product => product.id === id)
    let approved = Object.keys(this.products[index]).some(product => product === partToUpdate)
    if (partToUpdate === 'id') {
      console.error('ID cannot be modified')
    } else if (!approved) {
      console.error('That key is not valid')
    } else {
      this.products[index][partToUpdate] = newValue;
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
    }
  }

  deleteProduct(id) {
    let findById = this.products.some(product => product.id === id)
    if (findById) {
      this.products = this.products.filter(product => product.id !== id)
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
      console.log('Product deleted')
    } else {
      console.error('Product not found')
    }
  }
}

const manager = new ProductManager('./Products.json')

console.log(manager.getProducts())
manager.addProduct('Test1', 'Probando1', 340, 'sin imagen', '1271', 10)
manager.addProduct('Test2', 'Probando2', 340, 'sin imagen', '127', 10)
manager.addProduct('Test3', 'Probando', 340, 'sin imagen', '127', 10) //código repeitdo
manager.addProduct('Test4', 'Probando', 340, 'sin imagen', '12713123', 10)
manager.addProduct('Test5', 'Probando', 340, 'sin imagen', '1223131237', 10)
console.log(manager.getProducts())
manager.getElementById(3)
manager.updateProduct(1, "price" ,300)
manager.updateProduct(1, "id" ,300) //no se puede cambiar id
console.log(manager.getProducts()) 
manager.deleteProduct(3)
manager.addProduct('Test5', 340, 'sin imagen', '1223131237', 10) //falla por falta de parametro
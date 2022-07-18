const samples = [
  {
    name: "test1",
    desc: "desc1",
    price: 99,
    amount: 22,
    img: "link",
  },
  {},
  {},
];
  
class Product {
  constructor(id, name, desc, price, img, amount = 1) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.amount = amount;
    this.img = img;
  }

  calculatePrice() {
    return this.price * this.amount;
  }
}

class Basket {
  constructor() {
    this.products = [];
  }

  clear() {
    this.products = [];
  }

  add(product) {
    this.products.push(product);
  }

  delete(id) {
    this.products = this.products.filter((product) => product.id !== id);
  }

  increase(id) {
    let product = this.products.find((product) => product.id === id);
    product.amount++;
  }

  decrease(id) {
    let product = this.products.find((product) => product.id === id);

    if (product.amount < 1) this.delete(product.id);

    product.amount--;
  }

  totalPrice() {
    return this.products.reduce((acc, curr) => curr.calculatePrice() + acc, 0);
  }
}

class User {
  constructor(name, email, password, logIn, balance = 0) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.logIn = logIn;
    this.balance = balance;
    this.creationDate = new Date();
    this.basket = new Basket();
  }

  deposit(amount) {
    this.balance += amount;
  }

  getPrice() {
    let price = this.basket.totalPrice();
    return price;
  }

  checkout() {
    let price = this.getPrice();
    if (this.balance < price) throw new Error("Not enough money!");
    this.balance -= price;
    this.basket.clear();
  }
}

class Authorization {
  signUp(user) {
    let userId = localStorage.getItem(user.logIn);

    if (userId !== null) throw new Error("User already exists");
    localStorage.setItem(user.logIn, JSON.stringify(user));
  }
}

const product1 = new Product("id1", "test1", "desc1", 100, "link1");
const product2 = new Product("id2", "test2", "desc2", 50, "link2");
// const products = [product1, product2];

const basket1 = new Basket();
basket1.add(product1);
basket1.add(product2);
// basket1.delete(product1.id);
// basket1.clear();
// basket1.increase(product2.id);
// basket1.decrease(product1.id);
// console.log(basket1.products);

const user1 = new User("name1", "email1", "password1", "logIn1");
// user1.basket.add(product1);
// user1.basket.add(product2);
// user1.deposit(500);
// user1.checkout();

console.log(user1);

const authorization1 = new Authorization();
authorization1.signUp(user1);
authorization1.signUp(user1);
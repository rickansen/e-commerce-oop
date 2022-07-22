const data = [
  {
    id: "id1",
    name: "test1",
    desc: "desc1",
    price: 99,
    img: "link",
  },
  {
    id: "id2",
    name: "test2",
    desc: "desc2",
    price: 123,
    img: "link",
  },
  {
    id: "id3",
    name: "test3",
    desc: "desc4",
    price: 54,
    img: "link",
  },
  {
    id: "id4",
    name: "test5",
    desc: "desc5",
    price: 23,
    img: "link",
  },
  {
    id: "id5",
    name: "test6",
    desc: "desc6",
    price: 654,
    img: "link",
  },
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
  constructor(name, email, username, password, balance = 0) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.username = username;
    this.balance = balance;
    this.creationDate = new Date();
    this.basket = new Basket();
    this.isLoggedIn = false;
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

  logOut() {
    this.isLoggedIn = false;
  }
}

class Authorization {
  signUp(name, email, username, password) {
    let user = localStorage.getItem(username);

    // if user exist
    if (user !== null) throw new Error("User already exists");
    user = new User(name, email, username, password);
    localStorage.setItem(username, JSON.stringify(user));
    return true;
  }
  /*

  localStorage = {
    John : user class,
    Marry: user
  }

  John => user class John



  */

  logIn(username, password) {
    const user = JSON.parse(localStorage.getItem(username));

    if (!user) throw new Error("User does not exist");
    if (password !== user.password) throw new Error("Wrong password");
    user.isLoggedIn = true;
    return true;
  }
}

// const product1 = new Product("id1", "test1", "desc1", 100, "link1");
// const product2 = new Product("id2", "test2", "desc2", 50, "link2");
// const products = [product1, product2];

// const basket1 = new Basket();
// basket1.add(product1);
// basket1.add(product2);
// basket1.delete(product1.id);
// basket1.clear();
// basket1.increase(product2.id);
// basket1.decrease(product1.id);
// console.log(basket1.products);

// const user1 = new User("name1", "email1", "password1", "logIn1");
// user1.basket.add(product1);
// user1.basket.add(product2);
// user1.deposit(500);
// user1.checkout();

// console.log(user1);

// const authorization1 = new Authorization();
// authorization1.signUp(user1);
// authorization1.signUp(user1);
//authorization1.logIn(user1.password, user1.logIn);
// console.log(authorization1.logIn(user1.password, user1.logIn));

class Store {
  constructor() {
    this.currentUser = null;
    this.products = null;
    this.auth = new Authorization();
  }

  //   <li>
  //   <div class="product-img"></div>
  //   <h2>Title1</h2>
  //   <p>Description1</p>
  //   <span>Price1</span>
  //   <button>Add to basket</button>
  //   </li>

  renderPage() {
    this.getData();

    document.querySelector("#main").innerHTML = `
    <h1 class="title">Best e-commerce ever</h1>
    <section>
      <ul class="products-list">
      </ul>
    </section>
    `;

    this.renderProducts();
    console.log("renderPage");
    document
      .querySelector("#login")
      .addEventListener("click", this.renderLoginPage);

    document
      .querySelector("#sign-up")
      .addEventListener("click", this.renderSignUpPage);
  }

  renderProducts() {
    const productsList = document.querySelector(".products-list");
    this.products.forEach(({ id, name, desc, price, img }) => {
      let li = document.createElement("li");
      li.innerHTML = `
      <div class="product-img"></div>
      <h2>${name}</h2>
      <p>${desc}</p>
      <span>${price}</span>
      <button>Add to basket</button>`;
      productsList.appendChild(li);
    });
  }

  renderLoginPage = () => {
    document.querySelector("#main").innerHTML = `
    <form>
    <label for="username">Username</label>
    <input type="text" id="username" name="username">
    <label for="password">Password</label>
    <input type="text" id="password" name="password">
    <button type="submit" id="submit">Login</button>
    </form>
    `;
    document
      .querySelector("#submit")
      .addEventListener("click", this.handleLogin);
  };

  handleLogin = (event) => {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    this.auth.logIn(username, password);
    this.renderPage();
  };

  renderSignUpPage = () => {
    document.querySelector("#main").innerHTML = `
    <form>
    <label for="name">Name</label>
    <input type="text" id="name" name="name">
    <label for="email">Email</label>
    <input type="text" id="email" name="email">
    <label for="username">Username</label>
    <input type="text" id="username" name="username">
    <label for="password">Password</label>
    <input type="text" id="password" name="password">
    <button type="submit" id="submit">Sign Up</button>
    </form>
    `;
    document
      .querySelector("#submit")
      .addEventListener("click", this.handleSignUp);
  };

  handleSignUp = (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const result = this.auth.signUp(name, email, username, password);

    if (!result) throw new Error();
    this.renderLoginPage();
  };

  getData() {
    if (this.products !== null) return;
    this.products = data.map(
      ({ id, name, desc, price, img }) =>
        new Product(id, name, desc, price, img)
    );
  }
}

class User1 {
  constructor(name, email) {
    this.name;
  }
}

class AuthorizedUser extends User1 {
  constructor() {
    super();
  }
}
let johnUser = new User1("John");
let MarryUser = new User1("Marry");

let newAuthUser = new AuthorizedUser();
console.log(newAuthUser);

new User("name");
new AuthorizedUser().name = new AuthorizedUser("name1");

const store1 = new Store();
store1.renderPage();
// console.log(store1);
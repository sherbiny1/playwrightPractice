let userName = "ahmed";
console.log(userName);
let age = 20;
console.log(age);
let isActive = true;
let numberArray = [2, 4, 6];
let data = "anything u can wright";
data = 30;
function add(a, b) {
    return a + b;
}
let user = { name: "ahmed", age: 20, location: "sdsds" };
user.location = "fsfsffs";
console.log(user);
class CartPage {
    page;
    cartProducts;
    checkOut;
    constructor(page) {
        this.page = page;
        this.cartProducts = this.page.locator("div li").first();
        this.checkOut = this.page.locator("text=Checkout");
    }
}
export {};

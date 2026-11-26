import {expect,type Locator,type Page} from "@playwright/test"

let userName:string="ahmed"
console.log(userName);
let age:number = 20
console.log(age);
let isActive:boolean=true
let numberArray:number[]=[2,4,6]
let data:any="anything u can wright"
data=30
function add(a:number, b:number):number {
  return a + b;
}

let user:{name:string,age:number,location:string}={name:"ahmed",age:20,location:"sdsds"}
user.location="fsfsffs"
console.log(user);

class CartPage {
    page:Page
    cartProducts:Locator
    checkOut:Locator
  constructor(page:any) {
    this.page = page;
    this.cartProducts = this.page.locator("div li").first();
    this.checkOut = this.page.locator("text=Checkout");
}}

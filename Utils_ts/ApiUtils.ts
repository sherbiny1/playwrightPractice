export default class ApiUtils {
  apiContext:any
  loginPayLoad:string
  constructor(apiContext:any, loginPayLoad:string) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }
  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayLoad },
    );
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    return token;
  }

  async createOrder(createOrderPayLoad:string) {
    let response = {token:String,orderID:String};
    response.token = await this.getToken();
    const createOrderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: createOrderPayLoad,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      },
    );
    const createOrderResponseJson = await createOrderResponse.json();
    const orderID = await createOrderResponseJson.orders[0];
    response.orderID = orderID;
    return response;
  }
}

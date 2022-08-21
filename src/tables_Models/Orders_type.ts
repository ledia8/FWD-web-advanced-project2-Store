type Orders={
    id?:string;
    productId:string;//[foreign key to product table]
    userId:string;//[foreign key to user table]
    productQuantity:number;
    status_of_order: string; //active ? complete;
}
export default Orders;
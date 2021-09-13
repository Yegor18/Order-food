import nextId from "react-id-generator";
export default class Restoreservice {
    _apiBase = 'http://localhost:3000';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok)
        {
            throw new Error(`Could not fetch ${url}`);
        }
        return await res.json();

    }
    

    async getMenuItems() {
        return await this.getResource('/menu/');
    }

    async setOrders(items) {
        const number = await this.getOrderNumber();
        // const request = new XMLHttpRequest();
        // request.open('POST', 'http://localhost:3000/menu');
        // request.setRequestHeader('Content-type','application/json');
        // let obj = {bd:[]};
        // const json = await JSON.stringify(obj);
        // return await request.send(json);

        // items.key = nextId();
        // let menu = this.getMenuItems();
        // fetch(`${this._apiBase}/menu/`,{
        //     method:"POST",
        //     body:JSON.stringify(items),
        //     headers: {
        //         'Content-type': 'application/json'
        //     }
        // }).then(responce => responce.json).then(res => console.log(res));

    }
    async getOrderNumber(){
        const res = await this.getResource('/orders/');
        const orderNumber = res.length+1;

        return orderNumber;
    }
}
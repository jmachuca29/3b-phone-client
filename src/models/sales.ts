export type IUser = {
  name: string;
  last_name: string;
  email: string;
  cellphone: string;
  ubigeo: string;
  address: string;
};

export type ICreateSale = {
  product: string;
  capacity: string;
  accesories: string[];
  serieNumber: string;
  imei_1: string;
  imei_2: string;
  paymentType: string;
  grade: string;
  user: IUser;
};

export class CreateSaleDTO {
  product: string;
  capacity: string;
  accesories: string[];
  serieNumber: string;
  imei_1: string;
  imei_2: string;
  paymentType: string;
  grade: string;
  user: IUser;
  constructor(data: ICreateSale) {
    this.product = data.product;
    this.capacity = data.capacity;
    this.accesories = data.accesories;
    this.serieNumber = data.serieNumber;
    this.imei_1 = data.imei_1;
    this.imei_2 = data.imei_2;
    this.paymentType = data.paymentType;
    this.grade = data.grade;
    this.user = data.user;
  }
}

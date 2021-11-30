export interface Orderproduct {
  Id: string;
  OrderId: string;
  ProductId: string;
  CompanyId: string;
  ProductName: string;
  UnitPrice: number;
  Quantity: number;
  SubTotal: number;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
};



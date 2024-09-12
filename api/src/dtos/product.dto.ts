export class CreateProductRequest {
  id: number;
  categoryId: number;
  categoryName: string;
  sku: string;
  name: string;
  description: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  image: string;
  price: number;
}

export class GetProductResponse {
  id: number;
  categoryId: number;
  categoryName: string;
  sku: string;
  name: string;
  description: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  image: string;
  price: number;
}

export class GetAllProductsResponse {
  data: GetProductResponse[];
  page: number;
  limit: number;
}

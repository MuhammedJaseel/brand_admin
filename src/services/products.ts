import { setBrands, setCategories, setProducts } from "../redux/store";
import { api } from "./config";

interface Brand {
  name: string;
  img: string;
  code: string;
}

interface Category {
  name: string;
  img: string;
  code: string;
}

interface Product {
  name: string;
  desc: string;
  img: string;
  price: string;
  sPrice: string;
  code: string;
  stock: string;
  category: string;
  brand: string;
}

export class BrandService {
  async load(p: number, s: string): Promise<any> {
    try {
      const res = await api.get(`api/admin/brands?page=${p}&search=${s}`);
      return setBrands({ ...res.data, busy: false });
    } catch (error) {}
  }

  async create(body: Brand) {
    const res = await api.post("api/admin/brands", body);
    return res.data;
  }

  async update(id: string, body: Brand) {
    const res = await api.put(`api/admin/brands/${id}`, body);
    return res.data;
  }
}

export class CategoryService {
  async load(p: number, s: string): Promise<any> {
    try {
      const res = await api.get(`api/admin/categories?page=${p}&search=${s}`);
      return setCategories({ ...res.data, busy: false });
    } catch (error) {}
  }

  async create(body: Category) {
    const res = await api.post("api/admin/categories", body);
    return res.data;
  }

  async update(id: string, body: Category) {
    const res = await api.put(`api/admin/categories/${id}`, body);
    return res.data;
  }
}

export class ProductService {
  async load(p: number, s: string): Promise<any> {
    try {
      const res = await api.get(`api/admin/products?page=${p}&search=${s}`);
      return setProducts({ ...res.data, busy: false });
    } catch (error) {}
  }

  async create(body: Product) {
    const res = await api.post("api/admin/products", body);
    return res.data;
  }

  async update(id: string, body: Product) {
    const res = await api.put(`api/admin/products/${id}`, body);
    return res.data;
  }
}

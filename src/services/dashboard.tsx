import {
  setAdmin,
  setStatistics,
  setCustomers,
  setProducts,
  setCategories,
  setBrands,
  setEnquires,
  setOrders,
  setPurchases,
  setTxns,
  setAdmins,
  setAppConf,
} from "../redux/store";
import { api } from "./config";

export async function loadAdmin(): Promise<any> {
  try {
    return setAdmin({ busy: false });
    const res = await api.get("api/admin/details");
    return setAdmin({ ...res.data, busy: false });
  } catch (error) {}
}
export async function loadStatistics(): Promise<any> {
  try {
    return;
    const res = await api.get("admin/statistics");
    return setStatistics(res.data);
  } catch (error) {}
}
export async function loadCustomers(p: number, s: string): Promise<any> {
  try {
    return setCustomers({ total: 0, page: 1, data: [], busy: false });
    const res = await api.get(`admin/customers?page=${p}&search=${s}`);
    return setCustomers({ ...res.data, busy: false });
  } catch (error) {}
}
export async function loadProducts(p: number, s: string): Promise<any> {
  try {
    return setProducts({ total: 0, page: 1, data: [], busy: false });
    const res = await api.get(`admin/products?page=${p}&search=${s}`);
    return setProducts({ ...res.data, busy: false });
  } catch (error) {}
}
export async function loadCategories(p: number, s: string): Promise<any> {
  try {
    return setCategories({ total: 0, page: 1, data: [], busy: false });
    const res = await api.get(`admin/categories?page=${p}&search=${s}`);
    return setCategories({ ...res.data, busy: false });
  } catch (error) {}
}
export async function loadBrands(p: number, s: string): Promise<any> {
  try {
    return setBrands({ total: 0, page: 1, data: [], busy: false });
    const res = await api.get(`admin/brands?page=${p}&search=${s}`);
    return setBrands({ ...res.data, busy: false });
  } catch (error) {}
}
export async function loadEnquires(p: number, s: string): Promise<any> {
  try {
    return setEnquires({ total: 0, page: 1, data: [], busy: false });
    const res = await api.get(`admin/enquires?page=${p}&search=${s}`);
    return setEnquires({ ...res.data, busy: false });
  } catch (error) {}
}
export async function loadOrders(p: number, s: string): Promise<any> {
  try {
    return setOrders({ total: 0, page: 1, data: [], busy: false });
    const res = await api.get(`admin/orders?page=${p}&search=${s}`);
    return setOrders({ ...res.data, busy: false });
  } catch (error) {}
}
export async function loadPurchases(p: number, s: string): Promise<any> {
  try {
    return setPurchases({ total: 0, page: 1, data: [], busy: false });
    const res = await api.get(`admin/purchases?page=${p}&search=${s}`);
    return setPurchases({ ...res.data, busy: false });
  } catch (error) {}
}
export async function loadTxns(p: number, s: string): Promise<any> {
  try {
    return setTxns({ total: 0, page: 1, data: [], busy: false });
    const res = await api.get(`admin/txns?page=${p}&search=${s}`);
    return setTxns({ ...res.data, busy: false });
  } catch (error) {}
}
export async function loadAdmins(p: number, s: string): Promise<any> {
  try {
    return setAdmins({ total: 0, page: 1, data: [], busy: false });
    const res = await api.get(`admin/admins?page=${p}&search=${s}`);
    return setAdmins({ ...res.data, busy: false });
  } catch (error) {}
}
export async function loadAppConf(): Promise<any> {
  try {
    return;
    const res = await api.get("api/appConf/details");
    return setAppConf(res.data);
  } catch (error) {}
}

//
//
//
export async function getWithdrawal(
  page_: number,
  status: string
): Promise<any> {
  const res = await api.get(
    `api/admin/withdrawal?page=${page_}&status=${status}`
  );
  const total = Number(res.headers["x-total"]);
  const page = Number(res.headers["x-page"]);
  return { total, page, data: res.data };
}

export async function aproveWithdraw(
  id: string,
  hash: string,
  note: string
): Promise<any> {
  const res = await api.patch(`api/admin/withdrawal/${id}/accept`, {
    hash,
    note,
  });
  return res.data;
}

export async function rejectWithdraw(id: string, note: string): Promise<any> {
  const res = await api.patch(`api/admin/withdrawal/${id}/reject`, {
    note,
  });
  return res.data;
}

export async function getRewardUsers(p: number, s: string): Promise<any> {
  const res = await api.get(`api/admin/rewards?page=${p}&search=${s}`);
  const total = Number(res.headers["x-total"]);
  const page = Number(res.headers["x-page"]);
  return { total, page, data: res.data };
}

export async function updateRewardBalance(): Promise<any> {
  const res = await api.get("api/admin/rewards/update-history");
  return res.data;
}

export async function getTxns(_p: number, _s: string): Promise<any> {
  const res = await api.get(`api/admin/txns?page=${_p}&search=${_s}`);
  const total = Number(res.headers["x-total"]);
  const page = Number(res.headers["x-page"]);
  return { total, page, data: res.data };
}

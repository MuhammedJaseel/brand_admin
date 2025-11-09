import {
  setAdmin,
  setStatistics,
  setCustomers,
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
    const res = await api.get("api/admin/statistics");
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

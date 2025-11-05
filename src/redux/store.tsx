import { configureStore, createSlice } from "@reduxjs/toolkit";

const settings = {
  chosen: 0,
};

const admin = {
  busy: true,
};

const statistics = {
  orders: { total: 0, last24h: 0, prev24h: 0 },
  customers: { total: 0, last24h: 0, prev24h: 0 },
  sales: { total: 0, last24h: 0, prev24h: 0 },
  visitors: { total: 0, last24h: 0, prev24h: 0 },
  enquires: { total: 0, last24h: 0, prev24h: 0 },
  products: { total: 0 },
  admins: { total: 0 },
  visits: { total: 0, last24h: 0, prev24h: 0 },
};

const list = {
  total: 0,
  page: 1,
  busy: true,
  data: [],
};

const appConf = {};

const appSlice = createSlice({
  name: "app",
  initialState: {
    settings: { ...settings },
  },
  reducers: {
    _setSettings: (state, action) => {
      const newValue = action.payload;
      state.settings = newValue;
    },
  },
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    admin: { ...admin },
    statistics: { ...statistics },
    customers: { ...list },
    products: { ...list },
    categories: { ...list },
    brands: { ...list },
    enquires: { ...list },
    orders: { ...list },
    purchases: { ...list },
    txns: { ...list },
    admins: { ...list },
    appConf: { ...appConf },
  },
  reducers: {
    _setAdmin: (state, action) => {
      const newValue = action.payload;
      state.admin = newValue;
    },
    _setStatistics: (state, action) => {
      const newValue = action.payload;
      state.statistics = newValue;
    },
    _setCustomers: (state, action) => {
      const newValue = action.payload;
      state.customers = newValue;
    },
    _setProducts: (state, action) => {
      const newValue = action.payload;
      state.products = newValue;
    },
    _setCategories: (state, action) => {
      const newValue = action.payload;
      state.categories = newValue;
    },
    _setBrands: (state, action) => {
      const newValue = action.payload;
      state.brands = newValue;
    },
    _setEnquires: (state, action) => {
      const newValue = action.payload;
      state.enquires = newValue;
    },
    _setOrders: (state, action) => {
      const newValue = action.payload;
      state.orders = newValue;
    },
    _setTxns: (state, action) => {
      const newValue = action.payload;
      state.txns = newValue;
    },
    _setPurchases: (state, action) => {
      const newValue = action.payload;
      state.purchases = newValue;
    },
    _setAdmins: (state, action) => {
      const newValue = action.payload;
      state.admins = newValue;
    },
    _setAppConf: (state, action) => {
      const newValue = action.payload;
      state.appConf = newValue;
    },
  },
});

const { _setSettings } = appSlice.actions;
const {
  _setAdmin,
  _setStatistics,
  _setCustomers,
  _setProducts,
  _setCategories,
  _setBrands,
  _setEnquires,
  _setOrders,
  _setPurchases,
  _setTxns,
  _setAdmins,
  _setAppConf,
} = dataSlice.actions;

export const store = configureStore({
  reducer: { app: appSlice.reducer, data: dataSlice.reducer },
});

export const setSettings = (v: any) => store.dispatch(_setSettings(v));

export const setAdmin = (v: any) => store.dispatch(_setAdmin(v));
export const setStatistics = (v: any) => store.dispatch(_setStatistics(v));
export const setCustomers = (v: any) => store.dispatch(_setCustomers(v));
export const setProducts = (v: any) => store.dispatch(_setProducts(v));
export const setCategories = (v: any) => store.dispatch(_setCategories(v));
export const setBrands = (v: any) => store.dispatch(_setBrands(v));
export const setEnquires = (v: any) => store.dispatch(_setEnquires(v));
export const setOrders = (v: any) => store.dispatch(_setOrders(v));
export const setPurchases = (v: any) => store.dispatch(_setPurchases(v));
export const setTxns = (v: any) => store.dispatch(_setTxns(v));
export const setAdmins = (v: any) => store.dispatch(_setAdmins(v));
export const setAppConf = (v: any) => store.dispatch(_setAppConf(v));

export const clearAllRedux = () => {
  setSettings({ ...settings });

  setAdmin({ ...admin });
  setStatistics({ ...statistics });
  setCustomers({ ...list });
  setProducts({ ...list });
  setCategories({ ...list });
  setBrands({ ...list });
  setEnquires({ ...list });
  setOrders({ ...list });
  setPurchases({ ...list });
  setTxns({ ...list });
  setAdmins({ ...list });
  setAppConf({ ...appConf });
};

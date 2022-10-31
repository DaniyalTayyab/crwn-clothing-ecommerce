import { createContext, useEffect, useReducer, useState } from "react";

import SHOP_DATA from "../utils/shopData.js";

const getCategoriesMap = () => {
  const categoryMap = SHOP_DATA.reduce((acc, categoryObj) => {
    const { title, items } = categoryObj;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CATEGORY_ACTION_TYPES = {
  SET_CATEGORY_MAP: "SET_CATEGORY_MAP",
};

const INITAL_STATE = {
  categoriesMap: {},
};

const categoryReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_ACTION_TYPES.SET_CATEGORY_MAP:
      return {
        ...state,
        categoriesMap: payload,
      };
    default:
      throw new Error(`Unhandled type of ${type} in category reducer`);
  }
};

export const CategoriesProvider = ({ children }) => {
  // const [categoriesMap, setCategoriesMap] = useState({});
  const [{ categoriesMap }, dispatch] = useReducer(
    categoryReducer,
    INITAL_STATE
  );

  const setCategoriesMap = () => {
    dispatch({
      type: CATEGORY_ACTION_TYPES.SET_CATEGORY_MAP,
      payload: getCategoriesMap(),
    });
  };

  useEffect(() => {
    setCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

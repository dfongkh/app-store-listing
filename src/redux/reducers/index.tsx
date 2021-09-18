import { combineReducers } from "redux";
// import { productsReducer, selectedProductsReducer } from "./productsReducer";
import { allListingsReducer } from "./listingReducer";

const reducers = combineReducers({
  allListings: allListingsReducer,
  // product: selectedProductsReducer,
});

export default reducers;

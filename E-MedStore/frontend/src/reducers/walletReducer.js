import {
  LOAD_BALANCE,
  LOAD_TRANSACTIONS,
  RECHARGE_WALLET,
} from "../constants/walletConstants";

export const wallet = (state = { balance: 0, transactions: [] }, action) => {
  switch (action.type) {
    case LOAD_BALANCE:
      return {
        ...state,
        balance: action.data,
      };
    case LOAD_TRANSACTIONS:
      return {
        ...state,
        transactions: [...action.data],
      };

    default:
      return state;
  }
};

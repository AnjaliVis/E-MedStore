import axios from "axios";
import {
  LOAD_BALANCE,
  LOAD_TRANSACTIONS,
  RECHARGE_WALLET,
} from "../constants/walletConstants";

export const getBalance = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log("userInfo.token", userInfo.token);

    const { data } = await axios.get(`/api/wallet/balance`, config);
    // console.log("DATA", data);
    dispatch({
      type: LOAD_BALANCE,
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const rechargeWallet = (amount) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log("userInfo.token", userInfo);

    const { data } = await axios.post(
      `/api/wallet/recharge`,
      {
        amount: amount,
      },
      config
    );

    console.log("Recharge", data);
    dispatch(getBalance());
  } catch (error) {
    console.log(error.message);
  }
};

export const getTransactions = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log("userInfo.token", userInfo.token);

    const { data } = await axios.get(`/api/wallet/transactions`, config);
    // console.log("DATA", data);
    dispatch({
      type: LOAD_TRANSACTIONS,
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

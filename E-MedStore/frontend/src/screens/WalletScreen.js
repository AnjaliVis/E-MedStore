import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/WalletScreen.css";
import {
  getBalance,
  getTransactions,
  rechargeWallet,
} from "../actions/walletActions";

import { Form, Button, Table } from 'react-bootstrap'

export default function Userwallet() {
  const balance = useSelector((state) => state.wallet.balance) || 0;
  const transactions = useSelector((state) => state.wallet.transactions);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  console.log("Transactions", transactions);
  const loadBalance = () => {
    dispatch(getBalance());
  };

  const onRecharge = (e) => {
    e.preventDefault();
    console.log("Working");
    dispatch(rechargeWallet(amount));
    setAmount(0);
  };

  const fetchTransactions = () => {
    dispatch(getTransactions());
  };

  useEffect(() => {
    loadBalance();
    fetchTransactions();
  }, [balance]);

  return (
    <>
      <h1>Your Wallet</h1>
      {/* <Form> */}
        <Form.Group>
          <Form.Label>Your balance : ₹{balance}</Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>Recharge wallet :</Form.Label>
          <Form.Control
            type='text'
            // className='input'
            id='amount'
            placeholder='Enter amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' varient='dark' onClick={onRecharge}>
          Add
        </Button>
      {/* </Form> */}
      <h1>Transaction History</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead> 
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction._id}</td>
              <td>₹{transaction.amount}</td>
              <td>{transaction.date}</td>
              {/* <td><Button>
              <i className='fas fa-trash'></i>
                </Button></td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

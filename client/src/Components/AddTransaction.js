import React, { useState } from "react";
import { Form, Input, Modal, Select, message } from "antd";
import axios from "axios";
import { Spinner } from "./Spinner";

export const AddTransaction = ({
  showTransactionModel,
  setShowTransactionModel,
  editItem,
  setEditItem,
  getTransactions,

}) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("Expense-tracker"));

      setLoading(true);

      if(editItem){
        await axios.post("/api/transactions/edit-transaction", {
         payload:{
          ...values,
          userid: user._id,
         },
          transactionId:editItem._id
        });
        getTransactions();
        message.success("Transaction Updated Successfully");

      }else{
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        getTransactions();
        message.success("Transaction Added Successfully");
      }
     
      setShowTransactionModel(false);
      setEditItem(null)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };
  return (
    <Modal
      title={editItem ?'Edit Transaction' : 'Add Transaction'}
      visible={showTransactionModel}
      onCancel={() => setShowTransactionModel(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form className="transaction-form" layout="vertical" onFinish={onFinish} initialValues = {editItem}>
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="Salary">Salary</Select.Option>
            <Select.Option value="Freelance">Freelance</Select.Option>
            <Select.Option value="Food">Food</Select.Option>
            <Select.Option value="Entertainment">Entertainment</Select.Option>
            <Select.Option value="Education">Education</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>
        <Form.Item label="refrence" name="reference">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
};

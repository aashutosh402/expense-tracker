import React, { useEffect, useState } from "react";
import { AddTransaction } from "../Components/AddTransaction";
import { DefaultLayout } from "../Components/DefaultLayout";
import { Spinner } from "../Components/Spinner";
import "../Resources/transaction.css";
import axios from "axios";
import moment from "moment";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { DatePicker, Form, message, Select, Table } from "antd";
import { Analytics } from "../Components/Analytics";
const { RangePicker } = DatePicker;

export const Home = () => {
  const [showTransaction, setShowTransaction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedRange, setSelectedRange] = useState([]);
  const [type, setType] = useState("all");
  const [viewType, setViewType] = useState("table");
  const [editItem,setEditItem] = useState(null)

  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("Expense-tracker"));

      setLoading(true);
      const response = await axios.post(
        "/api/transactions/get-all-transactions",
        {
          userid: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );
      console.log(response.data);
      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("not getting transaction data");
    }
  };

  const deleteTransactions = async (record) => {
    try {

      setLoading(true);
       await axios.post(
        "/api/transactions/delete-transaction",
        {
         transactionId:record._id
        }
      );
     
      message.success("Transaction deleted successfully")
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("not getting transaction data");
    }
  };
  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render:(text,record)=>{
        return <div >
          <EditOutlined className  = "mx-2" onClick ={()=>{
            setEditItem(record)
            setShowTransaction(true)
          }}/>
          <DeleteOutlined onClick = {()=>deleteTransactions(record)} className = 'mx-2 mt-1'/>
        </div>
      }
    }
  ];

  return (
    <>
      <DefaultLayout>
        {loading && <Spinner />}

        <div className="filter d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <div className="d-flex flex-column">
              <h6>Select Range</h6>

              <Select
                value={frequency}
                onChange={(value) => setFrequency(value)}
              >
                <Select.Option value="7">Last Week</Select.Option>
                <Select.Option value="30">Last 1 Month</Select.Option>
                <Select.Option value="365">Last 1 Year</Select.Option>
                <Select.Option value="custom">Custom</Select.Option>
              </Select>

              {frequency === "custom" && (
                <div className="mt-2">
                  <RangePicker
                    value={selectedRange}
                    onChange={(values) => setSelectedRange(values)}
                  />
                </div>
              )}
            </div>

            <div className="d-flex flex-column mx-5">
              <h6>Select Type</h6>

              <Select value={type} onChange={(value) => setType(value)}>
                <Select.Option value="all">all</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>

              {frequency === "custom" && (
                <div className="mt-2">
                  <RangePicker
                    value={selectedRange}
                    onChange={(values) => setSelectedRange(values)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="d-flex">
            <div>
              <div className="view-switch mx-5">
                <UnorderedListOutlined 
                onClick = {()=>setViewType("table")}
                className= {`${viewType ==="table"? `active-icon mx-1`:'inactive-icon mx-1'}`}/>
                <AreaChartOutlined
                onClick = {()=>setViewType("analytics")}
                className= {`${viewType ==="analytics"?`active-icon mx-1`:'inactive-icon mx-1'}`}/>
              </div>
            </div>

            <button
              className="primary"
              onClick={() => setShowTransaction(true)}
            >
              ADD NEW
            </button>
          </div>
        </div>

        <div className="table-analytics">
           {viewType ==="table"?<div className="table">
            <Table  columns={columns} dataSource={transactionsData} />
          </div> : <Analytics transactions = {transactionsData} />}

          {showTransaction && (
            <AddTransaction
              showTransactionModel={showTransaction}
              setShowTransactionModel={setShowTransaction}
              editItem = {editItem}
              getTransactions={getTransactions}
              setEditItem  = {setEditItem}
            />
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

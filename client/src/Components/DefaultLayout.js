import React from 'react'
import { Menu, Dropdown, Button, Space } from "antd";
import "../Resources/default-layout.css"
import { useNavigate } from 'react-router-dom';

export const DefaultLayout = (props) => {
const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("Expense-tracker"))

    const menu = (
        <Menu
          items={[
            {
              label: (
                <div onClick={()=>{
                  localStorage.removeItem('Expense-tracker')
                  navigate("/login");
                }}>Logout</div>
              ),
            }
          ]}
        />
      );

  return (
    <div className="layout">
    <div className="header d-flex justify-content-between align-items-center">
      <div>
        <h1 className="logo">EXPENSE TRACKER</h1>
      </div>
      <div>
        <Dropdown overlay={menu} placement="bottomLeft">
          <button className='primary'>{user.name}</button>
        </Dropdown>
      </div>
    </div>

    <div className="content">{props.children}</div>
  </div>
  )
}

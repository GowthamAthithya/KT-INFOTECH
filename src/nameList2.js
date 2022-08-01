import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Table, Button, Space } from 'antd';
import 'antd/dist/antd.css';


const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

const App = () => {
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  })
  const handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  const clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  let { sortedInfo, filteredInfo } = this.state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      ellipsis: true,
    },
  ];
  return (
    <>

      <div className="nav">
        <div className="logo">
          <Link to="/">Company Logo</Link>
        </div>
        <div className="signin-links">
          <Link to="/AdminLogin" className="signin-link">Admin</Link>
          <Link to="/login-Page" className="signin-link">SignIn</Link>
          <Link to="" className="signin-link">SignUp</Link>
        </div>

      </div>
      <div id="list-nav">
        <Link className="list-Nav-Btn" to="/nameList1">Name-List-1</Link>
        <Link className="list-Nav-Btn" to="/nameList2">Name-List-2</Link>
        <Link className="list-Nav-Btn"><li>Logout</li></Link>
      </div>

      <Space className='table-btn' style={{ marginBottom: 16 }}>
        <Button className='btn' onClick={setAgeSort}>Sort age</Button>
        <Button className='btn' onClick={clearFilters}>Clear filters</Button>
        <Button className='btn' onClick={clearAll}>Clear filters and sorters</Button>
        <Button className='btn'>Name List 2</Button>
      </Space>
      <Table className='table-list' columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );

}


export default App

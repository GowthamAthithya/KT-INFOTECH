import React from 'react'
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Table, Button, Space } from 'antd';



class App extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const data = this.props.data;
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
          <Link className="list-Nav-Btn" to="/"><li>Logout</li></Link>
        </div>

        <Space className='table-btn' style={{ marginBottom: 16 }}>
          <Button className='btn' onClick={this.setAgeSort}>Sort age</Button>
          <Button className='btn' onClick={this.clearFilters}>Clear filters</Button>
          <Button className='btn' onClick={this.clearAll}>Clear filters and sorters</Button>
          <Button className='btn'>Name List 1</Button>
        </Space>
        <Table className='table-list' columns={columns} dataSource={data} onChange={this.handleChange} />
      </>
    );
  }
}


export default App

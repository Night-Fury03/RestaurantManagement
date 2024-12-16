import React, { useEffect, useState } from 'react'
import Header from './shared/Header'
import { Table, DatePicker, Tag, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';


const { RangePicker } = DatePicker;

const columns = [
  {
    title: 'Mã Bill',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Bàn',
    dataIndex: 'tableName',
    key: 'tableName',
  },
  {
    title: 'Menu',
    dataIndex: 'menu',
    key: 'menu',
  },
  {
    title: 'Giảm giá',
    dataIndex: 'discount',
    key: 'discount',
  },
  {
    title: 'Tổng Giá ($)',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    sorter: (a, b) => a.totalPrice - b.totalPrice, // Sort by total price
  },
  {
    title: 'Ngày',
    dataIndex: 'dateCheckOut',
    key: 'dateCheckOut',
  },
];

export default function History() {
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [bills, setBills] = useState([])

  useEffect(() => {
    async function getBillApi() {
      let a = await axios.get("https://localhost:7215/Bill")
      setBills(a.data)
      console.log(a.data)
    }

    getBillApi()
  }, [])
  const handleDateFilter = (dates) => {
    if (dates) {
      const [start, end] = dates;
      const filtered = bills.filter((item) =>
        moment(item.dateCheckOut).isBetween(moment(start), moment(end), 'days', '[]')
      );
      setFilteredData(filtered);
      setDateRange(dates);
    } else {
      setFilteredData(bills);
      setDateRange(null);
    }
  };

  return (
    <div className='flex h-full'>
      {/* content */}
      <div className='flex flex-col flex-1 mx-4'>
        <Header title={'History'} />

        <div className='flex-1 p-4 scrollbar-none overflow-y-scroll'>
          <div className="flex mb-4 text-white justify-between items-center">
            <h2 className="text-xl font-semibold">Danh Sách Bills</h2>
            <RangePicker
              onChange={handleDateFilter}
              format="YYYY-MM-DD"
              placeholder={['Bắt đầu', 'Kết thúc']}
              value={dateRange}
            />
          </div>

          <Table
            columns={columns}
            dataSource={filteredData}
            bordered
            pagination={{ pageSize: 7 }}
          // scroll={{ y: "800px" }} 
          />
        </div>
      </div>


    </div>
  )
}

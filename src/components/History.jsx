import React, { useState } from 'react'
import Header from './shared/Header'
import { Table, DatePicker, Tag, Button } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const columns = [
  {
    title: 'Mã Bill',
    dataIndex: 'billId',
    key: 'billId',
  },
  {
    title: 'Bàn',
    dataIndex: 'table',
    key: 'table',
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
    dataIndex: 'date',
    key: 'date',
  },
];

const initialData = [
  {
    key: '1',
    billId: 'B001',
    table: '10',
    menu: 'Pizza, Coke',
    discount: 10,
    totalPrice: 25,
    date: '2023-12-01',
  },
  {
    key: '2',
    billId: 'B002',
    table: '111',
    menu: 'Burger, Fries, Sprite',
    discount: 10,
    totalPrice: 30,
    date: '2023-12-02',
  },
  {
    key: '3',
    billId: 'B003',
    table: '122',
    menu: 'Pasta, Water',
    discount: 10,
    totalPrice: 20,
    date: '2023-12-03',
  },
  {
    key: '4',
    billId: 'B004',
    table: '133',
    menu: 'Steak, Wine',
    discount: 10,
    totalPrice: 50,
    date: '2023-12-04',
  },
  {
    key: '5',
    billId: 'B005',
    table: '144',
    menu: 'Steak, Wine',
    discount: 10,
    totalPrice: 50,
    date: '2023-12-04',
  },
  {
    key: '6',
    billId: 'B006',
    table: '15',
    menu: 'Steak, Wine',
    discount: 10,
    totalPrice: 50,
    date: '2023-12-04',
  },
];

export default function History() {
  const [filteredData, setFilteredData] = useState(initialData);
  const [dateRange, setDateRange] = useState(null);


  const handleDateFilter = (dates) => {
    if (dates) {
      const [start, end] = dates;
      const filtered = initialData.filter((item) =>
        moment(item.date).isBetween(moment(start), moment(end), 'days', '[]')
      );
      setFilteredData(filtered);
      setDateRange(dates);
    } else {
      setFilteredData(initialData);
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

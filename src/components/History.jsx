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
    dataIndex: 'billInfos',
    key: 'menu',
    render: (billInfos) => (
      <div>
        {billInfos.map((item) => item.foodName).join(', ')}
      </div>
    ),
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
    render: (date) => {
      const formattedDate = moment(date).isValid() ? moment(date).format("YYYY-MM-DD") : "Invalid Date";
      return formattedDate;
    },
  },
];

export default function History() {
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [bills, setBills] = useState([])

  useEffect(() => {
    async function getBillApi() {
      try {
        let response = await axios.get("https://localhost:7215/Bill");
        // Chuyển đổi dữ liệu để đảm bảo đúng định dạng thời gian
        const formattedBills = response.data.map((bill) => ({
          ...bill,
          dateCheckOut: moment(bill.dateCheckOut), // Chuyển đổi sang moment
        }));
        setBills(formattedBills);
        setFilteredData(formattedBills); // Hiển thị tất cả dữ liệu ban đầu
        console.log(formattedBills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    }

    getBillApi();
  }, [])
  const handleDateFilter = (dates) => {
    if (dates) {
      const [start, end] = dates.map((date) => new Date(date).getTime()); // Chuyển sang timestamp
      const filtered = bills.filter((item) => {
        const itemDate = new Date(item.dateCheckOut).getTime(); // Chuyển `dateCheckOut` sang timestamp
        return itemDate >= start && itemDate <= end; // So sánh trực tiếp
      });
      console.log("Filtered Data:", filtered);
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

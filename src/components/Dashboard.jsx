import React, { useState } from 'react';
import Header from './shared/Header'
import LineChart from './shared/LineChart';
import { Dropdown, Menu, Table, DatePicker, Button } from 'antd';
import { DownloadOutlined, DownOutlined } from '@ant-design/icons';
import moment from 'moment';
import MostOrderedList from './shared/MostOrderedList';

const { RangePicker } = DatePicker;

const columns = [
  {
    title: 'Mã Bill',
    dataIndex: 'billId',
    key: 'billId',
  },
  {
    title: 'Menu',
    dataIndex: 'menu',
    key: 'menu',
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
    menu: 'Pizza, Coke',
    totalPrice: 25,
    date: '2023-12-01',
  },
  {
    key: '2',
    billId: 'B002',
    menu: 'Burger, Fries, Sprite',
    totalPrice: 30,
    date: '2023-12-02',
  },
  {
    key: '3',
    billId: 'B003',
    menu: 'Pasta, Water',
    totalPrice: 20,
    date: '2023-12-03',
  },
  {
    key: '4',
    billId: 'B004',
    menu: 'Steak, Wine',
    totalPrice: 50,
    date: '2023-12-04',
  },
  {
    key: '5',
    billId: 'B005',
    menu: 'Steak, Wine',
    totalPrice: 50,
    date: '2023-12-04',
  },
  {
    key: '6',
    billId: 'B006',
    menu: 'Steak, Wine',
    totalPrice: 50,
    date: '2023-12-04',
  },
];

export default function Dashboard() {
  const [filteredData, setFilteredData] = useState(initialData);
  const [dateRange, setDateRange] = useState(null);
  const textData = [1, 2, 3, 4, 5, 6, 7, 7, 77, 7, , 7, 7, 7, 77,]
  const [filter, setFilter] = useState('Tất cả')

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

  const mostOrderedFilter = (filterSetter) => (
    <Menu
      className='min-w-24'
      onClick={({ key }) => {
        filterSetter(key);
      }}
      items={[
        { key: 'Tất cả', label: 'Tất cả' },
        { key: 'Đồ ăn', label: 'Đồ ăn' },
        { key: 'Thức uống', label: 'Thức uống' },
      ]}
    />
  );

  return (
    <div className='flex h-full'>
      {/* content */}
      <div className='relative flex flex-col flex-1 ml-4'>
        <Header title={'Dashboard'} />

        <div className='absolute right-0 top-4'>
          <button class="relative flex items-center px-4 py-2 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group">
            <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span class="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4" >
              <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
            <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"><DownloadOutlined /> In báo cáo</span>
          </button>
        </div>


        <div className='flex flex-col flex-1 pt-6 gap-y-6 overflow-y-auto scrollbar-none'>
          <div className='rounded-lg bg-customDark1 p-4'>
            <LineChart />
          </div>

          <div className='flex-1 rounded-lg bg-customDark1 p-4'>
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
              pagination={{ pageSize: 5 }}
              scroll={{ y: "300px" }} // Enable dynamic scrolling
            />
          </div>
        </div>
      </div>

      {/* right sidebar */}
      <div className='flex flex-col w-4/12 p-6 gap-y-6 justify-center'>
        <div className='flex flex-col justify-between gap-y-4 p-4 bg-customDark1 rounded-lg h-[100%]'>

          <div className='flex justify-between items-center w-full pb-2 border-b border-customDarkLine'>
            <h1 className='text-white'>Bán chạy nhất</h1>
            <Dropdown overlay={mostOrderedFilter(setFilter)} trigger={['click']} placement="bottomRight">
              <Button className="border border-customDarkLine bg-customDark1 hover:!bg-transparent  text-white">
                {filter} <DownOutlined />
              </Button>
            </Dropdown>
          </div>

          <div className='flex-1 overflow-y-scroll scrollbar-none'>
            <MostOrderedList data={textData} />
          </div>

          <Button className='w-full text-customPrimary bg-transparent border border-customPrimary hover:!bg-transparent transition-all duration-300'>xem tất cả</Button>
        </div>

        {/* <div className='rounded-lg bg-customDark1'>
          <div className='flex justify-between items-center w-full border-b border-customDarkLine p-4'>
            <h1 className='text-white'>Tỷ lệ đơn hàng theo loại</h1>
            <DatePicker onChange={onChange} needConfirm />
          </div>

          <div className=''
            style={{ width: '200px', margin: '0 auto' }}
          >
            <PieChart />
          </div>
        </div> */}
      </div>
    </div>


  )
}


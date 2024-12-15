import React, { useEffect, useState } from 'react'
import Header from './shared/Header'
import ProductsList from './shared/ProductsList'
import ItemsList from './shared/ItemsList'
import { Dropdown, Menu, Tabs, Input, Button, Drawer, Form, Upload } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';


const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function Products() {
  const [products, setProducts] = useState([1, 2, 3, 4, 5, 6])
  const [foodFilter, setFoodFilter] = useState('Tất cả')
  const [drinkFilter, setDrinkFilter] = useState('Tất cả')
  const [foodCategories, setFoodCategories] = useState([])
  const [foodFilterSidebar, setFoodFilterSidebar] = useState('Tất cả')
  const [drinkFilterSidebar, setDrinkFilterSidebar] = useState('Tất cả')

  // State để quản lý Drawer
  const [drawerVisible, setDrawerVisible] = useState(false);


  useEffect(() => {
    // const agent = new https.Agent({ rejectUnauthorized: false });
    async function test() {
      let a = await axios.get("https://localhost:7215/food/categories")
      a = a.data;
      let foodCategories = [];
      a.forEach(element => {
        let item = {
          key: element.name,
          label: element.name
        }
        foodCategories.push(item);

      });
      setFoodCategories(foodCategories)
      console.log(a)
    }

    // fetch("https://localhost:7215/food/categories").then(response => response.json()).then(data => console.log(data));

    test()
    // return () => {};
  }, [])

  // Hàm mở Drawer
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  // Hàm đóng Drawer
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Hàm xử lý khi submit Form trong Drawer
  const onFinish = (values) => {
    console.log('Form Values:', values);
    // Có thể gửi dữ liệu lên server hoặc lưu vào state.
    setDrawerVisible(false); // Đóng Drawer sau khi submit
  };

  const drinkMenu = (filterSetter) => (
    <Menu
      className='min-w-24'
      onClick={({ key }) => {
        filterSetter(key);
      }}
      items={[
        { key: 'Tất cả', label: 'Tất cả' },
        { key: 'Nước giải khát', label: 'Nước giải khát' },
        { key: 'Nước ép', label: 'Nước ép' },
      ]}
    />
  );

  const foodMenu = (filterSetter) => (
    <Menu
      className='min-w-24'
      onClick={({ key }) => {
        filterSetter(key);
      }}
      items={foodCategories}
    />
  );

  return (
    <div className='flex h-full'>
      {/* content */}
      <div className='flex flex-col flex-1 mx-4'>
        <Header title={'Products'} showSearchBar={true} />

        <div className='flex-1 p-4 scrollbar-none overflow-y-scroll'>
          <div className='flex flex-row justify-between items-center pb-7'>
            <h1 className='text-white text-lg'>FOOD</h1>
            <Dropdown overlay={foodMenu(setFoodFilter)} trigger={['click']} placement="bottomRight">
              <Button className="border border-customPrimary hover:!bg-transparent bg-customDark1 text-customPrimary">
                {foodFilter} <DownOutlined />
              </Button>
            </Dropdown>
          </div>

          <div className='mx-4 mt-7'>
            <ProductsList data={products} />
          </div>
        </div>
      </div>
    </div>
  )
}

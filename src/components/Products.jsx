import React, { useState } from 'react'
import Header from './shared/Header'
import ProductsList from './shared/ProductsList'
import ItemsList from './shared/ItemsList'
import { Dropdown, Menu, Tabs, Input, Button, Drawer, Form, Upload } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';

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
  const [foodFilterSidebar, setFoodFilterSidebar] = useState('Tất cả')
  const [drinkFilterSidebar, setDrinkFilterSidebar] = useState('Tất cả')

  // State để quản lý Drawer
  const [drawerVisible, setDrawerVisible] = useState(false);

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
      items={[
        { key: 'Tất cả', label: 'Tất cả' },
        { key: 'Hải sản', label: 'Hải sản' },
        { key: 'Gỏi', label: 'Gỏi' },
        { key: 'Mì', label: 'Mì' },
        { key: 'Cơm', label: 'Cơm' },
      ]}
    />
  );

  return (
    <div className='flex h-full'>
      {/* content */}
      <div className='flex flex-col flex-1 mx-4'>
        <Header title={'Products'} showSearchBar={true} />

        <div className='flex-1 p-4 scrollbar-none overflow-y-scroll'>

          <div className='pt-4'>
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

          <div className='pt-4'>
            <div className='flex flex-row justify-between items-center pb-7'>
              <h1 className='text-white text-lg'>DRINKS</h1>
              <Dropdown overlay={drinkMenu(setDrinkFilter)} trigger={['click']} placement="bottomRight">
                <Button className="border border-customPrimary hover:!bg-transparent bg-customDark1 text-customPrimary">
                  {drinkFilter} <DownOutlined />
                </Button>
              </Dropdown>
            </div>

            <div className='mx-4 mt-7'>
              <ProductsList data={products} />
            </div>
          </div>
        </div>


      </div>

      {/* right sidebar */}
      <div className='flex flex-col w-4/12 p-6 bg-customDark1'>
        <div className='relative flex justify-between text-white gap-x-4'>
          <h1 className='text-white text-2xl'>Products Management</h1>
          <Button
            onClick={showDrawer} // Khi nhấn vào nút này, sẽ mở Drawer
            className="absolute top-0 right-0 z-10 border border-dashed border-customPrimary hover:!bg-transparent p-6 bg-customDark1 text-customPrimary "
          >
            <PlusOutlined />
          </Button>
        </div>

        <Tabs defaultActiveKey="1"
          className="flex-1"
        >
          <Tabs.TabPane tab="Food" key="1">
            <div className="flex flex-row justify-center items-center text-xs border-b border-customDarkLine pb-2">
              <span className="flex-1 text-white">Item</span>
              <div className="flex flex-row items-center space-x-4">
                <span className="text-white">Price</span>
                <Dropdown overlay={foodMenu(setFoodFilterSidebar)} trigger={['click']} placement="bottomRight">
                  <Button className="border border-customPrimary hover:!bg-transparent bg-customDark1 text-customPrimary">
                    {foodFilterSidebar} <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>
            <div className="flex-1">
              <ItemsList data={products} />
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Drink" key="2">
            <div className="flex flex-row justify-center items-center text-xs border-b border-customDarkLine pb-2">
              <span className="flex-1 text-white">Item</span>
              <div className="flex flex-row items-center space-x-4">
                <span className="text-white">Price</span>
                <Dropdown overlay={drinkMenu(setDrinkFilterSidebar)} trigger={['click']} placement="bottomRight">
                  <Button className="border border-customPrimary hover:!bg-transparent bg-customDark1 text-customPrimary">
                    {drinkFilterSidebar} <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>
            <div className="flex-1">
              <ItemsList data={products} />
            </div>
          </Tabs.TabPane>
        </Tabs>


      </div>

      {/* Drawer để thêm món ăn mới */}
      <Drawer
        title="Thêm món ăn mới"
        placement="right"
        onClose={closeDrawer}
        visible={drawerVisible}
        width={400}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tên món ăn"
            name="foodName"
            rules={[{ required: true, message: 'Vui lòng nhập tên món ăn!' }]}
          >
            <Input placeholder="Nhập tên món ăn" />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <Input placeholder="Nhập giá" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Mô tả món ăn" rows={4} />
          </Form.Item>
          <Form.Item label="Hình ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  border: 0,
                  background: 'none',
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm món
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

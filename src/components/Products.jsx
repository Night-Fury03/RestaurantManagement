import React, { useEffect, useState } from 'react'
import Header from './shared/Header'
import ProductsList from './shared/ProductsList'
import { Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([])
  const [foodFilter, setFoodFilter] = useState('Tất cả')
  const [foodCategories, setFoodCategories] = useState([])

  useEffect(() => {
    async function getCategoriesApi() {
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
    }

    async function getFoodApi() {
      let a = await axios.get("https://localhost:7215/food")
      setProducts(a.data)
      console.log(a.data)
    }

    getCategoriesApi()
    getFoodApi()
  }, [])

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

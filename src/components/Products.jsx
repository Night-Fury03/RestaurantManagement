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
  const [filteredProducts, setFilteredProducts] = useState([]); // Danh sách đã lọc
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function getCategoriesApi() {
      let response = await axios.get("https://localhost:7215/food/categories");
      const categories = response.data.map((category) => ({
        key: category.name,
        label: category.name,
      }));
      setFoodCategories([{ key: 'Tất cả', label: 'Tất cả' }, ...categories]); // Thêm "Tất cả"
    }

    async function getFoodApi() {
      let response = await axios.get("https://localhost:7215/food")
      setProducts(response.data)
      setFilteredProducts(response.data);
    }

    getCategoriesApi()
    getFoodApi()
  }, [])

  // Cập nhật danh sách sản phẩm khi thay đổi bộ lọc
  useEffect(() => {
    // Lọc sản phẩm theo danh mục và tìm kiếm
    let filtered = products;

    if (foodFilter !== 'Tất cả') {
      filtered = filtered.filter((product) => product.categoryName === foodFilter);
    }

    if (searchText) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [foodFilter, searchText, products]);

  const foodMenu = (
    <Menu
      className='min-w-24'
      onClick={({ key }) => setFoodFilter(key)} // Cập nhật bộ lọc
      items={foodCategories}
    />
  );

  const handleSearch = (value) => {
    setSearchText(value); // Cập nhật giá trị tìm kiếm
  };


  return (
    <div className='flex h-full'>
      {/* content */}
      <div className='flex flex-col flex-1 mx-4'>
        <Header title={'Products'} showSearchBar={true} onSearch={handleSearch} />

        <div className='flex-1 p-4 scrollbar-none overflow-y-scroll'>
          <div className='flex flex-row justify-between items-center pb-7'>
            <h1 className='text-white text-lg'>FOOD</h1>
            <Dropdown overlay={foodMenu} trigger={['click']} placement="bottomRight">
              <Button className="border border-customPrimary hover:!bg-transparent bg-customDark1 text-customPrimary">
                {foodFilter} <DownOutlined />
              </Button>
            </Dropdown>
          </div>

          <div className='mx-4 mt-7'>
            <ProductsList data={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import Header from './shared/Header'
import backgroundImage from '../assets/img/CanhCa.jpg'
import { Modal, Table, Tabs, Input, Button, Form, Popconfirm } from 'antd';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ItemsList from './shared/ItemsList';
import axios from 'axios';
import TablesList from './shared/TablesList';

export default function Setting() {
    const [typeBtn, setTypeBtn] = useState(null)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [accList, setAccList] = useState([])
    const [tables, setTables] = useState([])

    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        async function getFoodCategories() {
            let a = await axios.get("https://localhost:7215/food/categories")
            setCategories(a.data)
        }
        async function getAcc() {
            let a = await axios.get("https://localhost:7215/Account/type/0")
            setAccList(a.data)
        }
        async function getFoodApi() {
            let a = await axios.get("https://localhost:7215/food")
            setProducts(a.data)
        }
        async function getTableFoodApi() {
            let a = await axios.get("https://localhost:7215/TableFood")
            setTables(a.data)
        }
        getFoodCategories()
        getAcc()
        getFoodApi()
        getTableFoodApi()
    }, [])

    const showModal = (type) => {
        setTypeBtn(type)
        setModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                console.log('Form values:', values);
                setModalVisible(false);
                form.resetFields();
            })
            .catch(error => {
                console.error('Validation failed:', error);
            });
    };

    const handleCancel = () => {
        setModalVisible(false);
        form.resetFields();
    };

    const onFinish = (values) => {
        console.log("Form Values:", values);
        // Có thể gửi dữ liệu lên server hoặc lưu vào state.
    };
    return (
        <div className="flex h-full">
            {/* content */}
            <div className="flex flex-col flex-1 mx-4 mt-4">
                <Header title={"Settings"} />

                <Tabs tabPosition="left" defaultActiveKey="1" type="card" className="custom-tabs flex-1 py-4 gap-x-4" >
                    <Tabs.TabPane tab="Thông tin cá nhân" key="1" className='h-full pr-4 flex flex-col gap-y-6'>
                        <h1 className='text-white text-2xl font-semibold pt-4'>Thông tin tài khoản</h1>

                        <div className='flex-1 flex flex-row'>
                            <div className='flex-1 flex flex-col gap-y-4 justify-center'>
                                <div className='flex justify-between p-4 border-b border-customDarkLine text-white'>
                                    <p className='text-lg'>Tên tài khoản:</p>
                                    <p className='font-thin'>Dat</p>
                                </div>
                                <div className='flex justify-between p-4 border-b border-customDarkLine text-white'>
                                    <p className='text-lg'>Tên người dùng:</p>
                                    <p className='font-thin'>Đạt 1 phít</p>
                                </div>
                                <div className='flex justify-between p-4 border-b border-customDarkLine text-white'>
                                    <p className='text-lg'>Quyền:</p>
                                    <p className='font-thin'>admin</p>
                                </div>
                            </div>
                            <div className='flex-1 flex items-center justify-center'>
                                <div className='rounded-full bg-cover bg-center'
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        backgroundImage: `url(${backgroundImage})`,
                                    }}>
                                </div>
                            </div>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Quản lí tài khoản" key="2" className='h-full pr-4 flex flex-col gap-y-6'>
                        <h1 className='text-white text-2xl font-semibold pt-4'>Danh sách tài khoản</h1>

                        <Table
                            columns={[
                                { title: 'Tên tài khoản', dataIndex: 'userName', key: 'userName' },
                                { title: 'Tên đại diện', dataIndex: 'displayName', key: 'displayName' },
                                { title: 'Mật khẩu', dataIndex: 'passWord', key: 'passWord' },
                            ]}
                            dataSource={accList}
                            bordered
                            pagination={{ pageSize: 5 }}
                            scroll={{ y: "300px" }} // Enable dynamic scrolling
                        />

                        <div className='flex justify-end items-center mb-2'>
                            <Button onClick={() => showModal("addAccount")} className='transition-all bg-red-400 text-white h-[50px] rounded-lg border-red-500 border-b-[4px] hover:!bg-red-400 hover:!border-red-500 hover:!text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'>
                                Thêm tài khoản mới
                            </Button>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Quản lí thực đơn" key="3" className='h-full pr-4 flex flex-col gap-y-6'>
                        <div className='flex justify-between items-center mt-2 pr-4'>
                            <h1 className='text-white text-2xl font-semibold'>Products Management</h1>
                            <div class="relative group rounded-lg w-56 overflow-hidden">
                                <svg
                                    y="0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0"
                                    width="100"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="xMidYMid meet"
                                    height="100"
                                    class="w-8 h-8 absolute right-0 -rotate-90 stroke-customPrimary top-1.5 group-hover:rotate-0 duration-300"
                                >
                                    <path
                                        stroke-width="5"
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                        fill="none"
                                        d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                                        class="svg-stroke-primary"
                                    ></path>
                                </svg>
                                <select
                                    class="appearance-none relative text-customPrimary bg-transparent ring-0 outline-none border border-customPrimary text-sm font-bold rounded-lg block w-full p-2.5"
                                >
                                    {
                                        categories.map((item) => (
                                            <option key={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <ItemsList data={products} />

                        <div className='flex justify-end items-center mb-2'>
                            <Button onClick={() => showModal("editCategory")} className='transition-all bg-red-400 text-white h-[50px] rounded-lg border-red-500 border-b-[4px] hover:!bg-red-400 hover:!border-red-500 hover:!text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'>
                                Tùy chỉnh phân loại
                            </Button>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Quản lí bàn" key="4" className='h-full pr-4 flex flex-col gap-y-6'>
                        <div className='flex justify-between items-center mt-2 pr-4'>
                            <h1 className='text-white text-2xl font-semibold'>Quản lý bàn</h1>
                        </div>

                        <TablesList data={tables} />
                    </Tabs.TabPane>
                </Tabs>
            </div>
            <Modal
                title={typeBtn === "editCategory" ? "Tùy chỉnh phân loại" : "Thêm tài khoản mới"}
                onOk={handleOk}
                onCancel={handleCancel}
                open={modalVisible}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                {
                    typeBtn === "editCategory" ? (
                        <div>
                            <h3>Danh sách phân loại:</h3>
                            <div className="flex flex-col gap-y-2 max-h-[400px] scrollbar-none overflow-y-scroll">
                                {
                                    categories.map((category, index) => (
                                        <div key={index} className="flex justify-between items-center border-b border-gray-300 py-2">
                                            <span>{category.name}</span>
                                            <Popconfirm
                                                title="Bạn có chắc muốn xóa danh mục này không?"
                                                okText="Xác nhận"
                                                cancelText="Hủy"
                                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                            >
                                                <Button type="text" danger icon={<DeleteOutlined />} />
                                            </Popconfirm>
                                        </div>
                                    ))
                                }
                            </div>

                            <Form layout="inline" className="mt-4" onFinish={onFinish}>
                                <Form.Item
                                    name="newCategory"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                                >
                                    <Input placeholder="Nhập danh mục mới" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Thêm danh mục
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    ) : (
                        <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                label="Tên tài khoản"
                                name="userName"
                                rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
                            >
                                <Input placeholder="Nhập tên tài khoản" />
                            </Form.Item>
                            <Form.Item
                                label="Tên đại diện"
                                name="displayName"
                                rules={[{ required: true, message: 'Vui lòng nhập tên đại diện!' }]}
                            >
                                <Input placeholder="Nhập tên đại diện" />
                            </Form.Item>
                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                            >
                                <Input placeholder="Nhập mật khẩu" />
                            </Form.Item>
                        </Form>
                    )
                }
            </Modal>
        </div>
    )
}

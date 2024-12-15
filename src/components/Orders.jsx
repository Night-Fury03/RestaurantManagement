import React, { useEffect, useState } from 'react'
import Header from './shared/Header'
import { Modal, Form, Select, Button, InputNumber, Table as AntTable } from 'antd';
import clsx from 'clsx';
import axios from 'axios';


const { Option } = Select;

const orders = [
    {
        id: 1,
        name: "10",
        dateCheckIn: "11:20",
        discount: 2,
        status: "Đang hoạt động",
        totalPrice: 200,
        dishes: [
            { name: "Cơm gà", quantity: 2, price: 100000 },
            { name: "Cơm chien", quantity: 1, price: 300000 },
        ],
    },
    {
        id: 2,
        name: "11",
        dateCheckIn: "11:20",
        discount: 0,
        status: "Chưa hoạt động",
        totalPrice: 0,
        dishes: [],
    },
    {
        id: 3,
        name: "12",
        dateCheckIn: "11:20",
        discount: 2,
        status: "Đang hoạt động",
        totalPrice: 200,
        dishes: [{ name: "Cơm gà", quantity: 2, price: 100000 }],
    },
    {
        id: 4,
        name: "13",
        dateCheckIn: "11:20",
        discount: 2,
        status: "Chờ thanh toán",
        totalPrice: 200,
        dishes: [{ name: "Cơm gà", quantity: 2, price: 100000 }],
    },
    {
        id: 5,
        name: "14",
        dateCheckIn: "11:20",
        discount: 2,
        status: "Chưa hoạt động",
        totalPrice: 200,
        dishes: [{ name: "Cơm gà", quantity: 2, price: 100000 }],
    },
    {
        id: 6,
        name: "15",
        dateCheckIn: "11:20",
        discount: 2,
        status: "Chờ thanh toán",
        totalPrice: 200,
        dishes: [{ name: "Cơm gà", quantity: 2, price: 100000 }],
    },
    {
        id: 7,
        name: "16",
        dateCheckIn: "11:20",
        discount: 2,
        status: "Chờ thanh toán",
        totalPrice: 200,
        dishes: [{ name: "Cơm gà", quantity: 2, price: 100000 }],
    },
    {
        id: 8,
        name: "17",
        dateCheckIn: "11:20",
        discount: 2,
        status: "Chờ thanh toán",
        totalPrice: 200,
        dishes: [{ name: "Cơm gà", quantity: 2, price: 100000 }],
    },
];

const dishesList = [
    { id: 1, name: "Cơm gà", quantity: 1, price: 50000 },
    { id: 2, name: "Phở bò", quantity: 2, price: 40000 },
    { id: 3, name: "Bún chả", quantity: 3, price: 45000 },
    { id: 4, name: "Trà sữa", quantity: 4, price: 30000 },
];

export default function Orders() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const [currentTable, setCurrentTable] = useState(null); // Thông tin bàn được chọn
    const [tables, setTables] = useState([])

    const [form] = Form.useForm();

    useEffect(() => {
        async function test() {
            let a = await axios.get("https://localhost:7215/TableFood")
            setTables(a.data)
            console.log(a.data)
        }

        test()
    }, [])

    const showModal = (table) => {
        setCurrentTable(table); // Lưu thông tin bàn đang được chọn
        if (table.status === 'Chưa hoạt động') {
            setIsModalOpen(true);
            setTotal(0)
        } else {
            const totalAmount = table.dishes.reduce((sum, item) => sum + (item.quantity * item.price), 0);
            setTotal(totalAmount);
        }
    };

    const showModalEdit = (table) => {
        setCurrentTable(table); // Lưu thông tin bàn đang được chọn
        if (table.status === "Chưa hoạt động") {
            setIsModalOpen(false);
        } else {
            setIsModalOpen(true);
        }
    };

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                console.log("Form values:", values);
                setIsModalOpen(false);
                form.resetFields();
            })
            .catch((error) => {
                console.error("Validation failed:", error);
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <div className="flex h-full">
            {/* content */}
            <div className="flex flex-col flex-1 mx-4">
                <Header title={"Orders"} />

                {/* <div className='flex-1 flex flex-wrap p-4 gap-y-8 scrollbar-none overflow-y-scroll'>
                    {
                        orders.map((order, index) => (
                            <OrdersList key={index} data={order} />
                        ))
                    }

                </div> */}

                <div className='flex-1 flex flex-wrap p-4 gap-4 scrollbar-none overflow-y-scroll'>
                    {
                        orders.length === 0 ?
                            <div className='flex-1 content-center'>
                                <h1 className='text-neutral-600 text-xl text-center'>Chưa có bàn nào</h1>
                            </div>
                            :
                            orders.map((table, index) => (
                                <div key={index} onClick={() => showModal(table)} class='flex flex-col items-center justify-center min-w-56 p-4 bg-white gap-y-2 rounded transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] hover:scale-105 cursor-pointer'>
                                    <div className='flex-1 pb-2 flex justify-center items-center w-full border-b border-customDarkLine '>
                                        <h1>{table.name}</h1>
                                    </div>
                                    <div className='flex justify-between text-xs w-full gap-x-2 '>
                                        <span>11:59</span>
                                        <span className={clsx(
                                            table.status === 'Đang hoạt động' ? 'text-customGreen' : table.status === 'Chờ thanh toán' ? 'text-customOrange' : 'text-neutral-400'
                                        )}>{table.status}</span>
                                    </div>
                                </div>
                            ))
                    }

                </div>

                <div className='flex flex-col p-4 gap-y-4 bg-customDark1'>
                    {/* detail */}
                    <div className='flex gap-x-8'>
                        <div className='flex-1 flex flex-col gap-y-4'>
                            <span className='flex text-white gap-x-8'>
                                <p className='text-sm text-neutral-300 '>Tên bàn:</p>
                                <p>{currentTable?.name || ''}</p>
                            </span>
                            <span className='flex text-white gap-x-8'>
                                <p className='text-sm text-neutral-300 '>Thời gian bắt đầu: </p>
                                <p>{currentTable?.status === 'Chưa hoạt động' ? 'Chưa hoạt động' : currentTable?.dateCheckIn || ''}</p>
                            </span>
                        </div>
                        <div className='flex-1 flex flex-col gap-y-4'>
                            <span className='flex text-white justify-between'>
                                <p className='text-sm text-neutral-300 '>Tổng thành tiền:</p>
                                <p className='text-sm text-green-500'>{total}</p>
                            </span>
                            <span className='flex text-white justify-between'>
                                <p className='text-sm text-neutral-300 '>Giảm giá: </p>
                                <p className='text-sm'>{currentTable?.discount || 0}</p>
                            </span>
                            <span className='flex text-white justify-between'>
                                <p className='text-sm text-neutral-300 '>Tổng cộng:</p>
                                <p className='text-lg text-red-500'>{currentTable?.totalPrice || 0}</p>
                            </span>
                        </div>
                    </div>


                    <div className='flex gap-x-8 justify-end'>
                        <Button onClick={() => showModalEdit(currentTable)} className='transition-all bg-blue-500 text-white px-6 py-3 h-[50px] rounded-lg border-blue-600 border-b-[4px] hover:!bg-blue-500 hover:!border-blue-600 hover:!text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'>
                            Chỉnh sửa
                        </Button>
                        <Button className='transition-all bg-yellow-500 text-white px-6 py-3 h-[50px] rounded-lg border-yellow-600 border-b-[4px] hover:!bg-yellow-500 hover:!border-yellow-600 hover:!text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'>
                            Tạm tính
                        </Button>
                        <Button className='transition-all bg-red-500 text-white px-6 py-3 h-[50px] rounded-lg border-red-600 border-b-[4px] hover:!bg-red-500 hover:!border-red-600 hover:!text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'>
                            Thanh toán
                        </Button>
                    </div>

                    <div className="flex flex-col p-4 gap-y-4 bg-customDark1">
                        {/* detail */}
                        <div className="flex gap-x-8">
                            <div className="flex-1 flex flex-col gap-y-4">
                                <span className="flex text-white gap-x-8">
                                    <p className="text-sm text-neutral-300 ">Tên bàn:</p>
                                    <p>{currentTable?.name || ""}</p>
                                </span>
                                <span className="flex text-white gap-x-8">
                                    <p className="text-sm text-neutral-300 ">Thời gian bắt đầu: </p>
                                    <p>
                                        {currentTable?.status === "Chưa hoạt động"
                                            ? "Chưa hoạt động"
                                            : currentTable?.dateCheckIn || ""}
                                    </p>
                                </span>
                            </div>
                            <div className="flex-1 flex flex-col gap-y-4">
                                <span className="flex text-white justify-between">
                                    <p className="text-sm text-neutral-300 ">Tổng thành tiền:</p>
                                    <p className="text-sm text-green-500">{total}</p>
                                </span>
                                <span className="flex text-white justify-between">
                                    <p className="text-sm text-neutral-300 ">Giảm giá: </p>
                                    <p className="text-sm">{currentTable?.discount || 0}</p>
                                </span>
                                <span className="flex text-white justify-between">
                                    <p className="text-sm text-neutral-300 ">Tổng cộng:</p>
                                    <p className="text-lg text-red-500">
                                        {currentTable?.totalPrice || 0}
                                    </p>
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-x-8 justify-end">
                            <Button
                                onClick={() => showModalEdit(currentTable)}
                                className="transition-all bg-blue-500 text-white px-6 py-3 h-[50px] rounded-lg border-blue-600 border-b-[4px] hover:!bg-blue-500 hover:!border-blue-600 hover:!text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                            >
                                Chỉnh sửa
                            </Button>
                            <Button className="transition-all bg-yellow-500 text-white px-6 py-3 h-[50px] rounded-lg border-yellow-600 border-b-[4px] hover:!bg-yellow-500 hover:!border-yellow-600 hover:!text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                                Tạm tính
                            </Button>
                            <Button className="transition-all bg-red-500 text-white px-6 py-3 h-[50px] rounded-lg border-red-600 border-b-[4px] hover:!bg-red-500 hover:!border-red-600 hover:!text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
                {/* right sidebar */}
                <div className="flex flex-col w-4/12 p-6 bg-customDark1">
                    <div className="flex justify-between">
                        <h1 className="text-white text-2xl mb-4">Món đã đặt</h1>
                        <h1 className="text-white text-2xl mb-4">{`Bàn ${currentTable?.name || ""
                            }`}</h1>
                    </div>
                    <AntTable
                        dataSource={currentTable?.dishes || []}
                        columns={[
                            { title: "Tên món", dataIndex: "name", key: "name" },
                            { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
                            {
                                title: "Giá",
                                dataIndex: "price",
                                key: "price",
                                render: (text) => `${text} đ`,
                            },
                        ]}
                        pagination={false}
                        rowKey="name"
                    />
                </div>

                {/* modal bắt đầu 1 order */}
                {currentTable && (
                    <Modal
                        title={`Bàn ${currentTable.name} - ${currentTable.status}`}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText="Bắt đầu order"
                    >
                        {currentTable.status !== "Chưa hoạt động" ? (
                            <div>
                                <h3>Món đã đặt:</h3>
                                <AntTable
                                    dataSource={currentTable.dishes || []}
                                    columns={[
                                        { title: "Tên món", dataIndex: "name", key: "name" },
                                        { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
                                        {
                                            title: "Giá",
                                            dataIndex: "price",
                                            key: "price",
                                            render: (text) => `${text} đ`,
                                        },
                                    ]}
                                    pagination={false}
                                    rowKey="name"
                                />
                                <h3 className="mt-4">Thêm món mới:</h3>
                            </div>
                        ) : (
                            <h3>Tạo order mới:</h3>
                        )}
                        {/* Form thêm nhiều món */}
                        <Form form={form} layout="vertical">
                            <Form.List name="dishes">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <div key={key} className="flex items-center gap-x-4">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "name"]}
                                                    fieldKey={[fieldKey, "name"]}
                                                    rules={[
                                                        { required: true, message: "Vui lòng chọn món!" },
                                                    ]}
                                                >
                                                    <Select placeholder="Chọn món" style={{ width: 200 }}>
                                                        {dishesList.map((dish) => (
                                                            <Option key={dish.id} value={dish.name}>
                                                                {dish.name} - {dish.price} đ
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "quantity"]}
                                                    fieldKey={[fieldKey, "quantity"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Vui lòng nhập số lượng!",
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber min={1} placeholder="Số lượng" />
                                                </Form.Item>
                                                <Button
                                                    className="mb-6"
                                                    type="link"
                                                    danger
                                                    onClick={() => remove(name)}
                                                >
                                                    Xóa
                                                </Button>
                                            </div>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block>
                                                Thêm món
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Form>
                    </Modal>
                )}
            </div>
        </div>
    );

}

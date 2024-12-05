import clsx from 'clsx'
import React, { useState } from 'react'
import { Modal, Form, Select, Button, InputNumber, Table as AntTable } from 'antd';

const { Option } = Select;

const dishesList = [
    { id: 1, name: 'Cơm gà', price: 50000 },
    { id: 2, name: 'Phở bò', price: 40000 },
    { id: 3, name: 'Bún chả', price: 45000 },
    { id: 4, name: 'Trà sữa', price: 30000 },
];

export default function OrdersList({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTable, setCurrentTable] = useState(null); // Thông tin bàn được chọn

    const [form] = Form.useForm();

    const showModal = (table) => {
        setCurrentTable(table); // Lưu thông tin bàn đang được chọn
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                console.log('Form values:', values);
                setIsModalOpen(false);
                form.resetFields();
            })
            .catch(error => {
                console.error('Validation failed:', error);
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <div className='flex flex-col w-full p-4 gap-y-8'>
            <h1 className={`text-${data.type} text-lg`}>Area: {data.area.name}</h1>
            <div className='flex flex-row flex-wrap gap-8'>
                {data.area.table.map((item, index) => (
                    <div key={index} onClick={() => showModal(item)} class='flex flex-col items-center justify-center min-w-56 p-4 bg-white gap-y-2 rounded transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] hover:scale-105 cursor-pointer'>
                        <div className='flex-1 pb-2 flex justify-center items-center w-full border-b border-customDarkLine '>
                            <h1>{data.area.name}.{item.id}</h1>
                        </div>
                        <div className='flex justify-between text-xs w-full gap-x-2 '>
                            <span>11:59</span>
                            <span className={clsx(
                                item.isActive ? 'text-customGreen' : 'text-neutral-400'
                            )}>{item.isActive ? 'hoat dong' : 'chua hoat dong'}</span>
                        </div>
                    </div>
                ))}
            </div>
            {currentTable && (
                <Modal
                    title={currentTable.isActive ? `Bàn ${currentTable.id} - Hoạt động` : `Bàn ${currentTable.id} - Chưa hoạt động`}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText={currentTable.isActive ? "Thêm món" : "Bắt đầu order"}
                >
                    {currentTable.isActive ? (
                        <div>
                            <h3>Món đã đặt:</h3>
                            <AntTable
                                dataSource={currentTable.dishes || []}
                                columns={[
                                    { title: 'Tên món', dataIndex: 'name', key: 'name' },
                                    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
                                    { title: 'Giá', dataIndex: 'price', key: 'price', render: (text) => `${text} đ` },
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
                                                name={[name, 'name']}
                                                fieldKey={[fieldKey, 'name']}
                                                rules={[{ required: true, message: 'Vui lòng chọn món!' }]}
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
                                                name={[name, 'quantity']}
                                                fieldKey={[fieldKey, 'quantity']}
                                                rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                                            >
                                                <InputNumber min={1} placeholder="Số lượng" />
                                            </Form.Item>
                                            <Button className='mb-6' type="link" danger onClick={() => remove(name)}>
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
    )
}

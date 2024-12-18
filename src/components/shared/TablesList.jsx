import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Radio, Button, Table as AntTable, Popover, Popconfirm } from 'antd';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import axios from 'axios';

export default function TablesList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [typeModal, setTypeModal] = useState('')
    const [currentTable, setCurrentTable] = useState()
    const [tables, setTables] = useState([])

    const [formAdd] = Form.useForm();
    const [formEdit] = Form.useForm();

    useEffect(() => {
        getTableFoodApi();
    }, []);

    const getTableFoodApi = async () => {
        try {
            const response = await axios.get("https://localhost:7215/TableFood");
            setTables(response.data);
        } catch (error) {
            console.error("Error fetching bills:", error);
        }
    };

    const showModal = (type, item) => {
        setTypeModal(type)
        formEdit.setFieldsValue(item)
        setCurrentTable(item)
        setIsModalOpen(true);
    };

    const handleOk = (currentTable) => {
        if (typeModal === 'add') {
            formAdd.validateFields()
                .then(async (values) => {
                    console.log(values);
                    try {
                        await axios.post("https://localhost:7215/TableFood", values, {
                            headers: { "Content-Type": "application/json" },
                        });
                        await getTableFoodApi()
                        setIsModalOpen(false);
                        formAdd.resetFields();
                    } catch (error) {
                        console.error("Error submitting data:", error);
                    }
                })
                .catch(error => {
                    console.error('Validation failed:', error);
                });
        } else if (typeModal === 'edit') {
            currentTable &&
                formEdit.validateFields()
                    .then(async (values) => {
                        console.log('Form values:', values);
                        try {
                            await axios.put(`https://localhost:7215/TableFood/${currentTable.id}`, values, {
                                headers: { "Content-Type": "application/json" },
                            });
                            await getTableFoodApi()
                            setIsModalOpen(false);
                            formEdit.resetFields();
                        } catch (error) {
                            console.error("Error submitting data:", error);
                        }
                    })
                    .catch(error => {
                        console.error('Validation failed:', error);
                    });
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        if (typeModal === 'add') {
            formAdd.resetFields();
        } else {
            formEdit.resetFields();
        }
    };

    return (
        <div className={`flex flex-col w-full p-4 gap-y-8`}>
            <div className='flex flex-row flex-wrap gap-7 '>
                {tables.map((item, index) => (
                    <Popover
                        content={
                            <div className='flex justify-between gap-x-4'>
                                <Button onClick={() => showModal('edit', item)} className='flex-1 text-customSecondary bg-transparent border border-customSecondary hover:!text-customSecondary hover:!border-customSecondary hover:!bg-transparent hover:scale-110 transition-all duration-300'><FaRegEdit /></Button>
                                <Popconfirm
                                    title="Bạn có chắc muốn xóa danh mục này không?"
                                    okText="Xác nhận"
                                    cancelText="Hủy"
                                    onConfirm={async () => {
                                        await axios.delete(`https://localhost:7215/TableFood/${item.id}`)
                                        getTableFoodApi()
                                    }}
                                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                >
                                    <Button className='flex-1 text-customPrimary bg-transparent border border-customPrimary hover:!bg-transparent hover:scale-110 transition-all duration-300'><FaRegTrashAlt /></Button>
                                </Popconfirm>
                            </div>
                        }
                        title="Tùy chọn">
                        <div key={index} className={`flex items-center justify-center w-24 h-12 bg-customSecondary clip-trapezoid hover:scale-110 transition-all duration-300 cursor-pointer`}>
                            <span className="text-white">{item.name}</span>
                        </div>
                    </Popover>
                ))}
                <div onClick={() => showModal('add')} className={`relative flex items-center justify-center w-24 h-12 clip-trapezoid text-customSecondary hover:scale-110 transition-all duration-300 cursor-pointer`}>
                    <svg width="full" height="full" viewBox="0 0 200 100">
                        <polygon
                            points="50,0 150,0 200,100 0,100"
                            fill="none"
                            stroke="currentColor"
                            stroke-dasharray="10 10"
                            stroke-width="4" />
                    </svg>
                    <span className='absolute'>+</span>
                </div>
            </div>


            <Modal
                title={typeModal === 'add' ? 'Thêm bàn' : 'Chỉnh sửa tên bàn'}
                open={isModalOpen}
                onOk={() => handleOk(currentTable)}
                onCancel={handleCancel}
                okText='Xác nhận'
                cancelText="Hủy"
            >
                {
                    typeModal === 'add' ?
                        <Form
                            layout="vertical"
                            className="flex flex-col justify-between"
                            form={formAdd}
                        >
                            <Form.Item
                                label={<span className="text-sm">Tên bàn:</span>}
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập!' }]}
                            >
                                <Input
                                    placeholder="vd: 13"
                                />
                            </Form.Item>
                        </Form>
                        :
                        <Form
                            layout="vertical"
                            className="flex flex-col justify-between"
                            form={formEdit}
                        >
                            <Form.Item
                                label={<span className="text-sm">Tên bàn:</span>}
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập!' }]}
                            >
                                <Input
                                    placeholder="vd: 13"
                                />
                            </Form.Item>
                        </Form>
                }

            </Modal>

        </div>
    )
}



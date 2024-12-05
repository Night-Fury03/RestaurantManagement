import React, { useState } from 'react'
import { Modal, Form, Input, Radio, Button, Table as AntTable, Popover } from 'antd';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

export default function TablesList({ data, type }) {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [form] = Form.useForm();

    const showModal = () => {
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
        <div className={`flex flex-col w-full p-4 gap-y-8`}>
            <h1 className={`text-${type} text-lg`}>Area: A</h1>
            <div className='flex flex-row flex-wrap gap-7 '>
                {data.map((item, index) => (
                    <Popover content={popover} title="Tùy chỉnh">
                        <div key={index} className={`flex items-center justify-center w-24 h-12 bg-${type} clip-trapezoid hover:scale-110 transition-all duration-300 cursor-pointer`}>
                            <span className="text-white">A12</span>
                        </div>
                    </Popover>
                ))}
                <div onClick={showModal} className={`relative flex items-center justify-center w-24 h-12 clip-trapezoid text-${type} hover:scale-110 transition-all duration-300 cursor-pointer`}>
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
                title="Thêm bàn"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Thêm"
                cancelText="Hủy"
            >
                {/* Form thêm nhiều món */}
                <Form
                    layout="vertical"
                    className="flex flex-col justify-between"
                >
                    {/* Area Selection using Radio Buttons */}
                    <div className="flex flex-col gap-y-4">
                        <Form.Item
                            label={<span className="text-sm">Khu vực:</span>}
                            name="area"
                            rules={[{ required: true, message: 'Vui lòng chọn!' }]}
                        >
                            <Radio.Group>
                                <Radio value="A"> A </Radio>
                                <Radio value="B"> B </Radio>
                                <Radio value="C"> C </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-sm">Tên bàn:</span>}
                            name="tablename"
                            rules={[{ required: true, message: 'Vui lòng nhập!' }]}
                        >
                            <Input
                                placeholder="vd: A.13"
                            />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>

        </div>
    )
}

const popover = (
    <div className='flex justify-between gap-x-4'>
       <Button className='flex-1 text-customSecondary bg-transparent border border-customSecondary hover:!text-customSecondary hover:!border-customSecondary hover:!bg-transparent hover:scale-110 transition-all duration-300'><FaRegEdit /></Button>
       <Button className='flex-1 text-customPrimary bg-transparent border border-customPrimary hover:!bg-transparent hover:scale-110 transition-all duration-300'><FaRegTrashAlt /></Button>
    </div>
);

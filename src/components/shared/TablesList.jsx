import React, { useState } from 'react'
import { Modal, Form, Input, Radio, Button, Table as AntTable, Popover } from 'antd';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

export default function TablesList({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [typeModal, setTypeModal] = useState('')


    const [form] = Form.useForm();

    const showModal = (type) => {
        setTypeModal(type)
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

    const popover = (
        <div className='flex justify-between gap-x-4'>
            <Button onClick={() => showModal('edit')} className='flex-1 text-customSecondary bg-transparent border border-customSecondary hover:!text-customSecondary hover:!border-customSecondary hover:!bg-transparent hover:scale-110 transition-all duration-300'><FaRegEdit /></Button>
            <Button onClick={() => showModal('remove')} className='flex-1 text-customPrimary bg-transparent border border-customPrimary hover:!bg-transparent hover:scale-110 transition-all duration-300'><FaRegTrashAlt /></Button>
        </div>
    );

    return (
        <div className={`flex flex-col w-full p-4 gap-y-8`}>
            <div className='flex flex-row flex-wrap gap-7 '>
                {data.map((item, index) => (
                    <Popover content={popover} title="Tùy chọn">
                        <div key={index} className={`flex items-center justify-center w-24 h-12 bg-customSecondary clip-trapezoid hover:scale-110 transition-all duration-300 cursor-pointer`}>
                            <span className="text-white">A12</span>
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
                title={typeModal === 'add' ? 'Thêm bàn' : typeModal === 'edit' ? 'Chỉnh sửa bàn' : 'Bạn có chắc chắn muốn xóa bàn này?'}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Xác nhận'
                cancelText="Hủy"
            >
                <Form
                    layout="vertical"
                    className="flex flex-col justify-between"
                >
                    {typeModal === 'add' ?
                        <Form.Item
                            label={<span className="text-sm">Tên bàn:</span>}
                            name="tablename"
                            rules={[{ required: true, message: 'Vui lòng nhập!' }]}
                        >
                            <Input
                                placeholder="vd: 13"
                            />
                        </Form.Item>
                        : typeModal === 'remove' ?
                            <div></div>
                            :
                            <>
                                <Form.Item
                                    label={<span className="text-sm">Tên bàn hiện tại:</span>}
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        disabled
                                        value="13"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span className="text-sm">Tên bàn mới:</span>}
                                    name="tablename"
                                    rules={[{ required: true, message: 'Vui lòng nhập!' }]}
                                >
                                    <Input
                                        placeholder="vd: 13"
                                    />
                                </Form.Item>
                            </>
                    }
                </Form>
            </Modal>

        </div>
    )
}



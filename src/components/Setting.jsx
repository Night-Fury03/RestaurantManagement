import React, { useEffect, useState } from 'react'
import Header from './shared/Header'
import { Modal, Table, Tabs, Input, Button, Form, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ItemsList from './shared/ItemsList';
import axios from 'axios';
import TablesList from './shared/TablesList';

export default function Setting() {
  const [typeBtn, setTypeBtn] = useState(null)
  const [currCategory, setCurrCategory] = useState()
  const [currAcc, setCurrAcc] = useState()

  const [foodCategories, setFoodCategories] = useState([]);
  const [accList, setAccList] = useState([])

  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditCategoryVisible, setModalEditCategoryVisible] = useState(false);
  const [modalEditAccVisible, setModalEditAccVisible] = useState(false);


  const [formAccount] = Form.useForm();
  const [formCategory] = Form.useForm();
  const [formEditCategory] = Form.useForm();
  const [formEditAcc] = Form.useForm();

  useEffect(() => {
    getFoodCategoriesApi();
    getAccApi()
  }, []);

  const getFoodCategoriesApi = async () => {
    try {
      const response = await axios.get("https://localhost:7215/food/categories");
      setFoodCategories(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  const getAccApi = async () => {
    try {
      const response = await axios.get("https://localhost:7215/Account/type/0");
      console.log('response.data: ' + response.data)
      setAccList(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  // handle modal add new acc, new category
  const showModal = (type) => {
    setTypeBtn(type);
    setModalVisible(true);
  };

  const handleOk = () => {
    if (typeBtn === 'addAccount') {
      formAccount
        .validateFields()
        .then(async (values) => {
          console.log("Form values:", values);
          try {
            // Gửi dữ liệu lên server
            await axios.post("https://localhost:7215/Account", values, {
              headers: { "Content-Type": "application/json" },
            });
            // Cập nhật lại danh sách
            await getAccApi();
            // reset form
            setModalVisible(false);
            formAccount.resetFields();
          } catch (error) {
            console.error("Error submitting data:", error);
          }
        })
        .catch((error) => {
          console.error("Validation failed:", error);
        });
    }
  };

  const handleAddCategory = () => {
    formCategory
      .validateFields()
      .then(async (values) => {
        console.log("Form values:", values);
        try {
          // Gửi dữ liệu lên server
          await axios.post("https://localhost:7215/food/categories", values, {
            headers: { "Content-Type": "application/json" },
          });
          // Cập nhật lại danh sách
          await getFoodCategoriesApi();
          // reset form
          formCategory.resetFields();
        } catch (error) {
          console.error("Error submitting data:", error);
        }
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleCancel = () => {
    setModalVisible(false);
    if (typeBtn === 'editCategory') {
      formCategory.resetFields();
    } else {
      formAccount.resetFields();
    }
  };


  // Handle edit category modal
  const showModalEditCategory = (item) => {
    setModalEditCategoryVisible(true);
    formEditCategory.setFieldsValue(item);
    setCurrCategory(item);
  };

  const handleOkEditCategory = (item) => {
    formEditCategory
      .validateFields()
      .then(async (values) => {
        console.log(values)
        console.log(item)
        try {
          // Gửi dữ liệu lên server
          await axios.put(`https://localhost:7215/food/categories/${item.id}`, { id: item.id, isHidden: 0, ...values }, {
            headers: { "Content-Type": "application/json" },
          });

          // Cập nhật lại danh sách
          await getFoodCategoriesApi();
          // Đóng modal và reset form
          setModalEditCategoryVisible(false);
          formEditCategory.resetFields();
        } catch (error) {
          console.error("Error submitting data:", error);
        }
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleCancelEditCategory = () => {
    setModalEditCategoryVisible(false);
    formEditCategory.resetFields();
  };

  // Handle edit acc modal
  const showModalEditAcc = (item) => {
    setModalEditAccVisible(true);
    formEditAcc.setFieldsValue(item);
    setCurrAcc(item)
  };

  const handleOkEditAcc = (item) => {
    formEditAcc
      .validateFields()
      .then(async (values) => {
        console.log(values)
        try {
          // Gửi dữ liệu lên server
          await axios.put(`https://localhost:7215/Account/${item.userName}`, { type: 0, isHidden: 0, ...values }, {
            headers: { "Content-Type": "application/json" },
          });

          // Cập nhật lại danh sách
          await getAccApi();
          // Đóng modal và reset form
          setModalEditAccVisible(false);
          formEditAcc.resetFields();
        } catch (error) {
          console.error("Error submitting data:", error);
        }
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleCancelEditAcc = () => {
    setModalEditAccVisible(false);
    formEditAcc.resetFields();
  };

  return (
    <div className="flex h-full">
      {/* content */}
      <div className="flex flex-col flex-1 mx-4 mt-4">
        <Header title={"Settings"} />

        <Tabs
          tabPosition="left"
          defaultActiveKey="1"
          type="card"
          className="custom-tabs flex-1 py-4 gap-x-4"
        >
          <Tabs.TabPane tab="Quản lí tài khoản" key="1" className="h-full pr-4 flex flex-col gap-y-6" >
            <h1 className="text-white text-2xl font-semibold pt-4">
              Quản lí tài khoản
            </h1>

            <Table
              columns={[
                { title: 'Tên tài khoản', dataIndex: 'userName', key: 'userName', width: '20%' },
                { title: 'Tên đại diện', dataIndex: 'displayName', key: 'displayName', width: '30%' },
                { title: 'Mật khẩu', dataIndex: 'passWord', key: 'passWord', width: '45%' },
                {
                  key: 'action', width: '5%',
                  render: (item, record) => (
                    <div className='flex gap-x-2'>
                      <Button onClick={() => showModalEditAcc(item)} type="text" icon={<EditOutlined />} className="hover:!bg-customSecondary hover:!text-white " />

                      <Popconfirm
                        title="Bạn có chắc muốn xóa danh mục này không?"
                        okText="Xác nhận"
                        cancelText="Hủy"
                        onConfirm={async () => {
                          await axios.delete(`https://localhost:7215/Account/${record.userName}`)
                          getAccApi()
                        }}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                      >
                        <Button type="text" danger icon={<DeleteOutlined />} className="hover:!bg-red-500 hover:!text-white " />
                      </Popconfirm>
                    </div>
                  ),
                },
              ]}
              dataSource={accList.map((item) => ({ ...item, key: item.userName }))}
              bordered
              pagination={{ pageSize: 5 }}
            />

            <div className='flex justify-end items-center mb-2'>
              <Button onClick={() => showModal("addAccount")} className='transition-all bg-red-400 text-white h-[50px] rounded-lg border-red-500 border-b-[4px] hover:!bg-red-400 hover:!border-red-500 hover:!text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'>
                Thêm tài khoản mới
              </Button>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Quản lí thực đơn" key="2" className='h-full pr-4 flex flex-col gap-y-6'>
            <div className='flex justify-between items-center mt-2 pr-4'>
              <h1 className='text-white text-2xl font-semibold'>Quản lý sản phẩm</h1>
            </div>

            <ItemsList />

            <div className='flex justify-end items-center mb-2'>
              <Button onClick={() => showModal("editCategory")} className='transition-all bg-red-400 text-white h-[50px] rounded-lg border-red-500 border-b-[4px] hover:!bg-red-400 hover:!border-red-500 hover:!text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'>
                Tùy chỉnh phân loại
              </Button>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Quản lí bàn" key="3" className='h-full pr-4 flex flex-col gap-y-6'>
            <div className='flex justify-between items-center mt-2 pr-4'>
              <h1 className='text-white text-2xl font-semibold'>Quản lý bàn</h1>
            </div>

            <TablesList />
          </Tabs.TabPane>
        </Tabs>
      </div>

      {/* modal them acc */}
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
              <div className="flex flex-col gap-y-2 max-h-[340px] overflow-y-scroll">
                {
                  foodCategories.map((category) => (
                    <div key={category.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                      <span>{category.name}</span>
                      <div>
                        <Button onClick={() => showModalEditCategory(category)} type="text" icon={<EditOutlined />} className="hover:!bg-transparent w-12 hover:scale-125 hover:!text-customSecondary"> </Button>
                        <Popconfirm
                          title="Bạn có chắc muốn xóa danh mục này không?"
                          okText="Xác nhận"
                          cancelText="Hủy"
                          onConfirm={async () => {
                            await axios.delete(`https://localhost:7215/food/categories/${category.id}`)
                            getFoodCategoriesApi()
                          }}
                          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        >
                          <Button type="text" danger icon={<DeleteOutlined />} className="text-customPrimary hover:!bg-transparent w-12 hover:scale-125 hover:!text-customPrimary" />
                        </Popconfirm>
                      </div>

                    </div>
                  ))
                }
              </div>

              <Form layout="inline" className="mt-4" form={formCategory}>
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                >
                  <Input placeholder="Nhập danh mục mới" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" onClick={handleAddCategory}>
                    Thêm danh mục
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ) : (
            <Form layout="vertical" form={formAccount}>
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
                name="passWord"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input placeholder="Nhập mật khẩu" />
              </Form.Item>
            </Form>
          )
        }
      </Modal>

      {/* modal edit category */}
      <Modal
        title="Chỉnh sửa phân loại"
        onOk={() => handleOkEditCategory(currCategory)}
        onCancel={handleCancelEditCategory}
        open={modalEditCategoryVisible}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={formEditCategory}>
          <Form.Item
            label="Tên phân loại"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên phân loại!" }]}
          >
            <Input placeholder="Nhập tên phân loại" />
          </Form.Item>
        </Form>
      </Modal>

      {/* modal edit acc */}
      <Modal
        title="Chỉnh sửa tài khoản"
        onOk={() => handleOkEditAcc(currAcc)}
        onCancel={handleCancelEditAcc}
        open={modalEditAccVisible}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={formEditAcc}>
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
            name="passWord"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input placeholder="Nhập mật khẩu" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

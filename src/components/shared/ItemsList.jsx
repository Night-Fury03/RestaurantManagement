import React, { useEffect, useState } from "react";
import { Popconfirm, Input, Button, Modal, Form, Select } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

export default function ItemsList() {
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [foodCategories, setFoodCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [idEdit, setIdEdit] = useState(undefined);

  useEffect(() => {
    getFoodCategoriesApi();
    getFoodApi();
  }, []);

  const getFoodCategoriesApi = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7215/food/categories"
      );
      setFoodCategories(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  const getFoodApi = async () => {
    try {
      const response = await axios.get("https://localhost:7215/food");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const showModalEdit = (item) => {
    setModalEditVisible(true);
    formEdit.setFieldsValue(item);
    setIdEdit(item.id);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        try {
          // Gửi dữ liệu lên server
          await axios.post("https://localhost:7215/Food", values, {
            headers: { "Content-Type": "application/json" },
          });

          // Cập nhật lại danh sách
          await getFoodCategoriesApi();
          await getFoodApi();
          // Đóng modal và reset form
          setModalVisible(false);
          form.resetFields();
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
    form.resetFields();
  };

  const handleOkEdit = (item) => {
    formEdit
      .validateFields()
      .then(async (values) => {
        console.log("FORM VALUE IS " + values);
        try {
          // Gửi dữ liệu lên server
          await axios.put(
            `https://localhost:7215/Food/${idEdit}`,
            {
              id: idEdit,
              isHidden: item.isHidden,
              categoryName: item.categoryName,
              ...values,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          // Cập nhật lại danh sách
          await getFoodCategoriesApi();
          await getFoodApi();
          // Đóng modal và reset form
          setModalEditVisible(false);
          form.resetFields();
        } catch (error) {
          console.error("Error submitting data:", error);
        }
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleCancelEdit = () => {
    setModalEditVisible(false);
    form.resetFields();
  };

  return (
    <div className="flex-1 flex flex-row flex-wrap w-full py-2 gap-6 h-full overflow-y-scroll scrollbar-none">
      <div>
        <Button
          onClick={showModal}
          className="flex flex-col rounded-2xl w-48 h-full border border-dashed border-customPrimary hover:!bg-transparent bg-customDark1 text-customPrimary"
        >
          <PlusOutlined />
          Thêm món mới
        </Button>
      </div>
      {products.map((item, index) => (
        <div
          key={index}
          className="flex flex-col rounded-2xl items-center border border-customDarkLine w-48"
        >
          <div className="flex flex-col flex-end p-4">
            <div
              className="rounded-full bg-cover bg-center"
              style={{
                width: "127px",
                height: "127px",
                backgroundImage: `url(${item.imageLink})`,
              }}
            ></div>
            <div className="flex flex-col pt-2 gap-y-1 justify-center items-center">
              <span className="text-white">{item.name}</span>
              <span className="text-neutral-400 text-sm">{item.price}</span>
            </div>
          </div>

          <div className="flex w-full">
            <Popconfirm
              title="Xóa món"
              description="Bạn có chắc chắn xóa món ăn này?"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
              onConfirm={async () => {
                await axios.delete(`https://localhost:7215/Food/${item.id}`);
                getFoodApi();
              }}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <Button className="w-1/2 py-6 rounded-bl-2xl rounded-t-none border-none hover:!text-white hover:!bg-customPrimary bg-customPrimary text-white font-semibold">
                <DeleteOutlined /> Xóa
              </Button>
            </Popconfirm>
            <Button
              onClick={() => showModalEdit(item)}
              className="w-1/2 py-6 rounded-br-2xl rounded-t-none border-none hover:!text-white hover:!bg-customSecondary bg-customSecondary text-white font-semibold"
            >
              {" "}
              <EditOutlined /> Sửa
            </Button>
          </div>

          <Modal
            title="Chỉnh sửa món ăn"
            onOk={() => handleOkEdit(item)}
            onCancel={handleCancelEdit}
            open={modalEditVisible}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Form layout="vertical" form={formEdit}>
              <Form.Item
                label="Tên món ăn"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên món ăn!" },
                ]}
              >
                <Input placeholder="Nhập tên món ăn" />
              </Form.Item>
              <Form.Item
                label="Giá"
                name="price"
                rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
              >
                <Input placeholder="Nhập giá" />
              </Form.Item>
              <Form.Item label="Link hình ảnh" name="imageLink">
                <Input.TextArea placeholder="Chèn link hình ảnh" rows={2} />
              </Form.Item>
              <Form.Item
                label="Danh mục món ăn"
                name="idCategory"
                rules={[
                  { required: true, message: "Vui lòng chọn danh mục món ăn!" },
                ]}
              >
                <Select placeholder="Chọn danh mục" style={{ width: 200 }}>
                  {foodCategories.map((type) => (
                    <Select.Option key={type.id} value={type.id}>
                      {type.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      ))}

      <Modal
        title="Thêm món ăn mới"
        onOk={handleOk}
        onCancel={handleCancel}
        open={modalVisible}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Tên món ăn"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên món ăn!" }]}
          >
            <Input placeholder="Nhập tên món ăn" />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <Input placeholder="Nhập giá" />
          </Form.Item>
          <Form.Item label="Link hình ảnh" name="imageLink">
            <Input.TextArea placeholder="Chèn link hình ảnh" rows={2} />
          </Form.Item>
          <Form.Item
            label="Danh mục món ăn"
            name="idCategory"
            rules={[
              { required: true, message: "Vui lòng chọn danh mục món ăn!" },
            ]}
          >
            <Select placeholder="Chọn danh mục" style={{ width: 200 }}>
              {foodCategories.map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

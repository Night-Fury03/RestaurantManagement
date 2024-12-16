import React, { useEffect, useState } from "react";
import { Popconfirm, Input, Button, Modal, Form, Select } from "antd";
import backgroundImage from "../../assets/img/blackClover.jpg";
import {
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

export default function ItemsList({ data }) {
  const name = "Soup";
  const price = "$2.5";
  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(() => {
    async function test() {
      let a = await axios.get("https://localhost:7215/food/categories");
      setFoodCategories(a.data);
    }

    test();
  }, []);

  const onFinish = (values) => {
    console.log("Form Values:", values);
    // Có thể gửi dữ liệu lên server hoặc lưu vào state.
    setModalVisible(false); // Đóng Drawer sau khi submit
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);
        setModalVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="flex-1 flex flex-row flex-wrap w-full py-2 gap-6 max-h-[400px] overflow-y-scroll scrollbar-none">
      <div>
        <Button
          onClick={showModal}
          className="flex flex-col rounded-2xl w-48 h-full border border-dashed border-customPrimary hover:!bg-transparent bg-customDark1 text-customPrimary"
        >
          <PlusOutlined />
          Thêm món mới
        </Button>
      </div>
      {data.map((item, index) => (
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
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button className="relative group overflow-hidden w-full py-6 rounded-b-2xl rounded-t-none border-none hover:!bg-customPrimaryOpacity bg-customPrimaryOpacity text-customPrimary font-semibold active:translate-y-[2px] active:brightness-90">
              <span className="absolute bottom-0 right-0 w-full h-full transition-all duration-500 ease-in-out delay-200 translate-y-full bg-customPrimaryOpacity_50 rounded-md group-hover:translate-y-0"></span>
              <span className="relative w-full gap-x-2 justify-center text-white">
                <DeleteOutlined /> Xóa
              </span>
            </Button>
          </Popconfirm>
        </div>
      ))}

      <Modal
        title="Thêm món ăn mới"
        onOk={handleOk}
        onCancel={handleCancel}
        open={modalVisible}
        okText="Thêm món"
        cancelText="Hủy"
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tên món ăn"
            name="foodName"
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
          <Form.Item label="Link hình ảnh" name="description">
            <Input.TextArea placeholder="Chèn link hình ảnh" rows={2} />
          </Form.Item>
          <Form.Item
            label="Danh mục món ăn"
            name="foodCategory"
            rules={[
              { required: true, message: "Vui lòng chọn danh mục món ăn!" },
            ]}
          >
            <Select placeholder="Chọn danh mục" style={{ width: 200 }}>
              {foodCategories.map((type) => (
                <Select.Option key={type.id} value={type.name}>
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

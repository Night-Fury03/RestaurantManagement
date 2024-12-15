import React, { useEffect, useState } from "react";
import Header from "./shared/Header";
import backgroundImage from "../assets/img/CanhCa.jpg";
import { Modal, Table, Tabs, Input, Button, Form, Popconfirm } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import ItemsList from "./shared/ItemsList";
import axios from "axios";

const onChange = (key) => {
  console.log(key);
};

export default function Setting() {
  const [products, setProducts] = useState([1, 2, 3, 4, 5, 6]);
  const [typeBtn, setTypeBtn] = useState(null);
  const [categories, setCategories] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    async function test() {
      let a = await axios.get("https://localhost:7215/food/categories");
      setCategories(a.data);
    }

    test();
  }, []);

  const showModal = (type) => {
    setTypeBtn(type);
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

  const onFinish = (values) => {
    console.log("Form Values:", values);
    // Có thể gửi dữ liệu lên server hoặc lưu vào state.
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
          <Tabs.TabPane
            tab="Thông tin cá nhân"
            key="1"
            className="h-full pr-4 flex flex-col gap-y-6"
          >
            <h1 className="text-white text-2xl font-semibold pt-4">
              Thông tin tài khoản
            </h1>

            <div className="flex-1 flex flex-row">
              <div className="flex-1 flex flex-col gap-y-4 justify-center">
                <div className="flex justify-between p-4 border-b border-customDarkLine text-white">
                  <p className="text-lg">Tên tài khoản:</p>
                  <p className="font-thin">Dat</p>
                </div>
                <div className="flex justify-between p-4 border-b border-customDarkLine text-white">
                  <p className="text-lg">Tên người dùng:</p>
                  <p className="font-thin">Đạt 1 phít</p>
                </div>
                <div className="flex justify-between p-4 border-b border-customDarkLine text-white">
                  <p className="text-lg">Quyền:</p>
                  <p className="font-thin">admin</p>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div
                  className="rounded-full bg-cover bg-center"
                  style={{
                    width: "300px",
                    height: "300px",
                    backgroundImage: `url(${backgroundImage})`,
                  }}
                ></div>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Quản lí tài khoản"
            key="2"
            className="h-full pr-4 flex flex-col gap-y-6"
          >
            <h1 className="text-white text-2xl font-semibold pt-4">
              Danh sách tài khoản
            </h1>

            <Table
              columns={[
                {
                  title: "Tên tài khoản",
                  dataIndex: "username",
                  key: "username",
                },
                {
                  title: "Tên đại diện",
                  dataIndex: "displayname",
                  key: "displayname",
                },
                { title: "Mật khẩu", dataIndex: "password", key: "password" },
              ]}
              dataSource={initialData}
              bordered
              pagination={{ pageSize: 5 }}
              scroll={{ y: "300px" }} // Enable dynamic scrolling
            />

            <div className="flex justify-end items-center mb-2">
              <Button
                onClick={() => showModal("addAccount")}
                className="transition-all bg-red-400 text-white h-[50px] rounded-lg border-red-500 border-b-[4px] hover:!bg-red-400 hover:!border-red-500 hover:!text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              >
                Thêm tài khoản mới
              </Button>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Quản lí thực đơn"
            key="3"
            className="h-full pr-4 flex flex-col gap-y-6"
          >
            <div className="flex justify-between items-center mt-2 pr-4">
              <h1 className="text-white text-2xl font-semibold">
                Products Management
              </h1>
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
                <select class="appearance-none relative text-customPrimary bg-transparent ring-0 outline-none border border-customPrimary text-sm font-bold rounded-lg block w-full p-2.5">
                  <option>HTML</option>
                  <option>React</option>
                  <option>Vue</option>
                  <option>Angular</option>
                  <option>Svelte</option>
                </select>
              </div>
            </div>

            <ItemsList data={products} />

            <div className="flex justify-end items-center mb-2">
              <Button
                onClick={() => showModal("editCategory")}
                className="transition-all bg-red-400 text-white h-[50px] rounded-lg border-red-500 border-b-[4px] hover:!bg-red-400 hover:!border-red-500 hover:!text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              >
                Tùy chỉnh phân loại
              </Button>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Quản lí bàn"
            key="4"
            className="h-full pr-4 flex flex-col gap-y-6"
          >
            <div className="flex justify-between items-center mt-2 pr-4">
              <h1 className="text-white text-2xl font-semibold">Quản lý bàn</h1>
            </div>

            <div className="flex justify-between items-center mb-2">
              <Button className="transition-all bg-red-400 text-white h-[50px] rounded-lg border-red-500 border-b-[4px] hover:!bg-red-400 hover:!border-red-500 hover:!text-white hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                Thêm phân loại mới
              </Button>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

const initialData = [
  {
    key: "1",
    username: "Đạt",
    displayname: "Đạt 1 phít",
    password: "*********",
  },
  {
    key: "2",
    username: "Đạt",
    displayname: "Đạt 1 phít",
    password: "*********",
  },
  {
    key: "3",
    username: "Đạt",
    displayname: "Đạt 1 phít",
    password: "*********",
  },
  {
    key: "4",
    username: "Đạt",
    displayname: "Đạt 1 phít",
    password: "*********",
  },
  {
    key: "5",
    username: "Đạt",
    displayname: "Đạt 1 phít",
    password: "*********",
  },
  {
    key: "6",
    username: "Đạt",
    displayname: "Đạt 1 phít",
    password: "*********",
  },
  {
    key: "7",
    username: "Đạt",
    displayname: "Đạt 1 phít",
    password: "*********",
  },
];

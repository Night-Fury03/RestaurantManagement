// src/components/BarChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
    const year = [2023, 2024]
    const [revenues, setRevenues] = useState([]);

    useEffect(() => {
        // Sử dụng Promise.all để chờ tất cả các yêu cầu API hoàn tất
        const fetchRevenues = async () => {
            try {
                const results = await Promise.all(
                    year.map((item) => getTotalRevuneApi(item))
                );
                setRevenues(results); // Cập nhật toàn bộ mảng revenues cùng lúc
            } catch (error) {
                console.error("Error fetching revenues:", error);
            }
        };

        fetchRevenues();
    }, []);

    const getTotalRevuneApi = async (year) => {
        try {
            const response = await axios.get(`https://localhost:7215/TotalRevenue/${year}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching revenue for month ${year}:`, error);
            return null; // Trả về null nếu có lỗi
        }
    };

    // Dữ liệu cho biểu đồ
    const data = {
        labels: ['2023', '2024'], // Các năm
        datasets: [
            {
                label: 'Tổng doanh thu (triệu USD)',
                data: revenues, // Doanh thu từng năm
                backgroundColor: 'rgba(107, 226, 190, 0.24)', // Màu thanh
                borderColor: '#50D1AA', // Màu viền
                borderWidth: 1,
            },
        ],
    };

    // Tùy chọn cho biểu đồ
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Vị trí của chú thích
            },
            title: {
                display: true,
                text: 'Tổng doanh thu theo năm', // Tiêu đề biểu đồ
                font: {
                    size: 24, // Kích thước font
                },
                color: '#fff'
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#fff', // Màu của nhãn trục X
                    font: {
                        size: 10, // Kích thước nhãn
                        style: 'italic',
                    },

                },
                grid: {
                    display: false, // Ẩn lưới trục X
                },
            },
            y: {
                ticks: {
                    color: '#fff',
                    font: {
                        size: 10,
                    },
                    maxTicksLimit: 5, // Hiển thị tối đa 5 mốc
                    stepSize: 10,
                    callback: (value) => {
                        return `${value}đ`; // Thêm chữ "units" vào giá trị
                    },
                },
                beginAtZero: true, // Bắt đầu từ 0
            },
        },
    };

    return <Bar data={data} options={options} />;
};


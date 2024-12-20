import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart() {
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const [revenues, setRevenues] = useState([]);

    useEffect(() => {
        // Sử dụng Promise.all để chờ tất cả các yêu cầu API hoàn tất
        const fetchRevenues = async () => {
            try {
                const results = await Promise.all(
                    month.map((item) => getTotalRevuneApi(item))
                );
                setRevenues(results); // Cập nhật toàn bộ mảng revenues cùng lúc
            } catch (error) {
                console.error("Error fetching revenues:", error);
            }
        };

        fetchRevenues();
    }, []);

    const getTotalRevuneApi = async (month) => {
        try {
            const response = await axios.get(`https://localhost:7215/TotalRevenue?month=${month}&year=2024`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching revenue for month ${month}:`, error);
            return null; // Trả về null nếu có lỗi
        }
    };

    // Dữ liệu
    const data = {
        labels: ['2024/1', '2024/2', '2024/3', '2024/4', '2024/5', '2024/6', '2024/7', '2024/8', '2024/9', '2024/10', '2024/11'],
        datasets: [
            {
                label: 'Tổng doanh thu',
                data: revenues,
                borderColor: '#9288E0',
                backgroundColor: 'rgba(25, 121, 201, 0.3)',
                tension: 0.4, // Bo góc đường biểu đồ
                pointRadius: 5, // Kích thước điểm
            },
        ],
    };

    // Tùy chọn biểu đồ
    const options = {
        responsive: true,
        // maintainAspectRatio: true,
        // aspectRatio: 4,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Tổng doanh thu tháng',
                font: {
                    size: 24, // Kích thước font
                },
                color: '#fff'
            }
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
                    stepSize: 40000000,
                    callback: (value) => {
                        return `${value}đ`; // Thêm chữ "đ" vào giá trị
                    },
                },
                beginAtZero: true, // Bắt đầu từ 0
            },
        },
    };

    return <Line data={data} options={options} />;
}

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart() {
    // Dữ liệu
    const data = {
        labels: ['2018/8/1', '2018/8/2', '2018/8/3', '2018/8/4', '2018/8/5'],
        datasets: [
            {
                label: 'Tổng doanh thu',
                data: [4623, 6145, 508, 6268, 6411],
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
        maintainAspectRatio: true,
        aspectRatio: 4,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Total Revenue',
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
                    stepSize: 1000,
                    callback: (value) => {
                        return `${value}đ`; // Thêm chữ "units" vào giá trị
                    },
                },
                beginAtZero: true, // Bắt đầu từ 0
            },
        },
    };

    return <Line data={data} options={options} />;
}

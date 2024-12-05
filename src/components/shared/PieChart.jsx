import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function OrderTypePieChart() {
    // Sample data for orders
    const data = {
        labels: ['Tại chỗ', 'Giao hàng', 'Mang về'], // Categories
        datasets: [
            {
                label: 'Số lượng đơn hàng',
                data: [220, 80, 180], // Example values
                backgroundColor: [
                    '#50D1AA', // Green for Tại chỗ
                    '#FF7CA3', // Blue for Giao hàng
                    '#FFB572', // Orange for Mang về
                ],
                hoverBackgroundColor: [
                    '#6BE2BE',
                    '#FF7CA3',
                    '#FFB572',
                ],
                borderWidth: 1, // Border size
            },
        ],
    };

    // Options for customization
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right', // Position of legend
                labels: {
                    color: '#fff', // Color of legend text
                    font: {
                        size: 10, // Font size
                    },
                    boxWidth: 10,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw;
                        const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(2) + '%';
                        return `${tooltipItem.label}: ${value} (${percentage})`;
                    },
                },
            },
        },
    };

    return <Pie data={data} options={options} />;
    
}

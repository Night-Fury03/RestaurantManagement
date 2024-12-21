import React from "react";
import Header from "./shared/Header";
import LineChart from "./shared/LineChart";
import BarChart from "./shared/BarChart";
import { DownloadOutlined } from "@ant-design/icons";
import MostOrderedList from "./shared/MostOrderedList";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// const exportToPDF = async () => {
//   const content = document.getElementById('dashboard-content'); // Lấy DOM cần in
//   if (content) {
//     const canvas = await html2canvas(content, { scale: 2 }); // Chụp ảnh DOM, scale tăng chất lượng
//     const imgData = canvas.toDataURL('image/png'); // Chuyển thành ảnh PNG

//     const pdf = new jsPDF('p', 'mm', 'a4'); // Tạo PDF khổ A4
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();

//     const imgWidth = pageWidth;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width; // Tỉ lệ ảnh

//     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight); // Thêm ảnh vào PDF
//     pdf.save('dashboard-report.pdf'); // Lưu file PDF
//   } else {
//     console.error('Không tìm thấy nội dung cần in!');
//   }
// }

export default function Dashboard() {

  return (
    <div className="flex h-full">
      {/* content */}
      <div className="relative flex flex-col flex-1 ml-4">
        <Header title={"Dashboard"} />

        {/* <div className="absolute right-0 top-4">
          <button onClick={exportToPDF} className="relative flex items-center px-4 py-2 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group">
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              <DownloadOutlined /> In báo cáo
            </span>
          </button>
        </div> */}

        <div className="flex flex-col flex-1 pt-6 gap-y-6 overflow-y-auto scrollbar-none">
          <div className="rounded-lg bg-customDark1 p-4">
            <LineChart />
          </div>

          <div className="flex-1 rounded-lg bg-customDark1 p-4">
            <BarChart />
          </div>
        </div>
      </div>

      {/* right sidebar */}
      <div className="flex flex-col w-4/12 p-6 gap-y-6 justify-center">
        <div className="flex flex-col justify-between gap-y-4 p-4 bg-customDark1 rounded-lg h-[100%]">
          <div className="flex justify-between items-center w-full pb-2 border-b border-customDarkLine">
            <h1 className="text-white">Bán chạy nhất</h1>
          </div>

          <div className="flex-1 overflow-y-scroll scrollbar-none">
            <MostOrderedList />
          </div>
        </div>
      </div>
    </div>
  );
}

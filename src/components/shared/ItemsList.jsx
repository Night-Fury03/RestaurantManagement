import React from 'react'
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { Button } from 'antd';
import backgroundImage from '../../assets/img/blackClover.jpg'

export default function ItemsList({ data }) {
    return (
        <div className='flex flex-col flex-1 w-full items-center space-y-4 h-[400px] mt-2 pt-2 px-2 overflow-y-scroll scrollbar-none'>
            {
                data.map(() => (
                    <div className='flex flex-row w-full gap-x-4'>
                        <div className='flex-1 flex flex-col justify-between gap-y-1'>
                            <div className='flex-1 flex flex-row justify-between items-center'>
                                <div className='flex flex-row flex-1 items-center gap-x-2'>
                                    <div className='rounded-full h-11 w-11 bg-cover bg-center'
                                        style={{
                                            backgroundImage: `url(${backgroundImage})`,
                                        }}>
                                    </div>
                                    <span className='text-white'>hello</span>
                                </div>
                                <span className='text-white mr-4'>$2.5</span>
                            </div>
                            <div className='flex-1 flex flex-row items-center bg-customDark3 text-xs text-white px-2 rounded-lg'>
                                <span>chua cay man ngot</span>
                            </div>
                        </div>

                        <div className='flex flex-col items-center gap-y-2'>
                            <Button className='p-4 flex-1 text-customSecondary bg-transparent border border-customSecondary hover:!text-customSecondary hover:!border-customSecondary hover:!bg-transparent hover:scale-110 transition-all duration-300'><FaRegEdit /></Button>
                            <Button className='p-4 flex-1 text-customPrimary bg-transparent border border-customPrimary hover:!bg-transparent hover:scale-110 transition-all duration-300'><FaRegTrashAlt /></Button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

import React from 'react'
import backgroundImage from '../../assets/img/blackClover.jpg'

export default function MostOrderedList({ data }) {
    return (
        <div className='flex flex-col flex-1 w-full items-center space-y-4 overflow-y-scroll scrollbar-none'>
            {
                data.map(() => (
                    <div className='flex flex-col w-full gap-x-4'>
                        <div className='flex-1 flex flex-row gap-x-4 items-center'>
                            {/* image */}
                            <div className='rounded-full h-11 w-11 bg-cover bg-center'
                                style={{
                                    backgroundImage: `url(${backgroundImage})`,
                                }}>
                            </div>

                            {/* detail */}
                            <div className='flex-1 flex flex-col justify-center text-white gap-y-2'>
                                <span className='font-semibold text-sm'>chua cay man ngot dang nong lanh</span>
                                <span className='font-light text-xs'>$2.5</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

import React from 'react'
import backgroundImage from '../../assets/img/blackClover.jpg'

export default function ProductsList({ data }) {
    const name = 'Soup'
    const note = 'spicy hot cold pickleball'
    const price = '$2.5'

    return (
        <div className='flex flex-row flex-wrap w-full gap-7 justify-center'>

            {data.map((item, index) => (
                <div key={index} className='w-48 bg-customDark1 h-56 rounded-2xl items-center mb-7'>
                    <div className='relative w-full flex h-1/2 justify-center'>
                        <div className='absolute rounded-2xl top-[-25%] bg-cover bg-center'
                            style={{
                                width: '132px',
                                height: '132px',
                                backgroundImage: `url(${backgroundImage})`,
                            }}>
                        </div>
                    </div>
                    <div className='flex flex-col h-1/2 gap-y-1 justify-center items-center'>
                        <span className='text-white'>{name}</span>
                        <span className='text-neutral-400 text-sm'>{price}</span>
                        <span className='text-neutral-400 font-light text-sm'>{note.length > 14 ? note.slice(0, 14) + "..." : note}</span>
                    </div>
                </div>
            ))}

        </div>
    )
}

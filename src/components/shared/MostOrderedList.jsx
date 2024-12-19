import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function MostOrderedList() {
    const [foodPopulariry, setFoodPopilarity] = useState([])

    useEffect(() => {
        getFoodPopularityApi()
    }, [])

    const getFoodPopularityApi = async () => {
        try {
            const response = await axios.get("https://localhost:7215/Food/popularity");
            setFoodPopilarity(response.data);

        } catch (error) {
            console.error("Error fetching bills:", error);
        }
    };

    return (
        <div className='flex flex-col flex-1 w-full gap-y-4 px-8'>
            {
                foodPopulariry.map((item, index) => (
                    <div key={index} className='flex flex-row gap-x-4 items-center'>
                        {/* image */}
                        <div className='rounded-full h-14 w-14 bg-cover bg-center'
                            style={{
                                backgroundImage: `url(${item.imageLink})`,
                            }}>
                        </div>

                        {/* detail */}
                        <div className='flex-1 flex flex-col justify-center text-white gap-y-2'>
                            <span className='font-semibold text-sm'>{item.name}</span>
                            <span className='font-light text-xs'>{item.price}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

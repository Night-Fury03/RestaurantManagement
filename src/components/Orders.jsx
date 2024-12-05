import React, { useState } from 'react'
import Header from './shared/Header'
import OrdersList from './shared/OrdersList'

const orders = [
    {
        order: 1,
        type: "customPrimary",
        area: 
        {
            "name": "A",
            table: [
                {
                    id: 1,
                    isActive: true,
                    dishes: [{ name: 'Cơm gà', quantity: 2, price: 100000 }] 
                },
                {
                    id: 2,
                    isActive: false,
                },
                {
                    id: 3,
                    isActive: true,
                },
                {
                    id: 4,
                    isActive: true,
                },
                {
                    id: 5,
                    isActive: true,
                },
            ]
        }
    },
    {
        order: 2,
        type: "customSecondary",
        area: 
        {
            name: "B",
            table: [
                {
                    id: 1,
                    isActive: true,
                },
                {
                    id: 2,
                    isActive: false,
                },
                {
                    id: 3,
                    isActive: true,
                },
            ]
        }
    },
    {
        order: 3,
        type: "customOrange",
        area: 
        {
            name: "C",
            table: [
                {
                    id: 1,
                    isActive: false,
                },
                {
                    id: 2,
                    isActive: false,
                },
                {
                    id: 3,
                    isActive: false,
                },
            ]
        }
    }
]

export default function Orders() {
    

    return (
        <div className='flex h-full'>
            {/* content */}
            <div className='flex flex-col flex-1 mx-4'>
                <Header title={'Orders'}/>

                <div className='flex-1 flex flex-wrap p-4 gap-y-8 scrollbar-none overflow-y-scroll'>
                    {
                        orders.map((order, index) => (
                            <OrdersList key={index} data={order}/>
                        ))
                    }
                   
                </div>
            </div>

        </div>
    )
}

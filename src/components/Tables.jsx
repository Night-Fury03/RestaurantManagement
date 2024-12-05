import React, { useState } from 'react'
import Header from './shared/Header'
import TablesList from './shared/TablesList'

export default function Tables() {

    const [tables, setTabless] = useState([1, 2, 3, 4, 5, 6])
    const type1 = 'customSecondary'
    const type2 = 'customPrimary'
    const type3 = 'customOrange'

    return (
        <div className='flex h-full'>
            {/* content */}
            <div className='flex flex-col flex-1 mx-4'>
                <Header title={'Tables'} />

                <div className='flex-1 flex flex-wrap p-4 gap-y-8 scrollbar-none overflow-y-scroll'>
                    <TablesList data={tables} type={type2}/>
                    <TablesList data={tables} type={type1}/>
                    <TablesList data={tables} type={type3}/>
                </div>

            </div>
        </div>
    )
}

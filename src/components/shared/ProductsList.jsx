import React from 'react'
import Hau from '../../assets/img/Hau.jpg'
import SoHuyet from '../../assets/img/SoHuyet.jpg'
import Muc from '../../assets/img/Muc.jpg'
import CanhNgao from '../../assets/img/CanhNgao.jpg'
import ComChienThapCam from '../../assets/img/ComChienThapCam.jpg'
import Coca from '../../assets/img/Coca.jpg'
import SuaDauNanh from '../../assets/img/SuaDauNanh.jpg'
import Fanta from '../../assets/img/Fanta.jpg'
import Up from '../../assets/img/7Up.jpg'
import NuocSuoi from '../../assets/img/NuocSuoi.jpg'
import ChanhDay from '../../assets/img/ChanhDay.jpg'

const imgData = [
    { id: 14, url: Hau },
    { id: 15, url: SoHuyet },
    { id: 16, url: Muc },
    { id: 17, url: CanhNgao },
    { id: 18, url: ComChienThapCam },
    { id: 19, url: Coca },
    { id: 20, url: SuaDauNanh },
    { id: 21, url: Fanta },
    { id: 22, url: Up },
    { id: 23, url: NuocSuoi },
    { id: 24, url: ChanhDay },
]

export default function ProductsList({ data }) {

    return (
        <div className='flex flex-row flex-wrap w-full gap-7'>

            {data.map((item, index) => {
                // Tìm URL từ imgData dựa trên item.id
                const imageUrl = imgData.find(img => img.id === item.id)?.url;
                return (
                    <div key={index} className='w-48 bg-customDark1 h-56 rounded-2xl items-center mb-7'>
                        <div className='relative w-full flex h-1/2 justify-center'>
                            <div className='absolute rounded-2xl top-[-25%] bg-cover bg-center'
                                style={{
                                    width: '132px',
                                    height: '132px',
                                    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                                }}>
                            </div>
                        </div>
                        <div className='flex flex-col h-1/2 gap-y-1 justify-center items-center'>
                            <span className='text-white'>{item.name}</span>
                            <span className='text-neutral-400 text-sm'>{item.price}</span>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

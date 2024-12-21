import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

export default function Header({ title, showSearchBar, onSearch }) {
    const handleInputChange = (e) => {
        if (onSearch) {
            onSearch(e.target.value); // Gửi giá trị tìm kiếm về component cha
        }
    };

    return (
        <div className='flex h-16 justify-between items-center border-b border-customDarkLine'>
            <div className='flex-1'>
                <h1 className='text-white text-2xl'>{title}</h1>
            </div>

            {showSearchBar ? (
                <div className="relative">
                    <HiOutlineSearch fontSize={20} className="text-white absolute top-1/2 left-3 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="text-sm text-white focus:outline-none active:outline-none bg-customDark3 border border-customDarkLine w-56 h-10 pl-11 pr-4 rounded-lg"
                        onChange={handleInputChange} // Gửi giá trị khi người dùng nhập
                    />
                </div>)
                : null
            }
        </div>
    )
}

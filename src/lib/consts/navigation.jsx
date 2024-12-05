import {
	HiOutlineCog
} from 'react-icons/hi'

import { IoFastFoodOutline, IoBarChartOutline } from "react-icons/io5";
import { MdOutlineHistory, MdOutlineTableRestaurant } from "react-icons/md";
import { FaConciergeBell } from "react-icons/fa";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <IoBarChartOutline />
	},
	{
		key: 'products',
		label: 'Products',
		path: '/products',
		icon: <IoFastFoodOutline />
	},
	{
		key: 'tables',
		label: 'Tables',
		path: '/tables',
		icon: <MdOutlineTableRestaurant />
	},
	{
		key: 'orders',
		label: 'Orders',
		path: '/orders',
		icon: <FaConciergeBell />
	},
	// {
	// 	key: 'history',
	// 	label: 'History',
	// 	path: '/history',
	// 	icon: <MdOutlineHistory />
	// },
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
]
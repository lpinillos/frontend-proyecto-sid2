import { Link } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaCalendarAlt, FaCalendarCheck } from 'react-icons/fa';

const Sidebar = () => {
    let user = JSON.parse(localStorage.getItem('user'));


    return (
        <div className='w-72 bg-gray-800 h-screen flex flex-col fixed left-0 shadow-lg'>
            <div className='flex-grow'>
                <h2 className='text-white font-semibold flex justify-center pt-6 text-2xl'>
                    Icesi Eventos
                </h2>
            </div>
            <ul className='mt-10'>
                <li>
                    <Link to='/MyEvents' className='flex items-center text-white font-semibold px-5 py-4 text-lg hover:bg-gray-600 transition duration-200'>
                        <FaCalendarCheck className='mr-3' />
                        Mis Eventos
                    </Link>
                </li>
                <li>
                    <Link to='/Events' className='flex items-center text-white font-semibold px-5 py-4 text-lg hover:bg-gray-600 transition duration-200'>
                        <FaCalendarAlt className='mr-3' />
                        Eventos
                    </Link>
                </li>
                {user && (
                    <li className='relative'>
                        <div className='flex items-center text-white font-semibold px-5 py-4 text-lg transition duration-200 cursor-pointer'>
                            <FaUserCircle className='mr-3' />
                            {user.nombre}
                        </div>
                        <div className='absolute right-0 top-0 mt-2 w-50 bg-gray-700 rounded-full shadow-lg mr-4'>
                            <Link to="/" className='flex items-center text-white px-4 py-2 hover:bg-red-500 transition duration-200 rounded-full'>
                                <FaSignOutAlt className='mr-2' />
                                Logout
                            </Link>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;

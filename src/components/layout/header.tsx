// Header Component
import { IoIosArrowDown } from 'react-icons/io';

const Header = () => {
  return (
    <div className='bg-white border-b border-neutral-br-secondary h-14 px-4 flex items-center justify-between'>
      <div className='text-sm text-gray-600' />
      <div className='flex items-center gap-2 cursor-pointer'>
        <div className='w-8 h-8 bg-gray-300 rounded-full'></div>
        <span className='text-sm font-semibold'>John Doe</span>
        <IoIosArrowDown className='text-neutral-ct-tertiary' />
      </div>
    </div>
  );
};
export default Header;

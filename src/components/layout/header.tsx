// Header Component
import { IoIosArrowDown } from 'react-icons/io';
import { Button } from '../ui/button';
import { HiOutlineBars3 } from 'react-icons/hi2';

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <div className='bg-white border-b border-neutral-br-secondary h-14 px-4 flex items-center justify-between'>
      <Button
        variant={'secondary'}
        size={'icon'}
        onClick={onMenuClick}
        className='md:hidden block'
      >
        <HiOutlineBars3 />
      </Button>
      <div className='md:block hidden' />
      <div className='flex items-center gap-2 cursor-pointer'>
        <div className='w-8 h-8 bg-gray-300 rounded-full'></div>
        <span className='text-sm font-semibold'>John Doe</span>
        <IoIosArrowDown className='text-neutral-ct-tertiary' />
      </div>
    </div>
  );
};
export default Header;

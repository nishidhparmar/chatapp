'use client';
import Image from 'next/image';
import DashboardLayout from '../layout/dashboard-layout';
import { Button } from '../ui/button';
import { AuthInput } from '../auth/common/auth-input';
import { useState, useRef } from 'react';

const Settings = () => {
  const [profileImage, setProfileImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    setProfileImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <DashboardLayout>
      <div className='max-w-[800px] mx-auto bg-white mt-16 p-8'>
        <h1 className='font-semibold text-neutral-ct-primary text-2xl'>
          Personal Information{' '}
        </h1>
        <div className='mt-8 flex md:flex-row flex-col items-center gap-6'>
          <div className='relative'>
            <Image
              className='rounded-full h-24 w-24 object-cover'
              src={profileImage || '/images/hill-station.jpeg'}
              alt='Profile'
              width={96}
              height={96}
            />
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              className='hidden'
            />
          </div>
          <div className='flex items-center gap-2'>
            <Button className='px-4 py-2 text-xs' onClick={handleUploadClick}>
              Upload new photo
            </Button>
            <Button
              className='px-4 py-2 text-xs'
              variant={'destructive-secondary'}
              onClick={handleRemovePhoto}
            >
              Remove photo
            </Button>
          </div>
        </div>
        <div className='mt-8 space-y-8'>
          <div className='grid grid-cols-2 items-center'>
            <div>
              <h2 className='text-sm text-neutral-ct-primary font-semibold'>
                Name
              </h2>
              <p className='text-neutral-ct-secondary text-xs'>
                as displayed to everyone
              </p>
            </div>
            <AuthInput
              label=''
              className='-mt-1.5 w-full max-h-10'
              defaultValue={'Ryan Harvey'}
            />
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div>
              <h2 className='text-sm text-neutral-ct-primary font-semibold'>
                Phone Number
              </h2>
              <p className='text-neutral-ct-secondary text-xs'>
                not shown to leads
              </p>
            </div>
            <AuthInput
              label=''
              className='-mt-1.5 w-full max-h-10'
              defaultValue={'(213) 786-6930'}
            />
          </div>
          <div className='flex items-center justify-end'>
            <Button disabled className='!px-3 max-h-8 text-xs !py-2'>
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className='max-w-[800px] mx-auto bg-white mt-16 p-8 mb-6'>
        <h1 className='font-semibold text-neutral-ct-primary text-2xl'>
          Login & Recovery
        </h1>

        <div className='mt-8 space-y-8'>
          <div className='grid grid-cols-2 items-center'>
            <h2 className='text-sm text-neutral-ct-primary font-semibold'>
              Email Address
            </h2>
            <AuthInput
              label=''
              className='-mt-1.5 w-full max-h-10'
              value={'ryan.harvey@heddle.com'}
              disabled
            />
          </div>
          <div className='grid grid-cols-2 items-center'>
            <h2 className='text-sm text-neutral-ct-primary font-semibold'>
              Phone Number
            </h2>
            <Button variant={'secondary'} className='w-max text-xs px-4 py-2'>
              Change password{' '}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Settings;

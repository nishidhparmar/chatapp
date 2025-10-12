'use client';

import { SearchSection } from '../common';
import DashboardLayout from '../layout/dashboard-layout';

const HomePage = () => {
  return (
    <DashboardLayout>
      <div className='flex items-center justify-center px-8 bg-transparent py-12 h-[calc(100vh-56px)]'>
        <div className='max-w-[806px] w-full'>
          {/* Title */}
          <div className='text-center mb-8'>
            <h1 className='text-2xl font-semibold text-neutral-ct-primary mb-2'>
              Ask anything about your data
            </h1>
            <p className='text-neutral-ct-secondary text-sm'>
              From finance to inventory, ask and get the answers you need to
              make decisions faster.
            </p>
          </div>
          <SearchSection />
        </div>
      </div>
    </DashboardLayout>
  );
};
export default HomePage;

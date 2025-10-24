'use client';
import React, { ReactNode, useState } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import { Sheet, SheetContent, SheetHeader } from '../ui/sheet';
import { Plus } from 'lucide-react';
import CreateNewChat from '../chat/create-new-chat';
import MobileSidebar from './mobile-sidebar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [createNewChatModal, setNewChatModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='flex flex-col h-screen bg-gray-50'>
      <Header onMenuClick={() => setMobileMenuOpen(true)} />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar setNewChatModal={setNewChatModal} />
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side='left' className='w-[240px] sm:w-[280px] p-0'>
            <SheetHeader className='border-b border-neutral-200 p-4 flex flex-row items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <button
                  onClick={() => setNewChatModal(true)}
                  className='w-8 h-8 bg-blue-600 rounded-full flex cursor-pointer items-center justify-center text-white hover:bg-blue-700 transition-colors'
                >
                  <Plus size={16} />
                </button>
                <p className='text-base text-neutral-ct-primary'>
                  New saved chat
                </p>
              </div>
            </SheetHeader>
            <MobileSidebar />
          </SheetContent>
        </Sheet>
        <main className='flex-1 overflow-auto'>{children}</main>
      </div>
      <CreateNewChat
        open={createNewChatModal}
        onOpenChange={() => setNewChatModal(false)}
      />
    </div>
  );
};
export default DashboardLayout;

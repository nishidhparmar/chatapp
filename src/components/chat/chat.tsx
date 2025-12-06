'use client';

import React from 'react';
import { ChatLayout } from './index';
import DashboardLayout from '../layout/dashboard-layout';

const Chat = () => {
  return (
    <DashboardLayout>
      <ChatLayout />
    </DashboardLayout>
  );
};

export default Chat;

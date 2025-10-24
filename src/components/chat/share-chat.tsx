import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Lock, Link2, X } from 'lucide-react';
import Input from '../ui/input';
import { Button } from '../ui/button';

interface ShareChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShareChatModal = ({ open, onOpenChange }: ShareChatModalProps) => {
  const [email, setEmail] = useState('');
  const [accessLevel, setAccessLevel] = useState('invited');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://claude.ai/share/chat/abc123');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInvite = () => {
    if (email) {
      console.log('Inviting:', email);
      setEmail('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] space-y-6'>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <DialogTitle className='text-3xl font-semibold'>
              Share Chat
            </DialogTitle>
            <DialogClose asChild>
              <button className='rounded-sm opacity-70 hover:opacity-100'>
                <X className='h-5 w-5' />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>

        {/* Warning Alert */}

        {/* Email Input */}
        <div className='flex gap-3'>
          <Input
            type='email'
            placeholder='Enter email address'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='flex-1 h-12'
          />
          <Button
            onClick={handleInvite}
            variant='outline'
            className='px-6 h-12'
          >
            Invite
          </Button>
        </div>

        {/* Who has access section */}
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold'>Who has access?</h3>

          {/* Current User */}
          <div className='flex items-center justify-between py-3'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold'>
                JD
              </div>
              <div>
                <p className='font-medium'>
                  John Doe <span className='text-gray-500'>(You)</span>
                </p>
              </div>
            </div>
            <span className='text-gray-500'>Owner</span>
          </div>

          {/* Access Level Dropdown */}
          <Select value={accessLevel} onValueChange={setAccessLevel}>
            <SelectTrigger className='w-full h-12'>
              <div className='flex items-center gap-2'>
                <Lock className='h-4 w-4' />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='invited'>Only those invited</SelectItem>
              <SelectItem value='anyone'>Anyone with the link</SelectItem>
              <SelectItem value='restricted'>Restricted access</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Copy Link Button */}
        <Button
          onClick={handleCopyLink}
          variant='outline'
          className='w-fit px-6 h-12 flex items-center gap-2'
        >
          <Link2 className='h-4 w-4' />
          {copied ? 'Link Copied!' : 'Copy Link'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ShareChatModal;

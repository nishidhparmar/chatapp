import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '../ui/button';
import { AuthInput } from '../auth/common/auth-input';
import { useSaveChat } from '@/hooks/mutations/use-save-chat';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface SaveChatModalProps {
  open: { visible: boolean; id: number };
  onOpenChange: () => void;
}

const SaveChatModal = ({ open, onOpenChange }: SaveChatModalProps) => {
  const [chatTitle, setChatTitle] = useState('');
  const { mutate: saveChat, isPending } = useSaveChat();

  // Reset title when modal opens
  useEffect(() => {
    if (open.visible) {
      setChatTitle('');
    }
  }, [open.visible]);

  const handleSave = () => {
    if (!chatTitle.trim()) {
      toast.error('Please enter a chat title');
      return;
    }

    if (!open.id) {
      toast.error('Invalid chat ID');
      return;
    }

    saveChat(
      {
        chat_id: open.id,
        title: chatTitle.trim(),
      },
      {
        onSuccess: () => {
          toast.success('Chat saved successfully');
          onOpenChange();
        },
        onError: () => {
          toast.error('Failed to save chat');
        },
      }
    );
  };

  return (
    <Dialog open={open.visible} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] space-y-2'>
        <DialogHeader>
          <DialogTitle>Save Chat</DialogTitle>
          <DialogDescription className='mt-1'>
            Name your chat so you can easily find it again.
          </DialogDescription>
        </DialogHeader>
        <AuthInput
          label=''
          placeholder='Untitled chat'
          className=''
          value={chatTitle}
          onChange={e => setChatTitle(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !isPending) {
              handleSave();
            }
          }}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant='secondary'
              className='px-4 py-2'
              disabled={isPending}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type='submit'
            className='px-4 py-2'
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default SaveChatModal;

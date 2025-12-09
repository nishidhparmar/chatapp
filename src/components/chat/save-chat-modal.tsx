import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '../ui/Button';
import { AuthInput } from '../auth/common/auth-input';
import { useSaveChat } from '@/hooks/mutations/use-save-chat';
import { useState, useEffect } from 'react';
import { showToast } from '../common/toast';

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
      showToast.error({
        title: 'Title required',
        description: 'Please enter a chat title',
      });
      return;
    }

    if (!open.id) {
      showToast.error({
        title: 'Invalid chat',
        description: 'Invalid chat ID',
      });
      return;
    }

    saveChat(
      {
        chat_id: open.id,
        title: chatTitle.trim(),
      },
      {
        onSuccess: () => {
          showToast.success({
            title: 'Chat saved',
            description: 'The chat has been saved successfully.',
          });
          onOpenChange();
        },
        onError: () => {
          showToast.error({
            title: 'Save failed',
            description: 'Failed to save chat. Please try again.',
          });
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

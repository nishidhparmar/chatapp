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
import { showToast } from '../common/toast';
import { useCreateChat } from '@/hooks/mutations/use-create-chat';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

interface CreateNewChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateNewChat = ({ open, onOpenChange }: CreateNewChatProps) => {
  const [value, setValue] = useState('');
  const { mutate: createChat, isPending } = useCreateChat();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleCreate = () => {
    if (!value.trim()) {
      showToast.error({
        title: 'Chat name required',
        description: 'Please enter a chat name to continue.',
      });
      return;
    }

    createChat(
      {
        title: value,
      },
      {
        onSuccess: response => {
          // Invalidate chat list queries to refetch the updated list
          queryClient.invalidateQueries({
            queryKey: ['chats', 'list'],
          });

          // Also invalidate chat groups in case the new chat affects groups
          queryClient.invalidateQueries({
            queryKey: ['chat-groups'],
          });

          router.push(`/chats?id=${response.data.chat_id}`);
          setValue('');
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] space-y-2'>
        <DialogHeader>
          <DialogTitle>Create new chat</DialogTitle>
          <DialogDescription className='mt-1'>
            Name your chat so you can easily find it again.
          </DialogDescription>
        </DialogHeader>
        <AuthInput
          label=''
          placeholder='Untitled chat'
          className=''
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='secondary' size={'xs'}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type='submit'
            size={'xs'}
            onClick={handleCreate}
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create Chat'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CreateNewChat;

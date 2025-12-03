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
import { toast } from 'sonner';
import { useChatAsk } from '@/hooks/mutations/use-chat-ask';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CreateNewChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateNewChat = ({ open, onOpenChange }: CreateNewChatProps) => {
  const [value, setValue] = useState('');
  const { mutate: createChat, isPending } = useChatAsk();
  const router = useRouter();

  const handleCreate = () => {
    if (!value.trim()) {
      toast.error('Please enter a chat name');
      return;
    }

    createChat(
      {
        chat_id: 0,
        mode: 'conversational',
        text: value,
      },
      {
        onSuccess: response => {
          toast.custom(() => (
            <div className='bg-neutral-primary-inverse text-white rounded-2xl p-4 shadow-lg w-[380px]'>
              <p className='text-xs font-semibold'>Chat created</p>
              <p className='text-xs mt-1 '>
                Your new chat has been successfully created.
              </p>
            </div>
          ));
          router.push(`/invoice/conversations/${response.data.chat_id}`);
          setValue('');
          onOpenChange(false);
        },
        onError: () => {
          toast.error('Failed to create chat');
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

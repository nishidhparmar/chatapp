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
import { toast } from 'sonner';

interface CreateNewChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const handleCreate = () => {
  toast.custom(() => (
    <div className='bg-neutral-primary-inverse text-white rounded-2xl p-4 shadow-lg w-[380px]'>
      <p className='text-xs font-semibold'>Chat created</p>
      <p className='text-xs mt-1 '>
        Your new chat has been successfully created.
      </p>
    </div>
  ));
};

const CreateNewChat = ({ open, onOpenChange }: CreateNewChatProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] space-y-2'>
        <DialogHeader>
          <DialogTitle>Create new chat</DialogTitle>
          <DialogDescription className='mt-1'>
            Name your chat so you can easily find it again.
          </DialogDescription>
        </DialogHeader>
        <AuthInput label='' placeholder='Untitled chat' className='' />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='secondary' size={'xs'}>
              Cancel
            </Button>
          </DialogClose>
          <Button type='submit' size={'xs'} onClick={handleCreate}>
            Create Chat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CreateNewChat;

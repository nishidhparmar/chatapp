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

interface CreateNewChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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
            <Button variant='secondary' className='px-4 py-2 '>
              Cancel
            </Button>
          </DialogClose>
          <Button type='submit' className='px-4 py-2'>
            Create Chat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CreateNewChat;

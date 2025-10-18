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

interface SaveChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SaveChatModal = ({ open, onOpenChange }: SaveChatModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] space-y-2'>
        <DialogHeader>
          <DialogTitle>Save Chat</DialogTitle>
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
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default SaveChatModal;

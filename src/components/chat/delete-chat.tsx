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

interface DeleteChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteChat = ({ open, onOpenChange }: DeleteChatProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] space-y-2'>
        <DialogHeader>
          <DialogTitle>Delete Chat</DialogTitle>
          <DialogDescription className='mt-1'>
            Are you sure you want to delete this chat?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mt-4'>
          <DialogClose asChild>
            <Button variant='secondary' className='px-4 py-2'>
              Cancel
            </Button>
          </DialogClose>
          <Button type='submit' variant={'destructive'} className='px-4 py-2'>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteChat;

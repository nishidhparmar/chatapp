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

interface DeleteRecurrenceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteRecurrence = ({ open, onOpenChange }: DeleteRecurrenceProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] space-y-2'>
        <DialogHeader>
          <DialogTitle>Cancel Recurrence</DialogTitle>
          <DialogDescription className='mt-1'>
            Are you sure you want to cancel the recurrence?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mt-4'>
          <DialogClose asChild>
            <Button variant='secondary' size={'xs'} className='px-4 py-2'>
              No, keep it
            </Button>
          </DialogClose>
          <Button
            type='submit'
            size={'xs'}
            variant={'destructive'}
            className='px-4 py-2'
          >
            Yes, cancel recurrence
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteRecurrence;

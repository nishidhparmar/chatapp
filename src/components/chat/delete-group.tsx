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

interface DeleteGroupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  isDeleting?: boolean;
  groupName?: string;
}

const DeleteGroup = ({
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
  groupName,
}: DeleteGroupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] space-y-2'>
        <DialogHeader>
          <DialogTitle>Delete Group</DialogTitle>
          <DialogDescription className='mt-1'>
            Are you sure you want to delete the group &quot;{groupName}&quot;?
            The chats in this group will not be deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mt-4'>
          <DialogClose asChild>
            <Button variant='secondary' size={'xs'} className='px-4 py-2'>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type='submit'
            size={'xs'}
            variant={'destructive'}
            className='px-4 py-2'
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteGroup;

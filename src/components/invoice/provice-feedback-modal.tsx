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
import { Textarea } from '../ui/textarea';

interface ProvideFeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProvideFeedbackModal = ({
  open,
  onOpenChange,
}: ProvideFeedbackModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] space-y-2'>
        <DialogHeader>
          <DialogTitle>
            Provide feedback{' '}
            <span className='font-normal text-sm'>(optional)</span>
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-wrap gap-2'>
          <div className='px-3 py-2 text-sm text-neutral-ct-primary bg-gray-50 w-max rounded-lg'>
            Data mapped is up to date
          </div>
          <div className='px-3 py-2 text-sm text-neutral-ct-primary bg-gray-50 w-max rounded-lg'>
            Well explained
          </div>
          <div className='px-3 py-2 text-sm text-neutral-ct-primary bg-gray-50 w-max rounded-lg'>
            Data mapped is correct
          </div>
        </div>
        <div>
          <Textarea placeholder='Enter your detailed feedback' />
        </div>
        <DialogFooter className='mt-4'>
          <DialogClose asChild>
            <Button variant='secondary' className='px-4 py-2 '>
              Cancel
            </Button>
          </DialogClose>
          <Button type='submit' className='px-4 py-2'>
            Submit feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ProvideFeedbackModal;

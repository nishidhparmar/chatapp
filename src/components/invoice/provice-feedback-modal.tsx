import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface ProvideFeedbackModalProps {
  open: { visible: boolean; type: 'POSITIVE' | 'NAGETIVE' };
  onOpenChange: ({
    visible,
    type,
  }: {
    visible: boolean;
    type: 'POSITIVE' | 'NAGETIVE';
  }) => void;
}

const ProvideFeedbackModal = ({
  open,
  onOpenChange,
}: ProvideFeedbackModalProps) => {
  const feedbackConfig = {
    POSITIVE: {
      title: 'Provide feedback (optional)',
      tags: [
        'Data mapped is up to date',
        'Well explained',
        'Data mapped is correct',
        'Clear',
      ],
    },
    NAGETIVE: {
      title: 'Help your chatbot improve',
      tags: [
        'Data mapped is incorrect',
        'Wrong format',
        'Data mapped is irrelevant',
        'Poorly explained',
      ],
    },
  };

  const { title, tags } = feedbackConfig[open.type];

  return (
    <Dialog
      open={open.visible}
      onOpenChange={() => onOpenChange({ type: 'POSITIVE', visible: false })}
    >
      <DialogContent className='sm:max-w-[425px] space-y-2'>
        <DialogHeader>
          <DialogTitle className='font-medium text-lg'>{title}</DialogTitle>
        </DialogHeader>

        <div className='flex flex-wrap gap-2'>
          {tags.map(tag => (
            <div
              key={tag}
              className='px-3 py-2 text-sm text-neutral-ct-primary bg-gray-50 w-max rounded-lg'
            >
              {tag}
            </div>
          ))}
        </div>

        <div>
          <Textarea placeholder='Enter your detailed feedback' />
        </div>

        <DialogFooter className='mt-4'>
          <DialogClose asChild>
            <Button variant='secondary' className='px-4 py-2'>
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

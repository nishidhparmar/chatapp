import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/textarea';
import { useGetSuggestedFeedback } from '../../hooks/queries';
import { useCreateFeedback } from '../../hooks/mutations';
import { useCurrentUser } from '../../hooks/use-current-user';
import { useState } from 'react';

interface ProvideFeedbackModalProps {
  open: { visible: boolean; type: 'POSITIVE' | 'NAGETIVE' };
  onOpenChange: ({
    visible,
    type,
  }: {
    visible: boolean;
    type: 'POSITIVE' | 'NAGETIVE';
  }) => void;
  messageId: string;
}

const ProvideFeedbackModal = ({
  open,
  onOpenChange,
  messageId,
}: ProvideFeedbackModalProps) => {
  const { data } = useGetSuggestedFeedback();
  const { user } = useCurrentUser();
  const { mutate: createFeedback, isPending } = useCreateFeedback();

  const [selectedTag, setSelectedTag] = useState<string>('');
  const [customFeedback, setCustomFeedback] = useState('');

  const feedbackConfig = {
    POSITIVE: {
      title: 'Provide feedback (optional)',
    },
    NAGETIVE: {
      title: 'Help your chatbot improve',
    },
  };

  const { title } = feedbackConfig[open.type];

  // Get tags based on feedback type
  const tags = data?.data
    ? open.type === 'POSITIVE'
      ? data.data.positive
      : data.data.negative
    : [];

  const handleTagClick = (tag: string) => {
    // If the same tag is clicked, deselect it
    if (selectedTag === tag) {
      setSelectedTag('');
      setCustomFeedback('');
    } else {
      // Select the new tag and set it as the feedback value
      setSelectedTag(tag);
      setCustomFeedback(tag);
    }
  };

  const handleSubmit = () => {
    if (!user?.user_id) return;

    createFeedback(
      {
        message_id: String(messageId),
        user_id: String(user.user_id),
        message: customFeedback,
        sentiment: open.type === 'POSITIVE' ? 'positive' : 'negative',
      },
      {
        onSuccess: () => {
          // Reset form and close modal
          setSelectedTag('');
          setCustomFeedback('');
          onOpenChange({ type: 'POSITIVE', visible: false });
        },
        onError: error => {
          console.error('Failed to submit feedback:', error);
        },
      }
    );
  };

  const handleClose = () => {
    setSelectedTag('');
    setCustomFeedback('');
    onOpenChange({ type: 'POSITIVE', visible: false });
  };

  return (
    <Dialog open={open.visible} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[425px] space-y-2'>
        <DialogHeader>
          <DialogTitle className='font-medium text-lg'>{title}</DialogTitle>
        </DialogHeader>

        <div className='flex flex-wrap gap-2'>
          {tags.map(tag => (
            <div
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-2 text-sm w-max rounded-lg cursor-pointer transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'text-neutral-ct-primary bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {tag}
            </div>
          ))}
        </div>

        <div>
          <Textarea
            placeholder='Enter your detailed feedback'
            value={customFeedback}
            onChange={e => {
              const newValue = e.target.value;
              setCustomFeedback(newValue);
              // If user manually types and it's different from selected tag, clear the tag selection
              if (selectedTag && newValue !== selectedTag) {
                setSelectedTag('');
              }
            }}
          />
        </div>

        <DialogFooter className='mt-4'>
          <DialogClose asChild>
            <Button
              variant='secondary'
              size={'xs'}
              className='px-4 py-2'
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type='submit'
            size={'xs'}
            onClick={handleSubmit}
            disabled={isPending || !customFeedback.trim()}
          >
            {isPending ? 'Submitting...' : 'Submit feedback'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProvideFeedbackModal;

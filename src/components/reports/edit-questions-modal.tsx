'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { AuthInput } from '../auth/common/auth-input';
import { Button } from '../ui/button';
import { PiWarningFill } from 'react-icons/pi';

interface EditQuestionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questions: string[];
  onSave: (questions: string[]) => void;
  isLoading?: boolean;
  title: string;
}

const EditQuestionsModal = ({
  open,
  onOpenChange,
  questions,
  onSave,
  isLoading = false,
  title: _title,
}: EditQuestionsModalProps) => {
  const [editedQuestions, setEditedQuestions] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Initialize questions when modal opens
  useEffect(() => {
    if (open) {
      setEditedQuestions(questions.length > 0 ? [...questions] : ['']);
      setError('');
    }
  }, [open, questions]);

  const handleAddQuestionField = () => {
    setEditedQuestions([...editedQuestions, '']);
    setError('');
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...editedQuestions];
    updated[index] = value;
    setEditedQuestions(updated);
    if (error) setError('');
  };

  const handleRemoveQuestionField = (index: number) => {
    // Don't allow removing if it's the only question
    if (editedQuestions.length <= 1) {
      return;
    }

    const updated = editedQuestions.filter((_, i) => i !== index);
    setEditedQuestions(updated);
  };

  const handleSave = () => {
    const validQuestions = editedQuestions.filter(q => q.trim() !== '');

    if (validQuestions.length === 0) {
      setError('Please enter at least one question');
      return;
    }

    onSave(validQuestions);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setError('');
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black/50' onClick={handleCancel} />

      {/* Modal */}
      <div className='relative bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Edit Questions
          </h2>
          <button
            onClick={handleCancel}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <X size={20} className='text-gray-500' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 max-h-[60vh] overflow-y-auto'>
          <div className='space-y-4'>
            {editedQuestions.map((question, index) => (
              <div key={index} className='flex items-center gap-3'>
                <div className='flex-1'>
                  <AuthInput
                    label=''
                    type='text'
                    value={question}
                    onChange={e => handleQuestionChange(index, e.target.value)}
                    placeholder={
                      index === 0
                        ? 'Enter your first question'
                        : 'Add another question'
                    }
                    className='h-12 !px-4'
                  />
                </div>
                {editedQuestions.length > 1 ? (
                  <button
                    onClick={() => handleRemoveQuestionField(index)}
                    className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                    title='Remove question'
                  >
                    <Trash2 size={16} />
                  </button>
                ) : (
                  <button
                    disabled
                    className='p-2 text-gray-300 cursor-not-allowed rounded-lg'
                    title='Cannot remove the last question'
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            {error && (
              <div className='text-red-600 text-sm font-medium flex items-center gap-2'>
                <PiWarningFill className='h-4 w-4' />
                {error}
              </div>
            )}

            <Button
              onClick={handleAddQuestionField}
              variant='secondary'
              className='w-full'
              type='button'
            >
              <Plus size={16} />
              Add another question
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className='flex items-center justify-end gap-3 p-6 border-t border-gray-200'>
          <Button
            onClick={handleCancel}
            variant='secondary'
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Questions'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionsModal;

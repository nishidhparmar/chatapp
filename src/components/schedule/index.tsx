'use client';

import { useState } from 'react';
import { Plus, Clock, Trash2, Delete } from 'lucide-react';
import { AuthInput } from '../auth/common/auth-input';
import { PiWarningFill } from 'react-icons/pi';
import DashboardLayout from '../layout/dashboard-layout';
import { Edit, Play, Stop } from '../icons';
import ScheduleModal from './schedule-modal';
import { Button } from '../ui/button';
import DeleteRecurrence from './delete-recurrence';

const Schedule = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'Show me the sales data for California',
      schedule: 'Daily at 9:00am',
      isPaused: false,
    },
    {
      id: 2,
      question: 'Provide the quarterly revenue report',
      schedule: 'Weekly on Mondays at 10:30am',
      isPaused: false,
    },
    {
      id: 3,
      question: 'Update me on customer feedback trends',
      schedule: 'Monthly on the first Thursday at 2:00pm',
      isPaused: false,
    },
  ]);

  const [newQuestions, setNewQuestions] = useState(['']);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [openDeleteRecurrence, setOpenDeleteRecurrence] = useState(false);

  const handleAddQuestionField = () => {
    setNewQuestions([...newQuestions, '']);
    setError('');
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...newQuestions];
    updated[index] = value;
    setNewQuestions(updated);
    if (error) setError('');
  };

  const handleRemoveQuestionField = (index: number) => {
    const updated = newQuestions.filter((_, i) => i !== index);
    setNewQuestions(updated);
    if (updated.length === 0 || updated.every(q => q === '')) {
    }
  };

  const handleSchedule = () => {
    setScheduleModalOpen(true);
    console.log('Schedule questions:', newQuestions);
  };

  // const handleSchedule = () => {
  //   const validQuestions = newQuestions.filter(q => q.trim() !== '');

  //   if (validQuestions.length === 0) {
  //     setError('Please enter at least one question before scheduling');
  //     return;
  //   }

  //   const newScheduledQuestions = validQuestions.map((q, index) => ({
  //     id: questions.length + index + 1,
  //     question: q,
  //     schedule: 'Not scheduled yet',
  //     isPaused: false,
  //   }));
  //   setQuestions([...questions, ...newScheduledQuestions]);
  //   setNewQuestions(['']);
  //   setError('');
  // };

  const handleDelete = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleTogglePause = (id: number) => {
    setQuestions(
      questions.map(q => (q.id === id ? { ...q, isPaused: !q.isPaused } : q))
    );
  };

  const handleEdit = (id: number) => {
    // Edit functionality placeholder
    console.log('Edit question:', id);
  };

  return (
    <DashboardLayout>
      <div className='min-h-screen bg-gray-50 py-12 px-4'>
        <div className='max-w-5xl mx-auto'>
          {/* Title */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-semibold text-gray-900 mb-3'>
              Schedule questions
            </h1>
            <p className='text-gray-600 text-base max-w-2xl mx-auto'>
              Schedule your chat questions once, and let them run on autopilot.
              Pick a time, choose your question, and we&apos;ll take care of the
              rest.
            </p>
          </div>

          {/* Input Card */}
          <div className='bg-white border border-gray-200 shadow-sm rounded-xl md:p-6 p-4 mb-8'>
            <div className='space-y-2 w-full'>
              {newQuestions.map((question, index) => (
                <div key={index} className='w-full flex items-center gap-5'>
                  <div className='w-full'>
                    <AuthInput
                      label=''
                      type='text'
                      value={question}
                      onChange={e =>
                        handleQuestionChange(index, e.target.value)
                      }
                      placeholder={
                        index === 0
                          ? 'Enter recurring question to begin'
                          : 'Add your question'
                      }
                      className='h-16 !px-4 !w-full'
                    />
                  </div>
                  {index > 0 && (
                    <button
                      onClick={() => handleRemoveQuestionField(index)}
                      className='text-error-ct-error transition-colors'
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}

              {error && (
                <div className='text-error-ct-error text-sm font-medium flex items-center gap-2'>
                  <PiWarningFill className='h-4 w-4' />
                  {error}
                </div>
              )}
            </div>

            <div className='flex justify-between md:flex-row flex-col gap-2 items-center mt-6'>
              <Button
                onClick={handleAddQuestionField}
                variant={'secondary'}
                className='md:w-max w-full'
              >
                <Plus size={20} />
                Add another question
              </Button>
              <Button onClick={handleSchedule} className='md:w-max w-full'>
                <Clock size={20} />
                Schedule
              </Button>
            </div>
          </div>

          {/* Scheduled Chats Section */}
          {questions.length > 0 && (
            <div>
              <h2 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>
                Schedule Chats
              </h2>
              <div className='space-y-2 sm:space-y-3'>
                {questions.map(item => (
                  <div
                    key={item.id}
                    className='bg-[#F5F5F5] rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#EBEBE7] transition-colors'
                  >
                    <div className='flex-1 space-y-1 min-w-0'>
                      <div className='flex items-center gap-2 flex-wrap'>
                        <h3 className='text-sm sm:text-base font-semibold text-gray-900 break-words'>
                          {item.question}
                        </h3>
                        <span className='inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-error-ct-error text-white text-[10px] font-semibold flex-shrink-0'>
                          {1}
                        </span>
                        {!item.isPaused && (
                          <span className='inline-flex items-center gap-1 rounded bg-gray-300 text-gray-900 text-xs font-semibold px-2 py-0.5 flex-shrink-0'>
                            Paused
                          </span>
                        )}
                      </div>
                      <p className='text-xs sm:text-sm text-gray-600'>
                        {item.schedule}
                      </p>
                    </div>
                    <div className='flex items-center gap-2 sm:gap-3 self-end sm:self-center flex-shrink-0'>
                      <button
                        onClick={() => setOpenDeleteRecurrence(true)}
                        className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                        title='Delete'
                        aria-label='Delete'
                      >
                        <Trash2 size={16} className='sm:w-4 sm:h-4' />
                      </button>
                      <button
                        onClick={() => handleTogglePause(item.id)}
                        className='p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-200 rounded-lg transition-colors'
                        title={item.isPaused ? 'Resume' : 'Pause'}
                        aria-label={item.isPaused ? 'Resume' : 'Pause'}
                      >
                        {item.isPaused ? (
                          <Play size={18} className='sm:w-[18px] sm:h-[18px]' />
                        ) : (
                          <Stop size={18} className='sm:w-[18px] sm:h-[18px]' />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className='p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-200 rounded-lg transition-colors'
                        title='Edit'
                        aria-label='Edit'
                      >
                        <Edit size={16} className='sm:w-4 sm:h-4' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
      />
      <DeleteRecurrence
        open={openDeleteRecurrence}
        onOpenChange={() => {
          setOpenDeleteRecurrence(false);
        }}
      />
    </DashboardLayout>
  );
};

export default Schedule;

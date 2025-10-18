'use client';

import { useState } from 'react';
import { Plus, Clock, Trash2 } from 'lucide-react';
import { AuthInput } from '../auth/common/auth-input';
import { PiWarningFill } from 'react-icons/pi';
import DashboardLayout from '../layout/dashboard-layout';
import { Edit, Play, Stop } from '../icons';
import ScheduleModal from './schedule-modal';

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
          <div className='bg-white border border-gray-200 shadow-sm rounded-xl p-6 mb-8'>
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

            <div className='flex justify-between items-center mt-6'>
              <button
                onClick={handleAddQuestionField}
                className='flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition-colors'
              >
                <Plus size={20} />
                Add another question
              </button>
              <button
                onClick={handleSchedule}
                className='flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors'
              >
                <Clock size={20} />
                Schedule
              </button>
            </div>
          </div>

          {/* Scheduled Chats Section */}
          {questions.length > 0 && (
            <div>
              <h2 className='text-base font-semibold text-neutral-ct-primary mb-4'>
                Schedule Chats
              </h2>
              <div className='space-y-3'>
                {questions.map(item => (
                  <div
                    key={item.id}
                    className='bg-[#F5F5F5] rounded-[8px] p-3 flex items-center justify-between group hover:bg-[#EBEBE7] transition-colors'
                  >
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center gap-2'>
                        <h3 className='text-base font-semibold text-neutral-ct-primary'>
                          {item.question}
                        </h3>
                        {/* red count badge */}
                        <span className='inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-error-ct-error text-white text-[10px] font-semibold'>
                          1
                        </span>
                        {!item.isPaused && (
                          <span className='inline-flex items-center gap-1 rounded-[4px] bg-neutral-active text-neutral-ct-primary text-xs font-semibold px-2 py-0.5'>
                            Paused
                          </span>
                        )}
                      </div>
                      <p className='text-sm text-neutral-ct-secondary'>
                        {item.schedule}
                      </p>
                    </div>
                    <div className='flex items-center gap-2 '>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className=' text-error-ct-error hover:bg-red-50 rounded-lg transition-colors'
                        title='Delete'
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={() => handleTogglePause(item.id)}
                        className=' hover:text-brand-ct-brand hover:bg-gray-200 rounded-lg transition-colors'
                        title={item.isPaused ? 'Resume' : 'Pause'}
                      >
                        {item.isPaused ? (
                          <Play size={18} />
                        ) : (
                          <Stop size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className=' hover:text-brand-ct-brand hover:bg-gray-200 rounded-lg transition-colors'
                        title='Edit'
                      >
                        <Edit size={16} />
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
    </DashboardLayout>
  );
};

export default Schedule;

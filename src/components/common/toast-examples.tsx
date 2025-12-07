// Example usage of the new toast component
import { showToast } from './toast';

// Instead of: toast.success('Chat saved successfully')
// Use:
showToast.success({
  title: 'Chat saved',
  description: 'The chat has been saved successfully.',
});

// Instead of: toast.error('Failed to save chat')
// Use:
showToast.error({
  title: 'Save failed',
  description: 'Unable to save the chat. Please try again.',
});

// For loading states:
const loadingToast = showToast.loading({
  title: 'Saving chat...',
  description: 'Please wait while we save your chat.',
});

// Later dismiss the loading toast:
// toast.dismiss(loadingToast);

// Other examples:
showToast.info({
  title: 'Information',
  description: 'This is an informational message.',
});

showToast.warning({
  title: 'Warning',
  description: 'Please check your input before proceeding.',
});

// Simple toast without description:
showToast.success({
  title: 'Operation completed',
});

// Custom duration:
showToast.success({
  title: 'Quick message',
  description: 'This will disappear in 2 seconds.',
  duration: 2000,
});

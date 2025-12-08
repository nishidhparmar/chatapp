export const TIMES = [
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
];
export const WEEK_DAYS = [
  { key: 'monday', label: 'M' },
  { key: 'tuesday', label: 'T' },
  { key: 'wednesday', label: 'W' },
  { key: 'thursday', label: 'T' },
  { key: 'friday', label: 'F' },
  { key: 'saturday', label: 'S' },
  { key: 'sunday', label: 'S' },
];

export const convertTo12Hour = (time24h: string): string => {
  try {
    const [hours, minutes] = time24h.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return '9:00 AM';
  }
};

// Helper function to parse repeat_on for weekly schedules
export const parseWeeklyDays = (repeatOn: string): string[] => {
  if (!repeatOn) return ['monday'];
  return repeatOn.split(',').filter(day => day.trim());
};

export const convertTo24Hour = (time12h: string): string => {
  const [time, modifier] = time12h.split(' ');
  let [hours] = time.split(':');
  const [, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = String(parseInt(hours, 10) + 12);
  }
  return `${hours.padStart(2, '0')}:${minutes}:00`;
};

// Helper function to format date to ISO string
export const formatDateToISO = (date: Date): string => {
  return date.toISOString();
};

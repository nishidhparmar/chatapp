import React, { useCallback, useState } from 'react';
import { Download } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { cn } from '../../../lib/utils';
import { Jpeg, Pdf, Csv } from '../../icons';
import { MenuItemProps, VisualizationType } from './types';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import FileSaver from 'file-saver';

interface DownloadPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
  title?: string;
  viewType?: VisualizationType;
  chartContent?: any; // Chart data for CSV export
}

const DownloadPopover: React.FC<DownloadPopoverProps> = ({
  open,
  onOpenChange,
  contentRef,
  title = 'chart',
  viewType,
  chartContent,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAsJPEG = useCallback(async () => {
    if (!contentRef.current) return;

    setIsDownloading(true);
    try {
      const dataUrl = await domtoimage.toJpeg(contentRef.current, {
        quality: 0.8,
        bgcolor: '#ffffff',
        width: contentRef.current.offsetWidth * 2,
        height: contentRef.current.offsetHeight * 2,
        style: {
          transform: 'scale(2)',
          transformOrigin: 'top left',
        },
      });

      // Convert data URL to blob and download
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      FileSaver.saveAs(
        blob,
        `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpeg`
      );

      onOpenChange(false);
    } catch (error) {
      console.error('Error downloading JPEG:', error);
      alert('Failed to download chart as JPEG. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }, [contentRef, title, onOpenChange]);

  const downloadAsPDF = useCallback(async () => {
    if (!contentRef.current) return;

    setIsDownloading(true);
    try {
      const dataUrl = await domtoimage.toPng(contentRef.current, {
        bgcolor: '#ffffff',
        width: contentRef.current.offsetWidth * 2,
        height: contentRef.current.offsetHeight * 2,
        style: {
          transform: 'scale(2)',
          transformOrigin: 'top left',
        },
      });

      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm

      // Calculate image dimensions
      const img = new Image();
      img.onload = () => {
        const imgHeight = (img.height * imgWidth) / img.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if needed
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
      };
      img.src = dataUrl;

      onOpenChange(false);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download chart as PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }, [contentRef, title, onOpenChange]);

  const downloadAsCSV = useCallback(async () => {
    if (!chartContent || !chartContent.data) return;

    setIsDownloading(true);
    try {
      const data = chartContent.data;

      // Convert data to CSV format
      let csvContent = '';

      if (Array.isArray(data) && data.length > 0) {
        // Get headers from the first object
        const headers = Object.keys(data[0]);
        csvContent = headers.join(',') + '\n';

        // Add data rows
        data.forEach(row => {
          const values = headers.map(header => {
            const value = row[header];
            // Escape commas and quotes in values
            if (
              typeof value === 'string' &&
              (value.includes(',') || value.includes('"'))
            ) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          });
          csvContent += values.join(',') + '\n';
        });
      } else if (typeof data === 'object') {
        // Handle object data structure
        const entries = Object.entries(data);
        csvContent = 'Key,Value\n';
        entries.forEach(([key, value]) => {
          const escapedValue =
            typeof value === 'string' &&
            (value.includes(',') || value.includes('"'))
              ? `"${value.replace(/"/g, '""')}"`
              : value;
          csvContent += `${key},${escapedValue}\n`;
        });
      }

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      FileSaver.saveAs(
        blob,
        `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv`
      );

      onOpenChange(false);
    } catch (error) {
      console.error('Error downloading CSV:', error);
      alert('Failed to download data as CSV. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }, [chartContent, title, onOpenChange]);

  const downloadMenuItems: MenuItemProps[] = [
    ...(viewType === 'table'
      ? [
          {
            title: 'CSV',
            icon: <Csv />,
            onClick: downloadAsCSV,
          },
        ]
      : []),
    {
      title: 'JPEG',
      icon: <Jpeg />,
      onClick: downloadAsJPEG,
    },
    {
      title: 'PDF',
      icon: <Pdf />,
      onClick: downloadAsPDF,
    },
  ];

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            open && '!text-brand-ct-brand',
            'h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
          )}
        >
          <Download className='w-3 h-3' />
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-[120px] p-0' align='start' sideOffset={6}>
        {downloadMenuItems.map((item, index) => (
          <button
            key={index}
            className='w-full flex cursor-pointer items-center gap-2 px-3 py-2.5 hover:bg-neutral-secondary rounded-md transition-colors text-sm text-neutral-ct-primary disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={item.onClick}
            type='button'
            disabled={isDownloading}
          >
            <span className='text-neutral-ct-secondary flex items-center'>
              {item.icon}
            </span>
            <span>{item.title}</span>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default DownloadPopover;

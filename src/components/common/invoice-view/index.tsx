import {
  ChevronDown,
  Copy,
  Download,
  Maximize2,
  Table,
  BarChart3,
  LineChart,
  PieChart,
  Check,
} from 'lucide-react';
import InvoiceViewTable from './table';
import { PiPlusSquare } from 'react-icons/pi';
import { useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { cn } from '../../../lib/utils';
import { Clock, Jpeg, Pdf, Png, Svg, Trash } from '../../icons';
import {
  DonutChart,
  LineChartComp,
  SimpleChart,
  StackedChart,
  GroupedChart,
} from '../charts';
import MultiLineChart from '../charts/multi-line';
import AddToDashboard from '../../reports/add-to-dashboard';
import ScheduleRecurring from '../../schedule/schedule-recurring-modal';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InvoiceViewProps {
  defaultView?: string;
  title?: string;
  hideViewAs?: boolean;
  HideAddToDashboard?: boolean;
  showDelete?: boolean;
  hideExtentView?: boolean;
}

const InvoiceView: React.FC<InvoiceViewProps> = ({
  defaultView: propDefaultView = 'table',
  title = 'Open Invoices by Customer',
  hideViewAs = false,
  HideAddToDashboard = false,
  showDelete = false,
  hideExtentView = false,
}) => {
  const [defaultView, setDefaultView] = useState(propDefaultView);
  const [openViewAsPopover, setOpenViewAsPopover] = useState(false);
  const [openDownloadPopover, setOpenDownloadPopover] = useState(false);
  const [openCopyPopover, setOpenCopyPopover] = useState(false);
  const [openAddPopover, setOpenAddPopover] = useState(false);
  const [openMaximizePopover, setOpenMaximizePopover] = useState(false);
  const [openAddTodashboardModal, setOpenAddTodashboard] = useState(false);
  const [openScheduleRecurringModal, setOpenScheduleRecurringModal] =
    useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // FIXED: PDF Download Handler
  const handleDownloadPDF = async () => {
    if (!contentRef.current) {
      console.error('Content ref is not available');
      return;
    }

    try {
      setIsGenerating(true);
      console.log('Starting PDF generation...');

      // Wait for any animations to complete
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: contentRef.current.scrollWidth,
        windowHeight: contentRef.current.scrollHeight,
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      const imgData = canvas.toDataURL('image/png', 1.0);

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const filename = `${title.replace(/\s+/g, '_')}.pdf`;
      pdf.save(filename);

      console.log('PDF saved successfully');
      setOpenDownloadPopover(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // FIXED: PNG Download Handler
  const handleDownloadPNG = async () => {
    if (!contentRef.current) {
      console.error('Content ref is not available');
      return;
    }

    try {
      setIsGenerating(true);
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        windowWidth: contentRef.current.scrollWidth,
        windowHeight: contentRef.current.scrollHeight,
      });

      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `${title.replace(/\s+/g, '_')}.png`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          setOpenDownloadPopover(false);
        }
        setIsGenerating(false);
      }, 'image/png');
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Failed to generate PNG. Please try again.');
      setIsGenerating(false);
    }
  };

  // FIXED: JPEG Download Handler
  const handleDownloadJPEG = async () => {
    if (!contentRef.current) {
      console.error('Content ref is not available');
      return;
    }

    try {
      setIsGenerating(true);
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        windowWidth: contentRef.current.scrollWidth,
        windowHeight: contentRef.current.scrollHeight,
      });

      canvas.toBlob(
        blob => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `${title.replace(/\s+/g, '_')}.jpeg`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            setOpenDownloadPopover(false);
          }
          setIsGenerating(false);
        },
        'image/jpeg',
        0.95
      );
    } catch (error) {
      console.error('Error generating JPEG:', error);
      alert('Failed to generate JPEG. Please try again.');
      setIsGenerating(false);
    }
  };

  // FIXED: SVG Download Handler
  const handleDownloadSVG = async () => {
    if (!contentRef.current) {
      console.error('Content ref is not available');
      return;
    }

    try {
      const svgElement = contentRef.current.querySelector('svg');

      if (!svgElement) {
        alert('No chart found. SVG download only works with chart views.');
        return;
      }

      const clonedSvg = svgElement.cloneNode(true) as SVGElement;

      if (!clonedSvg.getAttribute('xmlns')) {
        clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      }

      const svgData = new XMLSerializer().serializeToString(clonedSvg);
      const svgBlob = new Blob([svgData], {
        type: 'image/svg+xml;charset=utf-8',
      });
      const url = URL.createObjectURL(svgBlob);

      const link = document.createElement('a');
      link.download = `${title.replace(/\s+/g, '_')}.svg`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setOpenDownloadPopover(false);
    } catch (error) {
      console.error('Error downloading SVG:', error);
      alert('Failed to download SVG. Please try again.');
    }
  };

  // FIXED: Copy as Image Handler
  const handleCopyAsImage = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      canvas.toBlob(async blob => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ]);
            console.log('Image copied to clipboard');
            setOpenCopyPopover(false);
          } catch (err) {
            console.error('Failed to copy image:', err);
            alert('Failed to copy image to clipboard');
          }
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error copying image:', error);
      alert('Failed to copy image');
    }
  };

  // View As menu items
  const viewAsMenuItems = [
    {
      title: 'Table',
      icon: <Table className='h-4 w-4' />,
      value: 'table',
      onClick: () => {
        setDefaultView('table');
        setOpenViewAsPopover(false);
      },
    },
    {
      title: 'Bar Chart',
      icon: <BarChart3 className='h-4 w-4' />,
      value: 'bar-chart',
      onClick: () => {
        setDefaultView('bar-chart');
        setOpenViewAsPopover(false);
      },
    },
    {
      title: 'Line Chart',
      icon: <LineChart className='h-4 w-4' />,
      value: 'line-chart',
      onClick: () => {
        setDefaultView('line-chart');
        setOpenViewAsPopover(false);
      },
    },
    {
      title: 'Pie Chart',
      icon: <PieChart className='h-4 w-4' />,
      value: 'pie-chart',
      onClick: () => {
        setDefaultView('pie-chart');
        setOpenViewAsPopover(false);
      },
    },
    {
      title: 'Stacked Chart',
      icon: <BarChart3 className='h-4 w-4' />,
      value: 'stacked-chart',
      onClick: () => {
        setDefaultView('stacked-chart');
        setOpenViewAsPopover(false);
      },
    },
    {
      title: 'Grouped Chart',
      icon: <BarChart3 className='h-4 w-4' />,
      value: 'grouped-chart',
      onClick: () => {
        setDefaultView('grouped-chart');
        setOpenViewAsPopover(false);
      },
    },
    {
      title: 'Multi Line Chart',
      icon: <LineChart className='h-4 w-4' />,
      value: 'multi-line',
      onClick: () => {
        setDefaultView('multi-line');
        setOpenViewAsPopover(false);
      },
    },
  ];

  // Download menu items
  const downloadMenuItems = [
    {
      title: 'SVG',
      icon: <Svg />,
      onClick: handleDownloadSVG,
    },
    {
      title: 'PNG',
      icon: <Png />,
      onClick: handleDownloadPNG,
    },
    {
      title: 'JPEG',
      icon: <Jpeg />,
      onClick: handleDownloadJPEG,
    },
    {
      title: 'PDF',
      icon: <Pdf />,
      onClick: handleDownloadPDF,
    },
  ];

  // Copy menu items
  const copyMenuItems = [
    {
      title: 'Copy as image',
      icon: <Copy className='h-4 w-4' />,
      onClick: handleCopyAsImage,
    },
    {
      title: 'Copy data',
      icon: <Table className='h-4 w-4' />,
      onClick: () => {
        console.log('Copy data');
        setOpenCopyPopover(false);
      },
    },
  ];

  // Add menu items
  const addMenuItems = [
    {
      title: 'Add to dashboard',
      icon: <PieChart className='h-4 w-4' />,
      onClick: () => {
        setOpenAddTodashboard(true);
        setOpenAddPopover(false);
      },
    },
    {
      title: 'Schedule recurring',
      icon: <Clock className='!text-neutral-ct-secondary' size={18} />,
      onClick: () => {
        setOpenScheduleRecurringModal(true);
        setOpenAddPopover(false);
      },
    },
  ];

  // Maximize menu items
  const maximizeMenuItems = [
    {
      title: 'Full screen',
      icon: <Maximize2 className='h-4 w-4' />,
      onClick: () => {
        if (contentRef.current) {
          contentRef.current.requestFullscreen?.();
        }
        setOpenMaximizePopover(false);
      },
    },
    {
      title: 'Expand view',
      icon: <Maximize2 className='h-4 w-4' />,
      onClick: () => {
        console.log('Expand view');
        setOpenMaximizePopover(false);
      },
    },
  ];

  // View switcher function
  const renderView = () => {
    switch (defaultView) {
      case 'table':
        return <InvoiceViewTable />;
      case 'bar-chart':
        return <SimpleChart />;
      case 'line-chart':
        return <LineChartComp />;
      case 'pie-chart':
        return <DonutChart />;
      case 'stacked-chart':
        return <StackedChart />;
      case 'grouped-chart':
        return <GroupedChart />;
      case 'multi-line':
        return <MultiLineChart />;
      default:
        return <InvoiceViewTable />;
    }
  };

  return (
    <div className='bg-white rounded-lg border border-neutral-br-disabled'>
      <div className='flex md:flex-row flex-col md:items-center gap-2 justify-between p-4 '>
        <h3 className='text-lg font-semibold text-neutral-ct-primary'>
          {title}
        </h3>
        <div className='flex items-center '>
          {/* View As Popover */}
          <Popover open={openViewAsPopover} onOpenChange={setOpenViewAsPopover}>
            {!hideViewAs && (
              <PopoverTrigger asChild>
                <button className='px-3 py-1.5 text-xs cursor-pointer font-semibold text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md flex items-center transition-colors'>
                  View As
                  <ChevronDown className='w-3 h-3 ml-1' />
                </button>
              </PopoverTrigger>
            )}
            <PopoverContent
              className='w-[180px] p-0'
              align='start'
              sideOffset={6}
            >
              {viewAsMenuItems.map((item, index) => (
                <button
                  key={index}
                  className={cn(
                    defaultView === item.value && 'bg-neutral-secondary',
                    'w-full flex items-center justify-between gap-2 px-3 py-2.5 hover:bg-neutral-secondary rounded-md transition-colors text-sm text-neutral-ct-primary'
                  )}
                  onClick={item.onClick}
                  type='button'
                >
                  <div className='flex items-center gap-2 text-xs'>
                    <span className='text-neutral-ct-secondary flex items-center'>
                      {item.icon}
                    </span>
                    <span>{item.title}</span>
                  </div>
                  {defaultView === item.value && (
                    <Check className='h-4 w-4 text-neutral-ct-primary' />
                  )}
                </button>
              ))}
            </PopoverContent>
          </Popover>

          {/* Add Popover */}
          <Popover open={openAddPopover} onOpenChange={setOpenAddPopover}>
            {!HideAddToDashboard && (
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    openAddPopover && '!text-brand-ct-brand',
                    'h-8 w-8 flex cursor-pointer items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
                  )}
                >
                  <PiPlusSquare className='w-4 h-4' />
                </button>
              </PopoverTrigger>
            )}
            <PopoverContent
              className='w-[250px] p-0'
              align='start'
              sideOffset={6}
            >
              {addMenuItems.map((item, index) => (
                <button
                  key={index}
                  className='w-full flex items-center gap-2 px-3 py-2.5 hover:bg-neutral-secondary rounded-md transition-colors text-sm text-neutral-ct-primary'
                  onClick={item.onClick}
                  type='button'
                >
                  <span className='text-neutral-ct-secondary flex items-center'>
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </button>
              ))}
            </PopoverContent>
          </Popover>

          {/* Copy Popover */}
          <Popover open={openCopyPopover} onOpenChange={setOpenCopyPopover}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  openCopyPopover && '!text-brand-ct-brand',
                  'h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
                )}
              >
                <Copy className='w-3 h-3' />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className='w-[150px] p-0'
              align='start'
              sideOffset={6}
            >
              {copyMenuItems.map((item, index) => (
                <button
                  key={index}
                  className='w-full flex items-center gap-2 px-3 py-2.5 hover:bg-neutral-secondary rounded-md transition-colors text-sm text-neutral-ct-primary'
                  onClick={item.onClick}
                  type='button'
                >
                  <span className='text-neutral-ct-secondary flex items-center'>
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </button>
              ))}
            </PopoverContent>
          </Popover>

          {/* Download Popover */}
          <Popover
            open={openDownloadPopover}
            onOpenChange={setOpenDownloadPopover}
          >
            <PopoverTrigger asChild>
              <button
                className={cn(
                  openDownloadPopover && '!text-brand-ct-brand',
                  'h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
                )}
              >
                <Download className='w-3 h-3' />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className='w-[120px] p-0'
              align='start'
              sideOffset={6}
            >
              {downloadMenuItems.map((item, index) => (
                <button
                  key={index}
                  className='w-full flex cursor-pointer items-center gap-2 px-3 py-2.5 hover:bg-neutral-secondary rounded-md transition-colors text-sm text-neutral-ct-primary'
                  onClick={item.onClick}
                  type='button'
                >
                  <span className='text-neutral-ct-secondary flex items-center'>
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </button>
              ))}
            </PopoverContent>
          </Popover>

          {/* Maximize Popover */}
          <Popover
            open={openMaximizePopover}
            onOpenChange={setOpenMaximizePopover}
          >
            {!hideExtentView && (
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    openMaximizePopover && '!text-brand-ct-brand',
                    'h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
                  )}
                >
                  <Maximize2 className='w-3 h-3' />
                </button>
              </PopoverTrigger>
            )}
            <PopoverContent
              className='w-[150px] p-0'
              align='start'
              sideOffset={6}
            >
              {maximizeMenuItems.map((item, index) => (
                <button
                  key={index}
                  className='w-full flex items-center gap-2 px-3 py-2.5 hover:bg-neutral-secondary rounded-md transition-colors text-sm text-neutral-ct-primary'
                  onClick={item.onClick}
                  type='button'
                >
                  <span className='text-neutral-ct-secondary flex items-center'>
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </button>
              ))}
            </PopoverContent>
          </Popover>

          {showDelete && (
            <button
              className={cn(
                openMaximizePopover && '!text-brand-ct-brand',
                'h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
              )}
            >
              <Trash size={12} className='text-sm text-error-ct-error' />
            </button>
          )}
        </div>
      </div>
      <div className='md:px-4 pt-2 pb-4' ref={contentRef}>
        {renderView()}
      </div>
      <AddToDashboard
        open={openAddTodashboardModal}
        onOpenChange={() => setOpenAddTodashboard(false)}
      />
      <ScheduleRecurring
        open={openScheduleRecurringModal}
        onOpenChange={() => setOpenScheduleRecurringModal(false)}
      />
    </div>
  );
};

export default InvoiceView;

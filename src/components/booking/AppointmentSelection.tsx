import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Appointment } from '@/types/booking';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Dummy data for available time slots
const AVAILABLE_SLOTS = [
  '09:00 AM',
  '11:00 AM',
  '01:00 PM',
  '03:00 PM',
  '05:00 PM',
];

interface AppointmentSelectionProps {
  selectedAppointment?: Appointment;
  onAppointmentSelect: (appointment: Appointment) => void;
  onBack: () => void;
  onNext: () => void;
}

export function AppointmentSelection({
  selectedAppointment,
  onAppointmentSelect,
  onBack,
  onNext,
}: AppointmentSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    selectedAppointment ? new Date(selectedAppointment.date) : undefined
  );

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && selectedAppointment?.time) {
      onAppointmentSelect({
        date: format(date, 'yyyy-MM-dd'),
        time: selectedAppointment.time,
      });
    }
  };

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      onAppointmentSelect({
        date: format(selectedDate, 'yyyy-MM-dd'),
        time,
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Select an Appointment Time</h2>
        <p className="text-lg text-muted-foreground">
          Choose a date and time that works best for you
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="font-medium mb-4">Select a Date</h3>
          <div className="p-4 bg-card rounded-lg border">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="mx-auto"
              classNames={{
                months: "space-y-4",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: cn(
                  "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
                  "[&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md"
                ),
                day: cn(
                  "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground",
                  "rounded-md"
                ),
                day_range_end: "day-range-end",
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside:
                  "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                  "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
              disabled={(date) => date < new Date() || date > new Date(2024, 11, 31)}
            />
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Available Time Slots</h3>
          <div className="grid gap-2">
            {AVAILABLE_SLOTS.map((time) => (
              <Card
                key={time}
                className={cn(
                  'cursor-pointer p-4 transition-all duration-200 hover:scale-[1.02]',
                  'border-2',
                  selectedAppointment?.time === time
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                )}
                onClick={() => handleTimeSelect(time)}
              >
                <p className="font-medium">{time}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          size="lg"
          disabled={!selectedAppointment?.date || !selectedAppointment?.time}
          onClick={onNext}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
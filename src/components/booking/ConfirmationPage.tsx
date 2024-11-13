import { BookingState } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface ConfirmationPageProps {
  bookingState: BookingState;
}

export function ConfirmationPage({ bookingState }: ConfirmationPageProps) {
  return (
    <div className="text-center space-y-8">
      <div className="flex justify-center">
        <CheckCircle className="h-24 w-24 text-green-500" />
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
        <p className="text-lg text-muted-foreground">
          Thank you, {bookingState.contactName}! Your appointment has been scheduled.
        </p>
      </div>

      <div className="bg-muted/50 p-6 rounded-lg max-w-md mx-auto">
        <h3 className="font-semibold text-lg mb-4">Appointment Details</h3>
        <div className="space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service:</span>
            <span className="font-medium">{bookingState.product?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Issue:</span>
            <span className="font-medium">{bookingState.issueType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">
              {bookingState.appointment?.date &&
                format(new Date(bookingState.appointment.date), 'MMMM d, yyyy')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time:</span>
            <span className="font-medium">{bookingState.appointment?.time}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Preparation Checklist</h3>
        <ul className="max-w-md mx-auto text-left space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Secure any pets before the technician arrives</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Clear access to the service area</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Have your phone nearby for the arrival call</span>
          </li>
        </ul>
      </div>

      <div className="pt-4">
        <Button
          size="lg"
          onClick={() => window.location.reload()}
        >
          Book Another Service
        </Button>
      </div>
    </div>
  );
}
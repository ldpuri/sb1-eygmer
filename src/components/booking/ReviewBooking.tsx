import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookingState } from '@/types/booking';
import { format } from 'date-fns';

interface ReviewBookingProps {
  bookingState: BookingState;
  onContactInfoChange: (name: string, phone: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function ReviewBooking({
  bookingState,
  onContactInfoChange,
  onBack,
  onNext,
}: ReviewBookingProps) {
  const [name, setName] = useState(bookingState.contactName || '');
  const [phone, setPhone] = useState(bookingState.contactPhone || '');

  const handleSubmit = () => {
    onContactInfoChange(name, phone);
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Review Your Booking</h2>
        <p className="text-lg text-muted-foreground">
          Please review your service details and provide your contact information
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-muted/50 p-6 rounded-lg space-y-4">
          <h3 className="font-semibold text-lg">Booking Summary</h3>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-medium">{bookingState.product?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Issue:</span>
              <span className="font-medium">{bookingState.issueType}</span>
            </div>
            {bookingState.notes && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Notes:</span>
                <span className="font-medium">{bookingState.notes}</span>
              </div>
            )}
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
          <h3 className="font-semibold text-lg">Contact Information</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          size="lg"
          disabled={!name || !phone}
          onClick={handleSubmit}
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}
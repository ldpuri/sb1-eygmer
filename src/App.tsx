import { useState } from 'react';
import { BookingState, PRODUCTS } from './types/booking';
import { ProgressBar } from './components/booking/ProgressBar';
import { ProductSelection } from './components/booking/ProductSelection';
import { IssueSelection } from './components/booking/IssueSelection';
import { AppointmentSelection } from './components/booking/AppointmentSelection';
import { ReviewBooking } from './components/booking/ReviewBooking';
import { ConfirmationPage } from './components/booking/ConfirmationPage';

const TOTAL_STEPS = 5;

export default function App() {
  const [bookingState, setBookingState] = useState<BookingState>({
    step: 1,
  });

  const handleNext = () => {
    if (bookingState.step < TOTAL_STEPS) {
      setBookingState((prev) => ({
        ...prev,
        step: prev.step + 1,
      }));
    }
  };

  const handleBack = () => {
    if (bookingState.step > 1) {
      setBookingState((prev) => ({
        ...prev,
        step: prev.step - 1,
      }));
    }
  };

  const renderStep = () => {
    switch (bookingState.step) {
      case 1:
        return (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold mb-4">
                Welcome! Let's help you schedule a service appointment.
              </h1>
              <p className="text-lg text-muted-foreground">
                Select the type of service you need assistance with.
              </p>
            </div>
            <ProductSelection
              products={PRODUCTS}
              selectedProduct={bookingState.product}
              onProductSelect={(product) =>
                setBookingState((prev) => ({ ...prev, product }))
              }
              onNext={handleNext}
            />
          </>
        );
      case 2:
        return (
          <IssueSelection
            product={bookingState.product!}
            selectedIssue={bookingState.issueType}
            notes={bookingState.notes}
            onIssueSelect={(issueType) =>
              setBookingState((prev) => ({ ...prev, issueType }))
            }
            onNotesChange={(notes) =>
              setBookingState((prev) => ({ ...prev, notes }))
            }
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <AppointmentSelection
            selectedAppointment={bookingState.appointment}
            onAppointmentSelect={(appointment) =>
              setBookingState((prev) => ({ ...prev, appointment }))
            }
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <ReviewBooking
            bookingState={bookingState}
            onContactInfoChange={(name, phone) =>
              setBookingState((prev) => ({
                ...prev,
                contactName: name,
                contactPhone: phone,
              }))
            }
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 5:
        return <ConfirmationPage bookingState={bookingState} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background w-screen">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {bookingState.step < TOTAL_STEPS && (
          <ProgressBar currentStep={bookingState.step} totalSteps={TOTAL_STEPS - 1} />
        )}
        <div className="max-w-4xl mx-auto">{renderStep()}</div>
      </main>
    </div>
  );
}
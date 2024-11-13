import { Product } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface IssueSelectionProps {
  product: Product;
  selectedIssue?: string;
  notes?: string;
  onIssueSelect: (issue: string) => void;
  onNotesChange: (notes: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function IssueSelection({
  product,
  selectedIssue,
  notes,
  onIssueSelect,
  onNotesChange,
  onBack,
  onNext,
}: IssueSelectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">What's the issue?</h2>
        <p className="text-lg text-muted-foreground">
          Select the issue you're experiencing with your {product.name.toLowerCase()} system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {product.issues.map((issue) => (
          <Card
            key={issue}
            className={cn(
              'cursor-pointer p-4 transition-all duration-200 hover:scale-[1.02]',
              'border-2',
              selectedIssue === issue
                ? 'border-primary bg-primary/5'
                : 'hover:border-primary/50'
            )}
            onClick={() => onIssueSelect(issue)}
          >
            <p className="font-medium">{issue}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-muted-foreground">
          Additional Notes (optional)
        </label>
        <Textarea
          placeholder="Provide any additional details that might help our technician..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          size="lg"
          disabled={!selectedIssue}
          onClick={onNext}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
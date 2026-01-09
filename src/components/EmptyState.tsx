import { FileQuestion } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="text-center py-16">
      <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="font-display text-xl font-bold mb-2">
        Tady zatím nic není.
      </h3>
      <p className="text-muted-foreground">
        Zkus změnit filtry nebo se mrkni na jiné téma.
      </p>
    </div>
  );
};

export default EmptyState;

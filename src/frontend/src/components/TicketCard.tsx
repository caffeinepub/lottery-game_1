import { Card, CardContent } from '@/components/ui/card';
import { Ticket as TicketIcon } from 'lucide-react';
import type { Ticket } from '../backend';

interface TicketCardProps {
  ticket: Ticket;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <Card className="border-2 border-lottery-gold/20 bg-gradient-to-br from-lottery-gold/5 to-lottery-prize/5 hover:border-lottery-gold/40 transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-lottery-gold to-lottery-prize p-2 rounded-lg shadow-sm">
              <TicketIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Ticket ID</p>
              <p className="text-2xl font-black text-lottery-gold">
                #{ticket.id.toString().padStart(6, '0')}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground font-medium">Owner</p>
            <p className="text-sm font-bold text-foreground">
              User {ticket.owner.toString()}
            </p>
          </div>
        </div>
        
        {/* Decorative ticket perforations */}
        <div className="mt-3 pt-3 border-t border-dashed border-lottery-gold/30 flex justify-between">
          <div className="flex gap-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-lottery-gold/30" />
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic">Good Luck!</p>
        </div>
      </CardContent>
    </Card>
  );
}

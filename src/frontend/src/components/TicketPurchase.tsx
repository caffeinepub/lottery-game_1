import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Ticket, Loader2 } from 'lucide-react';
import { useBuyTicket } from '../hooks/useQueries';
import { toast } from 'sonner';

export default function TicketPurchase() {
  const [userId, setUserId] = useState('1');
  const buyTicketMutation = useBuyTicket();

  const handleBuyTicket = async () => {
    try {
      const userIdNum = BigInt(userId);
      const ticketId = await buyTicketMutation.mutateAsync(userIdNum);
      toast.success('Ticket Purchased!', {
        description: `Your ticket #${ticketId} has been purchased successfully. Good luck!`,
        duration: 5000,
      });
    } catch (error) {
      toast.error('Purchase Failed', {
        description: error instanceof Error ? error.message : 'Failed to purchase ticket',
      });
    }
  };

  return (
    <Card className="border-2 border-lottery-gold/30 shadow-xl bg-card/95 backdrop-blur h-fit">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-lottery-gold to-lottery-prize p-2 rounded-lg shadow-md">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-lottery-gold">Buy Lottery Ticket</CardTitle>
            <CardDescription>Purchase your lucky ticket and enter the draw!</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Ticket illustration */}
        <div className="relative rounded-xl overflow-hidden border-2 border-lottery-gold/20 shadow-lg">
          <img 
            src="/assets/generated/lottery-ticket.dim_400x250.png" 
            alt="Lottery Ticket"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <p className="text-white font-bold text-lg">Your Next Winning Ticket!</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId" className="text-sm font-semibold">
              User ID
            </Label>
            <Input
              id="userId"
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your user ID"
              className="border-lottery-gold/30 focus:border-lottery-gold"
              min="1"
            />
            <p className="text-xs text-muted-foreground">
              Enter a unique user ID to identify your tickets
            </p>
          </div>

          <Button
            onClick={handleBuyTicket}
            disabled={buyTicketMutation.isPending || !userId}
            className="w-full bg-gradient-to-r from-lottery-gold to-lottery-prize hover:from-lottery-gold/90 hover:to-lottery-prize/90 text-white font-bold text-lg py-6 shadow-lg"
          >
            {buyTicketMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Purchasing...
              </>
            ) : (
              <>
                <Ticket className="w-5 h-5 mr-2" />
                Buy Ticket Now
              </>
            )}
          </Button>
        </div>

        <div className="bg-lottery-gold/5 border border-lottery-gold/20 rounded-lg p-4">
          <p className="text-sm text-center text-muted-foreground">
            Each ticket gives you a chance to win! The more tickets you buy, the better your odds.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

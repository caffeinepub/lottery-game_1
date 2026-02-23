import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Ticket as TicketIcon, Search, Loader2 } from 'lucide-react';
import { useGetAllTicketsByUser } from '../hooks/useQueries';
import TicketCard from './TicketCard';

export default function MyTickets() {
  const [userId, setUserId] = useState('1');
  const [searchUserId, setSearchUserId] = useState<bigint | null>(BigInt(1));
  
  const { data: tickets, isLoading, refetch } = useGetAllTicketsByUser(searchUserId);

  const handleSearch = () => {
    if (userId) {
      setSearchUserId(BigInt(userId));
      refetch();
    }
  };

  return (
    <Card className="border-2 border-lottery-green/30 shadow-xl bg-card/95 backdrop-blur h-fit lg:sticky lg:top-4">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-lottery-green to-lottery-gold p-2 rounded-lg shadow-md">
            <TicketIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-lottery-green">My Tickets</CardTitle>
            <CardDescription>View all your purchased lottery tickets</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 space-y-2">
            <Label htmlFor="searchUserId" className="text-sm font-semibold">
              Search by User ID
            </Label>
            <Input
              id="searchUserId"
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
              className="border-lottery-green/30 focus:border-lottery-green"
              min="1"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              disabled={!userId}
              className="bg-lottery-green hover:bg-lottery-green/90 text-white"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-lottery-green" />
          </div>
        ) : tickets && tickets.length > 0 ? (
          <>
            <div className="bg-lottery-green/5 border border-lottery-green/20 rounded-lg p-3">
              <p className="text-sm font-semibold text-center">
                Total Tickets: <span className="text-lottery-green text-lg">{tickets.length}</span>
              </p>
            </div>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <TicketCard key={ticket.id.toString()} ticket={ticket} />
                ))}
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <TicketIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">No tickets found</p>
              <p className="text-sm text-muted-foreground">
                {searchUserId ? 'This user has not purchased any tickets yet.' : 'Enter a user ID to search.'}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

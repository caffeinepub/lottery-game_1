import { useInternetIdentity } from './hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket, Trophy, Sparkles } from 'lucide-react';
import TicketPurchase from './components/TicketPurchase';
import MyTickets from './components/MyTickets';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function App() {
  const { identity, login, clear, loginStatus, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-lottery-gold/10 via-background to-lottery-green/10 relative overflow-hidden">
        {/* Background pattern */}
        <div 
          className="fixed inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'url(/assets/generated/lottery-bg.dim_1920x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Animated sparkles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <Sparkles className="absolute top-20 left-10 w-6 h-6 text-lottery-gold animate-pulse" />
          <Sparkles className="absolute top-40 right-20 w-4 h-4 text-lottery-green animate-pulse delay-300" />
          <Sparkles className="absolute bottom-32 left-1/4 w-5 h-5 text-lottery-prize animate-pulse delay-700" />
          <Sparkles className="absolute top-1/3 right-1/3 w-4 h-4 text-lottery-gold animate-pulse delay-500" />
        </div>

        {/* Header */}
        <header className="relative z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-lottery-gold to-lottery-prize p-2 rounded-xl shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-lottery-gold via-lottery-prize to-lottery-green bg-clip-text text-transparent">
                    Lucky Draw
                  </h1>
                  <p className="text-sm text-muted-foreground">Your chance to win big!</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium">Connected</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {identity.getPrincipal().toString().slice(0, 8)}...
                      </p>
                    </div>
                    <Button onClick={clear} variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={login} 
                    disabled={isLoggingIn}
                    className="bg-gradient-to-r from-lottery-gold to-lottery-prize hover:from-lottery-gold/90 hover:to-lottery-prize/90 text-white font-bold shadow-lg"
                  >
                    {isLoggingIn ? 'Connecting...' : 'Connect to Play'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 container mx-auto px-4 py-8">
          {!isAuthenticated ? (
            <div className="max-w-2xl mx-auto mt-12">
              <Card className="border-2 border-lottery-gold/20 shadow-2xl bg-card/95 backdrop-blur">
                <CardHeader className="text-center space-y-4 pb-8">
                  <div className="mx-auto bg-gradient-to-br from-lottery-gold to-lottery-prize p-4 rounded-2xl w-fit shadow-lg">
                    <Ticket className="w-16 h-16 text-white" />
                  </div>
                  <CardTitle className="text-4xl font-black bg-gradient-to-r from-lottery-gold via-lottery-prize to-lottery-green bg-clip-text text-transparent">
                    Welcome to Lucky Draw!
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Connect your wallet to purchase lottery tickets and win amazing prizes!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-lottery-gold/5 border border-lottery-gold/20">
                      <div className="bg-lottery-gold/20 p-2 rounded-lg">
                        <Ticket className="w-5 h-5 text-lottery-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lottery-gold">Buy Tickets</h3>
                        <p className="text-sm text-muted-foreground">Purchase lottery tickets with unique numbers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-lottery-green/5 border border-lottery-green/20">
                      <div className="bg-lottery-green/20 p-2 rounded-lg">
                        <Sparkles className="w-5 h-5 text-lottery-green" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lottery-green">Wait for Draw</h3>
                        <p className="text-sm text-muted-foreground">Drawings happen regularly to select winners</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-lottery-prize/5 border border-lottery-prize/20">
                      <div className="bg-lottery-prize/20 p-2 rounded-lg">
                        <Trophy className="w-5 h-5 text-lottery-prize" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lottery-prize">Win Prizes</h3>
                        <p className="text-sm text-muted-foreground">Check if your ticket won amazing rewards</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={login} 
                    disabled={isLoggingIn}
                    className="w-full bg-gradient-to-r from-lottery-gold to-lottery-prize hover:from-lottery-gold/90 hover:to-lottery-prize/90 text-white font-bold text-lg py-6 shadow-lg"
                  >
                    {isLoggingIn ? 'Connecting...' : 'Connect Wallet to Start'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
              <TicketPurchase />
              <MyTickets />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="relative z-10 mt-16 border-t border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Lucky Draw. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                Built with <span className="text-lottery-prize">♥</span> using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-foreground transition-colors"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;

import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  type TicketId = Nat;
  type UserId = Nat;

  type Ticket = {
    id : TicketId;
    owner : UserId;
  };

  let tickets = Map.empty<TicketId, Ticket>();
  var nextTicketId = 0;

  public shared ({ caller }) func buyTicket(userId : UserId) : async TicketId {
    let ticket = {
      id = nextTicketId;
      owner = userId;
    };
    tickets.add(nextTicketId, ticket);
    nextTicketId += 1;
    ticket.id;
  };

  public query ({ caller }) func getTicket(ticketId : TicketId) : async Ticket {
    switch (tickets.get(ticketId)) {
      case (null) { Runtime.trap("Ticket not found") };
      case (?ticket) { ticket };
    };
  };

  public query ({ caller }) func getAllTicketsByUser(userId : UserId) : async [Ticket] {
    tickets.values().toArray().filter(
      func(ticket) {
        ticket.owner == userId;
      }
    );
  };
};

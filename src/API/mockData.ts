export type Currency = 'Euro' | 'Dollars' | 'Sterling' | 'Yen';

export interface UserAccount {
    name: string;
    id: string;
    email: string;
    currency: Currency;
    balance: number;
  }
  
  export const mockAccounts: UserAccount[] = [
    { name: "Alice Johnson", id: "aj101", email: "alice.j@example.com", currency: "Euro", balance: 1200.50},
    { name: "Bob Smith", id: "bs202", email: "bob.s@example.com", currency: "Dollars", balance: 2300.00 },
    { name: "Charlie Brown", id: "cb303", email: "charlie.b@example.com", currency: "Sterling", balance: 1500.75 },
    { name: "Diana Prince", id: "dp404", email: "diana.p@example.com", currency: "Yen", balance: 3000.20 },
    { name: "Ethan Hunt", id: "eh505", email: "ethan.h@example.com", currency: "Euro", balance: 500.00 },
    { name: "Fiona Gallagher", id: "fg606", email: "fiona.g@example.com", currency: "Dollars", balance: 750.60 },
    { name: "George Bluth", id: "gb707", email: "george.b@example.com", currency: "Sterling", balance: 950.30 },
    { name: "Hannah Abbott", id: "ha808", email: "hannah.a@example.com", currency: "Yen", balance: 2200.10 },
    { name: "Ian Malcolm", id: "im909", email: "ian.m@example.com", currency: "Euro", balance: 3300.55 },
    { name: "Julia Child", id: "jc010", email: "julia.c@example.com", currency: "Dollars", balance: 800.40 },
    { name: "Kevin McCallister", id: "km111", email: "kevin.mc@example.com", currency: "Sterling", balance: 1230.00 },
    { name: "Laura Palmer", id: "lp212", email: "laura.p@example.com", currency: "Yen", balance: 2430.70 },
    { name: "Michael Scott", id: "ms313", email: "michael.s@example.com", currency: "Euro", balance: 540.25 },
    { name: "Nora Helmer", id: "nh414", email: "nora.h@example.com", currency: "Dollars", balance: 1260.00 },
    { name: "Oscar Martinez", id: "om515", email: "oscar.m@example.com", currency: "Sterling", balance: 2000.00 },
    { name: "Paula Abdul", id: "pa616", email: "paula.a@example.com", currency: "Yen", balance: 1300.50 },
    { name: "Quincy Jones", id: "qj717", email: "quincy.j@example.com", currency: "Euro", balance: 2400.80 },
    { name: "Rachel Green", id: "rg818", email: "rachel.g@example.com", currency: "Dollars", balance: 3600.00 },
    { name: "Steve Jobs", id: "sj919", email: "steve.j@example.com", currency: "Sterling", balance: 4200.00 },
    { name: "Tina Fey", id: "tf020", email: "tina.f@example.com", currency: "Yen", balance: 2100.30 }
  ];
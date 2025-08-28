// Interface pour Currency
interface Currency {
  id: string;
  name: string;
  value: number;
  symbol: string;
  row_id: string;
  created_at: string;
  updated_at: string;
  created_by: null | string; // Peut être null ou une chaîne
  updated_by: null | string; // Peut être null ou une chaîne
}

// Interface pour Transaction
interface Transaction {
  id: number;
  transaction_type: "expense" | "income"; // Type littéral pour les valeurs possibles
  amount: number;
  description: string;
  currency: Currency;
  created_at: string;
  updated_at: string;
  updated_by: null | string; // Peut être null ou une chaîne
}

// Interface pour l'objet principal
interface TransactionsByDate {
  date: string; // Date au format 'Y-m-d'
  name: string; // Nom de l'utilisateur
  ticket_counter_name: string;
  transactions: Transaction[]; // Tableau de transactions
}
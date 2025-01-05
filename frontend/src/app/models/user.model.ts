export interface User {
  id?: number;  // L'ID est maintenant optionnel
  fname: string;
  lname: string;
  email: string;
  password: string;
  birth_date: string;
  genre: string;
  preferred_type: string;
  created_at?: string;  // Optionnel
  updated_at?: string;  // Optionnel
}

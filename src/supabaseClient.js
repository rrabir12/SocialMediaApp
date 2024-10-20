import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wukzqcsjagllwmjsorje.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1a3pxY3NqYWdsbHdtanNvcmplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzOTgxOTgsImV4cCI6MjA0NDk3NDE5OH0.ExStwgNQw9moUXsBwC8VdNaqKdEx-Q0o2SCXtAEqg68';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


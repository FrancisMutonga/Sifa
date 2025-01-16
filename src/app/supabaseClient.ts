import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dhfedbhukegetgfyhghu.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoZmVkYmh1a2VnZXRnZnloZ2h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MDEzMTUsImV4cCI6MjA0ODE3NzMxNX0.geYjERgawxekdb5V9BhhkqhS50y7Aa9lD6smCoFBV7o'; 

export const supabase = createClient(supabaseUrl, supabaseKey);

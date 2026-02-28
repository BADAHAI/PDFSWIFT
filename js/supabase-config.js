// js/supabase-config.js

// إعدادات Supabase الخاصة بمشروعك
const supabaseUrl = "https://lcfuwhzrdgophtttewro.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZnV3aHpyZGdvcGh0dHRld3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1MDUwNTYsImV4cCI6MjAzNzA4MTA1Nn0.Kb7_3w_7gYnV7mH8K0cJ1W4f3h5w6Z7X8Y9Z0A1B2C3";

// إنشاء عميل Supabase
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Supabase Client Configuration
 * 
 * This module provides a Supabase client that gracefully falls back to
 * demo/mock mode when credentials are not configured. This allows the app
 * to work immediately for demos while being production-ready for real deployment.
 * 
 * To enable real Supabase:
 * 1. Create a .env file with:
 *    VITE_SUPABASE_URL=https://your-project.supabase.co
 *    VITE_SUPABASE_ANON_KEY=your-anon-key
 * 2. Restart the dev server
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Create real client if configured, otherwise create a mock
let supabase: SupabaseClient;

if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a dummy client - we'll use our mock layer instead
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key', {
    auth: { persistSession: false },
  });
}

export { supabase };

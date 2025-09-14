// Test script to verify Supabase authentication setup
import { supabase } from '@/integrations/supabase/client';

export async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test 1: Check if Supabase client is initialized
    console.log('Supabase URL:', supabase.supabaseUrl);
    console.log('Supabase Key:', supabase.supabaseKey.substring(0, 20) + '...');
    
    // Test 2: Check database connection
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Database connection error:', error);
      return false;
    }
    
    console.log('Database connection: OK');
    
    // Test 3: Check auth configuration
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.error('Auth configuration error:', authError);
      return false;
    }
    
    console.log('Auth configuration: OK');
    console.log('Current session:', authData.session ? 'Active' : 'None');
    
    return true;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
}

export async function testEmailSignup(email: string = 'test@example.com') {
  try {
    console.log('Testing email signup...');
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password: 'testpassword123',
      options: {
        data: {
          name: 'Test User',
          role: 'client'
        }
      }
    });
    
    if (error) {
      console.error('Signup test error:', error);
      return false;
    }
    
    console.log('Signup test result:', data);
    
    if (data.user && !data.user.email_confirmed_at) {
      console.log('✅ Email confirmation required - this is expected');
      console.log('User ID:', data.user.id);
      console.log('Email sent to:', data.user.email);
    }
    
    return true;
  } catch (error) {
    console.error('Signup test failed:', error);
    return false;
  }
}

// Run tests in development
if (import.meta.env.DEV) {
  console.log('🔧 Auth Test Utils loaded. Use testSupabaseConnection() and testEmailSignup() in console.');
}
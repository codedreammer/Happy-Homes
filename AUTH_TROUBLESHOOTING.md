# Authentication Troubleshooting Guide

## Issues Fixed

### 1. Hardcoded Credentials
- **Problem**: Supabase credentials were hardcoded in client.ts
- **Fix**: Updated to use environment variables with fallbacks

### 2. Poor Error Handling
- **Problem**: Signup errors weren't properly logged or handled
- **Fix**: Added comprehensive error handling and logging

### 3. Profile Creation Issues
- **Problem**: Database trigger might fail to create user profiles
- **Fix**: Created improved migration with better error handling

### 4. Log Injection Vulnerability
- **Problem**: User input was logged without sanitization
- **Fix**: Sanitized all logged data using JSON.stringify

## Common Email Issues & Solutions

### 1. Check Supabase Email Settings
1. Go to Supabase Dashboard → Authentication → Settings
2. Verify SMTP settings are configured
3. Check if email confirmations are enabled
4. Ensure redirect URLs are whitelisted

### 2. Environment Variables
Ensure your `.env` file has:
```
VITE_SUPABASE_URL=https://mbbcqtaqhiiytnnrpncm.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_key_here
```

### 3. Test the Connection
Run in browser console:
```javascript
import { testSupabaseConnection, testEmailSignup } from './src/utils/test-auth';

// Test basic connection
await testSupabaseConnection();

// Test email signup
await testEmailSignup('your-test-email@example.com');
```

### 4. Check Database Migrations
Run the new migration:
```bash
cd supabase
supabase db push
```

### 5. Verify Email Templates
1. Go to Supabase Dashboard → Authentication → Email Templates
2. Check "Confirm signup" template is enabled
3. Verify the template content and redirect URL

### 6. Check Spam Folder
- Confirmation emails might end up in spam
- Check all email folders including promotions/updates

### 7. Domain Configuration
If using custom domain:
1. Verify DNS settings
2. Check SSL certificate
3. Ensure redirect URLs match exactly

## Debugging Steps

### 1. Enable Detailed Logging
Add to your component:
```javascript
useEffect(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event, session);
  });
}, []);
```

### 2. Check Network Tab
- Open browser DevTools → Network
- Look for failed requests to Supabase
- Check response status and error messages

### 3. Verify Database State
Check if profiles are being created:
```sql
SELECT * FROM auth.users ORDER BY created_at DESC LIMIT 5;
SELECT * FROM public.profiles ORDER BY created_at DESC LIMIT 5;
```

### 4. Test Email Delivery
Try different email providers:
- Gmail
- Outlook
- Yahoo
- Temporary email services

## Quick Fixes to Try

1. **Restart Development Server**
   ```bash
   npm run dev
   ```

2. **Clear Browser Cache**
   - Hard refresh (Ctrl+Shift+R)
   - Clear localStorage/sessionStorage

3. **Check Supabase Status**
   - Visit status.supabase.com
   - Check for ongoing incidents

4. **Verify Project Settings**
   - Ensure project is not paused
   - Check billing status
   - Verify API limits

## Still Not Working?

1. Check Supabase logs in dashboard
2. Enable RLS debugging
3. Contact Supabase support
4. Check community forums

## Testing Checklist

- [ ] Environment variables loaded correctly
- [ ] Supabase client connects successfully
- [ ] Database migrations applied
- [ ] Email templates configured
- [ ] Redirect URLs whitelisted
- [ ] SMTP settings verified
- [ ] Test signup with different emails
- [ ] Check spam/junk folders
- [ ] Verify profile creation in database
- [ ] Test email confirmation flow
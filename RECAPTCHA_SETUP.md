# ReCaptcha Setup Instructions

The contact form requires Google ReCaptcha v2 (Invisible) to prevent spam submissions.

## 1. Get ReCaptcha Keys

1. Go to [Google ReCaptcha Admin Console](https://www.google.com/recaptcha/admin)
2. Click **+ Create**
3. Fill in the registration form:
   - **Label**: Kenos Restaurant Contact Form
   - **ReCaptcha Type**: Select **reCAPTCHA v2** → **Invisible reCAPTCHA badge**
   - **Domains**: Add your domains
     - `localhost` (for development)
     - `kenosrestaurant.com` (or your production domain)
     - `5.78.72.94.sslip.io` (or your Coolify domain)
4. Accept the terms and click **Submit**
5. Copy the **Site Key** and **Secret Key**

## 2. Add Keys to Environment Variables

### Local Development (.env)

Add these lines to your `.env` file:

```bash
# ReCaptcha (Google ReCaptcha v2 Invisible)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

### Production (Coolify)

1. Go to Coolify dashboard
2. Select your Kenos website application
3. Go to **Environment Variables** section
4. Add two new variables:
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` = your_site_key_here
   - `RECAPTCHA_SECRET_KEY` = your_secret_key_here
5. Click **Save**
6. Redeploy the application

## 3. Test the Contact Form

1. Navigate to `/contact` on your website
2. Fill out the form with test data
3. Submit the form
4. Check for success message
5. Verify the submission appears in Payload Admin under **Forms** → **Contact Submissions**

## Troubleshooting

### "ReCaptcha is not configured" Error
- Make sure `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set in your environment
- Restart your dev server after adding the keys
- In production, redeploy after adding the keys to Coolify

### "ReCaptcha verification failed" Error
- Check that your domain is whitelisted in Google ReCaptcha console
- Verify `RECAPTCHA_SECRET_KEY` is correctly set
- Make sure you're using the correct keys (v2 Invisible, not v3)

### Rate Limiting
The contact form has built-in rate limiting:
- **Max 3 submissions per hour per IP address**
- If you need to adjust this, edit `/src/collections/ContactSubmissions.ts`

## Security Features

✅ ReCaptcha verification (prevents bots)
✅ Server-side validation
✅ Rate limiting by IP address
✅ Required field validation
✅ CSRF protection (built into Next.js)

## Contact Submission Flow

1. User fills out form on `/contact` page
2. ReCaptcha executes invisibly when form is submitted
3. Form data + ReCaptcha token sent to `/api/contact`
4. Server verifies ReCaptcha token with Google
5. Server validates required fields
6. Server checks rate limit
7. Submission saved to Payload CMS (`contact-submissions` collection)
8. Admin can view submissions in Payload Admin panel

## Viewing Submissions

1. Log in to Payload Admin: `http://localhost:3011/admin` (or your production URL)
2. Navigate to **Forms** → **Contact Submissions**
3. View, filter, and manage all contact form submissions
4. Update status: **New** → **Contacted** → **Resolved**

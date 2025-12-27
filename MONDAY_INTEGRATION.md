# Monday.com CRM Integration Setup

## Overview

Contact form submissions are automatically sent to:
1. **Monday.com** - Creates a lead item in your CRM board
2. **Email** - Sends notification via Gmail SMTP

## Required Environment Variables

Add these to your Coolify environment variables:

### Monday.com Integration

```bash
MONDAY_API_TOKEN=your_monday_api_token_here
MONDAY_BOARD_ID=your_board_id_here
```

**How to get these:**

1. **API Token:**
   - Go to https://monday.com
   - Click your profile picture → Admin → API
   - Click "Generate" to create a new API token
   - Copy the token (save it somewhere safe!)

2. **Board ID:**
   - Open your Leads board in Monday.com
   - Look at the URL: `https://monday.com/boards/1234567890`
   - The number is your Board ID

### Email Notifications

```bash
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_gmail_app_password
NOTIFY_EMAIL=where-to-send-notifications@example.com  # Optional, defaults to SMTP_USER
```

**How to get Gmail App Password:**

1. Go to your Google Account settings
2. Enable 2-Step Verification (if not already enabled)
3. Go to Security → 2-Step Verification → App passwords
4. Generate a new app password for "Mail"
5. Copy the 16-character password

⚠️ **Use App Password, NOT your regular Gmail password!**

### Spam Prevention (Already configured)

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

## Column Mapping in Monday.com

The integration expects your Monday.com board to have these columns:

| Column Type | Column Name | Maps From |
|-------------|-------------|-----------|
| Name | (Item Name) | Contact name |
| Email | `email` | Contact email |
| Text | `phone` | Phone number |
| Long Text | `text` or `message` | Message content |
| Status | `status` | Set to "New Lead" |

**Note:** Monday.com column IDs are case-sensitive. Adjust the `columnValues` in `ContactSubmissions.ts` if your column names are different.

## Testing the Integration

### 1. Test Locally

```bash
npm run dev
```

Visit http://localhost:3011/contact and submit the form.

Check console logs for:
- ✅ Lead created in Monday.com: [item_id]
- ✅ Email notification sent

### 2. Test in Production

After deploying to Coolify:
1. Submit a test form on your live site
2. Check Monday.com board for new lead
3. Check your notification email inbox

## Troubleshooting

### Monday.com lead not created

- Check `MONDAY_API_TOKEN` is correct
- Check `MONDAY_BOARD_ID` is correct
- Verify column names match in `ContactSubmissions.ts`
- Check server logs in Coolify: `/logs/combined.log`

### Email not sending

- Verify Gmail App Password (not regular password)
- Check `SMTP_USER` and `SMTP_PASS` are set
- Check Gmail allows "Less secure app access" or use App Password
- Check spam folder

### Spam submissions

The integration has 3 layers of protection:
1. **ReCaptcha v3** - Invisible bot detection
2. **Honeypot field** - Hidden field only bots fill
3. **Rate limiting** - Max 3 submissions per IP per hour

## Optional: Customize Column Mapping

Edit `src/collections/ContactSubmissions.ts` and update the `columnValues` in `createMondayLead()`:

```typescript
columnValues: JSON.stringify({
  email: { email: data.email, text: data.email },
  phone: data.phone || '',
  text: data.message,
  status: { label: 'New Lead' },
  // Add more columns:
  // your_column_name: data.field_name,
}),
```

## Cost Breakdown

- **Monday.com Basic Plan**: $9/user/month (existing)
- **Gmail SMTP**: Free
- **ReCaptcha**: Free (up to 1M requests/month)
- **Total Additional Cost**: $0

## Security Notes

- All credentials are stored as environment variables (never in code)
- Honeypot field catches most bots
- Rate limiting prevents spam floods
- ReCaptcha adds invisible bot detection
- All API calls happen server-side (credentials never exposed to browser)

## Support

If you need to modify the integration, the main files are:

- `src/collections/ContactSubmissions.ts` - Monday.com + email logic
- `src/components/ContactForm.tsx` - Frontend form with honeypot
- `src/app/api/contact/route.ts` - API route with validation

# 🚀 Quick Start Guide - SFU Market

## Immediate Setup (5 minutes)

### 1. Environment Setup
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_JWT_SECRET=sfu-market-secret-2024
```

### 2. Install & Run
```bash
npm install
npm run dev
```

### 3. Access the Application
- Homepage: http://localhost:3000
- Login: http://localhost:3000/login
- Dashboard: http://localhost:3000/dashboard (requires login)
- Contact: http://localhost:3000/contact

## 📋 Testing the Application

### Create an Account
1. Go to http://localhost:3000
2. Click "Login / Sign Up" button
3. Toggle to "Sign Up" tab
4. Use an SFU email (must end with @sfu.ca)
5. Create username and password
6. Submit to create account

### Browse Marketplace
1. Login with your credentials
2. You'll be redirected to the dashboard
3. Browse existing listings
4. Use search and category filters
5. Click "Contact Seller" on any listing

### Create a Listing
1. From dashboard, click "Create Listing"
2. Fill in title, description, and select category
3. Submit to publish your listing
4. Your listing appears in the marketplace

### Edit Your Listings
1. Find your own listings in the dashboard
2. Click "Edit Listing"
3. Modify title, description, or category
4. Update or delete as needed

## 🎨 Pages Overview

| Page | Route | Description | Auth Required |
|------|-------|-------------|---------------|
| Homepage | `/` | Landing page with features | No |
| Login/Signup | `/login` | Authentication page | No |
| Dashboard | `/dashboard` | Marketplace listings | Yes |
| Contact | `/contact` | Support form | No |

## 🔧 Common Issues & Solutions

### Issue: "Missing Supabase environment variables"
**Solution**: Ensure `.env.local` file exists with correct Supabase credentials

### Issue: Login fails with "Invalid credentials"
**Solution**: 
- Verify email ends with @sfu.ca
- Check Supabase database is accessible
- Ensure password matches during signup

### Issue: Dashboard shows "Loading..." indefinitely
**Solution**: 
- Clear browser cookies
- Re-login to generate new JWT token
- Check browser console for errors

### Issue: Animations not working
**Solution**: GSAP is installed and should work automatically. Try:
```bash
npm install gsap
```

## 🔐 Test Credentials Format
```
Email: student@sfu.ca
Password: password123
Username: johndoe
```

## 📱 Features Checklist

- ✅ Landing page with smooth scrolling
- ✅ Login/Signup with JWT authentication
- ✅ Dashboard with marketplace listings
- ✅ Create new listings with categories
- ✅ Edit/delete your own listings
- ✅ Search and filter listings
- ✅ Contact page with support form
- ✅ Responsive design for all devices
- ✅ GSAP animations throughout
- ✅ SFU branded color scheme

## 🎯 Next Steps

1. **Set up Supabase database** with the provided schema
2. **Test all features** using the testing guide above
3. **Customize branding** if needed (colors in `app/globals.css`)
4. **Deploy to Vercel** when ready for production

## 💡 Development Tips

- Use `npm run dev` for hot-reload development
- Check browser console for errors
- Use Supabase dashboard to view database changes
- JWT tokens expire after 7 days by default

## 📞 Need Help?

- Check `README_SFU_MARKET.md` for detailed documentation
- Visit the Contact page in the app
- Review API endpoints documentation

---

**Note**: Remember to replace placeholder environment variables with your actual Supabase credentials before running the application.

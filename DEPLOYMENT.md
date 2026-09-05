# Deployment Checklist - PKBM Al-Fitria

## ✅ Pre-Deployment Verification

### Build Status
- [x] Production build successful (`npm run build`)
- [x] No TypeScript errors
- [x] ESLint passes (1 minor warning about img tag in login page)
- [x] All pages compile successfully
- [x] Sitemap generates correctly
- [x] Robots.txt generates correctly
- [x] Open Graph images generate correctly

### Environment Variables
Set these in your deployment platform (Vercel/Netlify/etc.):

```bash
DATABASE_URL="postgresql://user:password@host:5432/database"
AUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://pkbmalfitria.me"
```

## 🚀 Deployment Steps

### 1. Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

Or connect your GitHub repository to Vercel for auto-deployments.

### 2. Set Environment Variables in Vercel Dashboard

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the three required variables (DATABASE_URL, AUTH_SECRET, NEXTAUTH_URL)
4. Redeploy if needed

### 3. Database Setup

If using Vercel Postgres:
```bash
# Create Vercel Postgres database
vercel postgres create

# Link to your project
vercel env pull .env.local

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed
```

## 📋 Post-Deployment Tasks

### 1. Verify Deployment
- [ ] Visit https://pkbmalfitria.me
- [ ] Check sitemap: https://pkbmalfitria.me/sitemap.xml
- [ ] Check robots: https://pkbmalfitria.me/robots.txt
- [ ] Test login with seeded credentials
- [ ] Test PPDB form submission

### 2. SEO Setup

#### Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: `https://pkbmalfitria.me`
3. Verify ownership (DNS or meta tag method)
4. Submit sitemap: `https://pkbmalfitria.me/sitemap.xml`
5. Request indexing for key pages

#### Google My Business
1. Visit https://business.google.com
2. Create/claim listing for PKBM Al-Fitria
3. Add complete information:
   - **Name**: PKBM Al-Fitria
   - **Category**: Educational Institution
   - **Address**: Kp. Peuntas RT 011/004, Desa Taringgul Tonggoh, Kec. Wanayasa, Kab. Purwakarta, Jawa Barat
   - **Phone**: 0878-0531-2348
   - **Website**: https://pkbmalfitria.me
   - **Email**: info@pkbmalfitria.sch.id
4. Upload photos from `/public/galeri`
5. Verify ownership

#### Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add site and verify
3. Submit sitemap

### 3. Social Media Testing
Test link previews on:
- **Facebook**: https://developers.facebook.com/tools/debug/
  - Enter URL, click "Debug"
  - Should show title, description, and OG image
- **Twitter**: https://cards-dev.twitter.com/validator
  - Should show large image card
- **LinkedIn**: https://www.linkedin.com/post-inspector/
  - Should show rich preview

### 4. Performance Testing
- [ ] Google PageSpeed Insights: https://pagespeed.web.dev/
- [ ] GTmetrix: https://gtmetrix.com/
- [ ] WebPageTest: https://www.webpagetest.org/

### 5. Analytics (Optional)
Consider adding:
- Google Analytics 4
- Microsoft Clarity (free heatmaps)
- Vercel Analytics (built-in)

## 🔍 Testing URLs

After deployment, verify these work:

### Public Pages
- https://pkbmalfitria.me/ (Homepage)
- https://pkbmalfitria.me/profil (Profile)
- https://pkbmalfitria.me/program (Programs)
- https://pkbmalfitria.me/ppdb (Enrollment)
- https://pkbmalfitria.me/modul (Modules)
- https://pkbmalfitria.me/berita (News)
- https://pkbmalfitria.me/kontak (Contact)

### SEO Files
- https://pkbmalfitria.me/sitemap.xml
- https://pkbmalfitria.me/robots.txt

### Open Graph Images
- https://pkbmalfitria.me/opengraph-image
- https://pkbmalfitria.me/profil/opengraph-image
- https://pkbmalfitria.me/ppdb/opengraph-image
- https://pkbmalfitria.me/kontak/opengraph-image

### Auth Pages (Protected)
- https://pkbmalfitria.me/login
- https://pkbmalfitria.me/admin (redirects if not logged in)
- https://pkbmalfitria.me/guru (redirects if not logged in)
- https://pkbmalfitria.me/siswa (redirects if not logged in)

## 🔐 Default Credentials

After seeding the database:

**Admin**
- Email: admin@pkbm.id
- Password: pkbm12345

**Teachers**
- guru1@pkbm.id / pkbm12345
- guru2@pkbm.id / pkbm12345
- guru3@pkbm.id / pkbm12345

**Students**
- siswa1@pkbm.id / pkbm12345
- siswa2@pkbm.id / pkbm12345
- ... (up to siswa10@pkbm.id)

⚠️ **Important**: Change these credentials in production!

## 🛡️ Security Checklist

- [ ] Change default admin password
- [ ] Set strong AUTH_SECRET (minimum 32 characters)
- [ ] Enable database connection SSL
- [ ] Set up database backups
- [ ] Configure Vercel firewall rules (if applicable)
- [ ] Enable HTTPS only (Vercel does this automatically)

## 📊 Success Metrics

Monitor these after launch:

### Week 1-2
- [ ] Site indexed by Google (check Search Console)
- [ ] Sitemap processed successfully
- [ ] No critical errors in Search Console
- [ ] Social media previews working

### Month 1
- [ ] Organic search traffic starting
- [ ] Local search rankings improving
- [ ] PPDB form submissions received
- [ ] Contact form inquiries

### Month 3+
- [ ] Ranking for target keywords (PKBM Purwakarta, kejar paket, etc.)
- [ ] Growing organic traffic
- [ ] Increasing enrollment applications
- [ ] Good Core Web Vitals scores

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database Connection Issues
- Check DATABASE_URL format
- Verify database exists and is accessible
- Check firewall rules if using external DB

### Sitemap Not Updating
- Force rebuild: `rm -rf .next && npm run build`
- Check that NEXTAUTH_URL is set correctly

### Open Graph Images Not Showing
- Verify images generate: visit `/opengraph-image` directly
- Clear Facebook cache: https://developers.facebook.com/tools/debug/
- Wait 24-48 hours for caches to refresh

## 📞 Support

For issues specific to:
- **Next.js**: https://nextjs.org/docs
- **Vercel**: https://vercel.com/docs
- **Prisma**: https://www.prisma.io/docs
- **NextAuth**: https://next-auth.js.org/

---

**Last Updated**: April 7, 2026
**Project Version**: 1.0.0
**Production URL**: https://pkbmalfitria.me

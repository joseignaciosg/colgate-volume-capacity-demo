# Colgate Volume & Capacity Planning Demo

A professional demo application for Colgate's Volume & Capacity Planning process across global manufacturing sites.

## 🚀 Features

### 1. **Site Overview Dashboard**
- Comprehensive list of 10 manufacturing sites across LATAM, NA, EMEA, and APAC regions
- Real-time status indicators (Submitted, Pending, Needs Review)
- Water risk scoring system (1-5 scale)
- Quick access to detailed site information

### 2. **Volume Input Form**
- Product SKU selection (Colgate Total, Max Fresh, Sensitive, elmex, meridol)
- Quarterly volume planning (Q1-Q4)
- Capacity utilization tracking
- Notes and comments system
- Form validation and submission

### 3. **Puts & Takes Tracker**
- Complete audit trail of volume adjustments
- Multiple adjustment reasons:
  - Product transfer
  - Capacity expansion
  - Demand change
  - Supply issue
- Historical tracking with timestamps
- User attribution for accountability

### 4. **Consolidation View**
- Regional volume aggregation
- Product category analysis
- Interactive bar charts (Recharts)
- Export to CSV functionality
- Performance metrics and KPIs

### 5. **Sustainability Integration**
- Water risk scoring for each site
- High-risk site flagging
- Alerts for high volume + high water risk combinations
- Carbon intensity placeholder (coming soon)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Language**: TypeScript
- **Data**: JSON mock data (no backend required)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/joseignaciosg/colgate-volume-capacity-demo.git

# Navigate to the project directory
cd colgate-volume-capacity-demo

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🌐 Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Import the `colgate-volume-capacity-demo` repository
5. Vercel will automatically detect Next.js and configure the build settings
6. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd colgate-volume-capacity-demo
vercel --prod
```

## 🎨 Design

The application uses Colgate's brand red (`#ED1C24`) as the primary accent color throughout the interface, maintaining a clean and professional design aesthetic.

## 📊 Mock Data

The application includes mock data for 10 manufacturing sites:

- **LATAM**: Cali Plant (Colombia), São Bernardo (Brazil), Mexico City (Mexico)
- **NA**: Morristown (USA)
- **EMEA**: Anzio (Italy), Gebze (Turkey), Warsaw (Poland)
- **APAC**: Guangzhou (China), Mumbai (India), Bangkok (Thailand)

## 🔒 Security Note

This is a demo application with mock data. For production use, implement:
- Backend API with authentication
- Database integration
- Role-based access control
- Data validation and sanitization
- Audit logging

## 📝 License

This is a demo project for demonstration purposes.

## 👤 Author

Jose Ignacio Galindo
- GitHub: [@joseignaciosg](https://github.com/joseignaciosg)

---

**Built with ❤️ for Colgate-Palmolive**

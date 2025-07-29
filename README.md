# Insta Check

A web application to analyze Instagram followers using your exported Instagram data. Built with React, TypeScript and Vite.

## Features

- Upload Instagram data export (ZIP file)
- Analyze followers who don't follow you back
- View mutual followers and reciprocity rate
- Interactive dashboard with statistics
- Export analysis results
- Client-side processing (data stays in your browser)
- Responsive design

## How to Export Instagram Data

### Request your data from Instagram

1. Go to Instagram Settings > Privacy > Download your information
2. Select "Some of your information"
3. Check "Connections" or "Followers and following"
4. Choose JSON format and Low quality
5. Request download

### Wait and download

Instagram will email you when ready (usually within 48 hours).

### Use with Insta Check

1. Download the ZIP file from Instagram
2. Upload it to Insta Check
3. View your analysis

## Technologies

- React 18
- TypeScript
- Vite
- JSZip
- Lucide React
- CSS Modules

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
git clone https://github.com/gadfaria/insta-check.git
cd insta-check
npm install
npm run dev
```

Open http://localhost:5173

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run lint` - Run linter

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx
│   ├── InstagramUpload.tsx
│   ├── FollowersList.tsx
│   └── StatsCard.tsx
├── styles/
├── types/
├── App.tsx
└── main.tsx
```

## Privacy

- All processing happens in your browser
- No data is sent to external servers
- No connection to Instagram APIs
- Open source code

## License

MIT License

<h5 align="center">
  ☕ Code and Coffee
</h5>

# 📸 Insta Check

A modern web application to analyze Instagram followers using your **real data** exported directly from Instagram, built with React, TypeScript and Vite.js.

## 🚀 Features

- **Real Data Upload**: Load the ZIP file with your Instagram data
- **Complete Analysis**:
  - Followers who don't follow you back
  - Mutual followers
  - Reciprocity rate
  - Statistical insights
- **Interactive Dashboard**: Complete visualization of follower data
- **Analysis Export**: Download complete analysis in JSON format
- **100% Private**: All data stays in your browser
- **Responsive Design**: Adaptable interface for desktop and mobile

## 📋 How to use your real Instagram data

### Step 1: Request your data

1. Open Instagram in browser or app
2. Go to **Settings** → **Privacy** → **Download your information**
3. Select **"Some of your information"**
4. Check only **"Connections"** or **"Followers and following"**
5. Choose **JSON** format and **Low** quality
6. Click **"Request download"**

### Step 2: Wait for the file

- Instagram will send an email when the file is ready
- Usually takes a few hours up to 48h

### Step 3: Use in Insta Check

1. Download the ZIP file from Instagram
2. Access Insta Check
3. Upload the ZIP file
4. View your complete analysis!

## 🛠️ Technologies Used

- **React 18** - Modern UI library
- **TypeScript** - Static typing for JavaScript
- **Vite.js** - Fast development server and build tool
- **JSZip** - ZIP file processing library
- **Lucide React** - Modern icons
- **CSS Modules** - Scoped component styling

## 🏃‍♂️ Running Locally

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/gadfaria/insta-check.git
cd insta-check
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open your browser at [http://localhost:5173](http://localhost:5173)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔒 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Dashboard.tsx       # Analysis dashboard
│   ├── InstagramUpload.tsx # ZIP file upload
│   ├── FollowersList.tsx   # User lists display
│   └── StatsCard.tsx       # Metrics component
├── styles/             # CSS Modules
├── types/              # TypeScript definitions
├── App.tsx             # Main component
└── main.tsx           # App entry point
```

## 🛡️ Privacy and Security

- **100% Client-side**: All processing is done in your browser
- **No data transmission**: Your data never leaves your device
- **No external APIs**: Doesn't connect to Instagram or external services
- **Open source**: Complete code available for review

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

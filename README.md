# Task Master

A clean, modern, and production-ready task manager web application built to solve real-world productivity needs.

## Features

- **Task Management**: Create tasks with titles, descriptions, and priority levels.
- **Inline Editing**: Easily double-click or use the edit button to update tasks inline without modals.
- **Persistence**: All data is automatically saved to and loaded from `localStorage`.
- **Filtering & Summaries**: Quickly filter by All, Active, or Completed tasks tracked via live counters.
- **Beautiful UI/UX**:
  - Dark mode by default using sleek slate/zinc colors
  - Smooth micro-interactions and subtle entering animations
  - Glassmorphic translucent cards leveraging `backdrop-blur`
- **Fully Responsive**: Adapts seamlessly to mobile, tablet, and desktop viewports.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict typing for robust state definitions)
- **Styling**: Tailwind CSS (with custom CSS variables for dark mode and specific utilities)
- **Icons**: Lucide React
- **Compute Architecture**: 100% Client-side React Hooks architecture (`useTasks`)

## Getting Started

Follow these steps to run the application locally:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Why it's useful
It serves as a highly modular, decoupled standalone template for understanding React Hooks with LocalStorage integration, complex inline editable states, and high-performance layout rendering in Next.js 14 App Router without the need to set up a bloated backend. 

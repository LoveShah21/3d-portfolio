# Deepseek 3D Portfolio

A modern, interactive 3D portfolio website built with Next.js, React, Three.js, and Tailwind CSS. This project showcases creative developer skills, technical expertise, and design aesthetics through immersive UI, animated backgrounds, and a dynamic skill sphere.

## Features

- **3D Particle Background:** Animated particles rendered with Three.js for a visually engaging experience.
- **Skill Sphere:** Interactive 3D sphere displaying technical and design skills.
- **Project Showcase:** Responsive cards for featured projects with live and code links.
- **Animated Navigation:** Floating navigation bar with smooth scroll and mobile support.
- **Contact Form:** EmailJS-powered form for direct communication, with status feedback.
- **Responsive Design:** Optimized for all devices using Tailwind CSS.
- **Modern UI:** Framer Motion animations for smooth transitions and interactions.
- **Download Resume:** Quick access to resume download.

## Technologies Used

- **Next.js**: Server-side rendering, routing, and API integration.
- **React**: Component-based architecture.
- **Three.js & @react-three/fiber**: 3D rendering and animation.
- **@react-three/drei**: Useful helpers for Three.js in React.
- **Tailwind CSS**: Utility-first CSS for rapid UI development.
- **Framer Motion**: Animation and transitions.
- **EmailJS**: Email sending from the contact form.
- **Lucide React & React Icons**: Iconography.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LoveShah21/3d-portfolio.git
   cd 3d-portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `portfolio` directory.
   - Add your EmailJS keys:
     ```env
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
     ```

### Running Locally

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Folder Structure

```
portfolio/
  public/
    assets/
    models/
  src/
    app/
      page.tsx
      layout.tsx
      globals.css
  README.md
  package.json
  ...
```

## Customization

- Update your skills and projects in `src/app/page.tsx`.
- Replace profile image and 3D model in `public/models/`.
- Update resume content in the download handler.

## Deployment

- Easily deploy on Vercel, Netlify, or any platform supporting Next.js.

## Author

**Love Shah**

## Contact

- Email: loveshah2112@gmail.com

---

### Screenshots

Add screenshots of your site here for better presentation.

---

### Contributions

Pull requests and suggestions are welcome!

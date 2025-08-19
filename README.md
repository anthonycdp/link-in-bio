<div align="center">

# 🔗 Link in Bio

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

*Professional link-in-bio page for healthcare professionals with modern design and seamless user experience*

[Get Started](#-installation) • [Documentation](#-main-features) • [Usage](#-how-to-run) • [License](#-license)

</div>

---

## 📋 Overview

Link in Bio is a modern, responsive web application designed specifically for healthcare professionals to showcase their services and provide easy access to contact information and location services. The platform offers:

- Professional profile presentation with photo and credentials
- Direct WhatsApp integration for appointment scheduling
- Uber ride booking integration
- Google Maps navigation
- 99 (99 Pop) ride service integration
- Responsive design optimized for mobile devices
- Modern UI components with smooth animations

## 🎯 Objectives

- Create a professional digital presence for healthcare professionals
- Streamline patient communication through integrated messaging
- Provide seamless location services and transportation options
- Demonstrate modern web development practices with React and TypeScript
- Implement responsive design principles for optimal mobile experience

## 🛠️ Technologies and Tools

### Frontend
- **React 18** - Library for building user interfaces
- **TypeScript** - JavaScript superset with static typing
- **Vite** - Fast and modern build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern and accessible UI components
- **React Query** - Server state management
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Framer Motion** - Animation library
- **Wouter** - Lightweight routing solution

### Development Tools
- **Vitest** - Fast unit testing framework
- **Testing Library** - React component testing utilities
- **PostCSS** - CSS processor
- **ESLint** - Code linting and formatting

### External Integrations
- **WhatsApp Web API** - Direct messaging integration
- **Uber API** - Ride booking service
- **99 Pop API** - Alternative ride service
- **Google Maps** - Navigation and location services

## 📦 Prerequisites

Before starting, make sure you have installed:

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/anthonycdp/link-in-bio.git
cd link-in-bio
```

2. Navigate to the client directory:
```bash
cd client
```

3. Install dependencies:
```bash
npm install
```

4. Set up environment variables (if needed):
```bash
cp .env.example .env
```

## 💻 Usage

### Development Mode

To run the project in development mode:

```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173

### Production Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

### Testing

To run tests:

```bash
npm test
```

To run tests with UI:

```bash
npm run test:ui
```

## 📁 Project Structure

```
link-in-bio/
├── client/                 # Frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── assets/        # Images and static assets
│   │   ├── components/    # React components
│   │   │   ├── ui/        # Shadcn/ui components
│   │   │   └── icons/     # Custom icon components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   ├── pages/         # Application pages
│   │   └── App.tsx        # Main application component
│   ├── index.html         # HTML entry point
│   ├── package.json       # Dependencies and scripts
│   ├── tailwind.config.ts # Tailwind CSS configuration
│   ├── vite.config.ts     # Vite configuration
│   └── vitest.config.ts   # Testing configuration
├── netlify.toml           # Netlify deployment configuration
└── README.md              # Project documentation
```

## 🧪 Main Features

### Professional Profile
- **Doctor Presentation**: Professional photo with credentials display
- **Specialty Information**: Clear presentation of medical specialties
- **Service Highlights**: Key services and expertise areas
- **Responsive Design**: Optimized for all device sizes

### Communication Integration
- **WhatsApp Direct**: One-click appointment scheduling
- **Message Templates**: Pre-configured professional messages
- **Fallback Support**: Clipboard copy for blocked popups
- **Multi-language Support**: Portuguese and English ready

### Location Services
- **Google Maps Integration**: Direct navigation to clinics
- **Uber Ride Booking**: Seamless transportation service
- **99 Pop Alternative**: Brazilian ride service integration
- **Address Display**: Clear clinic location information

### User Experience
- **Mobile-First Design**: Optimized for mobile devices
- **Smooth Animations**: Framer Motion powered interactions
- **Toast Notifications**: User feedback and error handling
- **Loading States**: Visual feedback during operations

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm test` - Run test suite
- `npm run test:ui` - Run tests with UI interface
- `npm run lint` - Check TypeScript types

## 🔍 Validations Implemented

### Frontend Validations
- **Form Validation**: React Hook Form with Zod schemas
- **Input Sanitization**: XSS protection and data cleaning
- **Device Detection**: Platform-specific functionality
- **Error Handling**: Graceful fallbacks and user feedback

### User Experience Validations
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized images and lazy loading
- **Cross-browser**: Compatibility with modern browsers

## 📊 Project Statistics

- **Total Components**: 15+ React components
- **UI Components**: 40+ Shadcn/ui components
- **External Integrations**: 4 major services
- **Technology Stack**: 15+ modern technologies
- **Testing Coverage**: Unit tests for all components
- **Performance**: Lighthouse score 95+

## 🎓 Best Practices and Learnings

### Implemented
- **TypeScript-first development** for type safety
- **Component-based architecture** for reusability
- **Mobile-first responsive design** for optimal UX
- **Modern testing practices** with Vitest and Testing Library
- **Performance optimization** with Vite and modern bundling
- **Accessibility standards** following WCAG guidelines

### Development Process
1. **Requirements Analysis**: Healthcare professional needs assessment
2. **Design System**: Shadcn/ui component library integration
3. **Mobile Optimization**: Responsive design implementation
4. **External Integrations**: API service connections
5. **Testing**: Comprehensive unit test coverage
6. **Documentation**: Clear code comments and README

## 🚀 Deployment

### Netlify
The project is configured for deployment on Netlify with:
- Automatic builds from Git repository
- Environment variable management
- Custom domain support
- SSL certificate provisioning

### Build Process
1. **Development**: Hot reload with Vite dev server
2. **Production**: Optimized build with tree shaking
3. **Testing**: Automated test suite execution
4. **Deployment**: One-click deployment to Netlify

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribution

This project was developed as a demonstration of skills in:
- **Modern React development** with TypeScript
- **Responsive web design** and mobile optimization
- **External API integration** and service connectivity
- **Component library development** with Shadcn/ui
- **Testing practices** and quality assurance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

<div align="center">

**Anthony Coelho**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anthonycdp)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anthonycoelhoqae/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:anthonycoelho.dp@hotmail.com)

*Full-stack Developer specialized in React, Node.js and modern web technologies*

</div>

---

<div align="center">

### If this project was useful to you, consider giving it a star!

### Contributions are welcome!

**Version**: 1.0.0

</div>

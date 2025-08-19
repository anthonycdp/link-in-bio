import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Header Component', () => {
  it('renders the doctor name correctly', () => {
    render(<Header />);
    
    const doctorName = screen.getByTestId('doctor-name');
    expect(doctorName).toBeInTheDocument();
    expect(doctorName).toHaveTextContent('Dra. Larissa Freitas');
    expect(doctorName.tagName).toBe('H1');
  });

  it('renders the doctor specialty correctly', () => {
    render(<Header />);
    
    const doctorSpecialty = screen.getByTestId('doctor-specialty');
    expect(doctorSpecialty).toBeInTheDocument();
    expect(doctorSpecialty).toHaveTextContent('Ginecologia e Obstetrícia');
    expect(doctorSpecialty.tagName).toBe('H2');
  });

  it('renders the doctor services correctly', () => {
    render(<Header />);
    
    const doctorServices = screen.getByTestId('doctor-services');
    expect(doctorServices).toBeInTheDocument();
    expect(doctorServices).toHaveTextContent('Pré-natal de Alto Risco • Consulta Pré-concepcional • Assistência Humanizada');
    expect(doctorServices.tagName).toBe('P');
  });

  it('applies correct typography classes for Serenidade Rosé theme', () => {
    render(<Header />);
    
    const doctorName = screen.getByTestId('doctor-name');
    const doctorSpecialty = screen.getByTestId('doctor-specialty');
    const doctorServices = screen.getByTestId('doctor-services');
    
    // H1 - Playfair Display, responsive text (text-2xl sm:text-3xl), bold, primary text color
    expect(doctorName).toHaveClass('font-playfair', 'text-2xl', 'sm:text-3xl', 'font-bold', 'text-serenity-text');
    
    // H2 - Montserrat, responsive text (text-base sm:text-lg), medium weight, secondary text color
    expect(doctorSpecialty).toHaveClass('font-montserrat', 'text-base', 'sm:text-lg', 'font-medium', 'text-serenity-text-secondary');
    
    // P - Montserrat, responsive text (text-xs sm:text-sm), regular weight, secondary text color
    expect(doctorServices).toHaveClass('font-montserrat', 'text-xs', 'sm:text-sm', 'text-serenity-text-secondary');
  });

  it('renders the doctor photo with correct attributes', () => {
    render(<Header />);
    
    const doctorPhoto = screen.getByTestId('doctor-photo');
    expect(doctorPhoto).toBeInTheDocument();
    expect(doctorPhoto).toHaveAttribute('alt', 'Dra. Larissa Freitas - Ginecologista e Obstetra');
    expect(doctorPhoto.tagName).toBe('IMG');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-header-class';
    render(<Header className={customClass} />);
    
    const header = screen.getByRole('banner'); // header element has implicit banner role
    expect(header).toHaveClass(customClass);
  });

  it('has proper semantic HTML structure', () => {
    render(<Header />);
    
    // Verify semantic structure
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    const h1 = screen.getByRole('heading', { level: 1 });
    const h2 = screen.getByRole('heading', { level: 2 });
    
    expect(h1).toHaveTextContent('Dra. Larissa Freitas');
    expect(h2).toHaveTextContent('Ginecologia e Obstetrícia');
  });
});
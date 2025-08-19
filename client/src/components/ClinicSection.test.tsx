import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ClinicSection from './ClinicSection';

// Mock window.open
const mockWindowOpen = vi.fn();
Object.defineProperty(window, 'open', { value: mockWindowOpen });

// Mock window.location
const mockLocation = { href: '' };
Object.defineProperty(window, 'location', { value: mockLocation, writable: true });

// Mock navigator.userAgent
Object.defineProperty(navigator, 'userAgent', {
  value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  configurable: true
});

describe('ClinicSection Component', () => {
  const defaultProps = {
    clinicName: 'Clínica Ella',
    whatsappNumber: '+5512982701791',
    whatsappMessage: 'Olá! Gostaria de agendar uma consulta com a Dra. Larissa Freitas.',
    uberCoordinates: {
      latitude: -23.217326,
      longitude: -45.8906151
    },
    googleMapsUrl: 'https://maps.google.com/?q=-23.217326,-45.8906151&z=17',
    address: 'Av. Andrômeda, 227 - Vale Sul Shopping, SUC 253/254, Jardim Satélite, São José dos Campos - SP, 12230-000'
  };

  beforeEach(() => {
    mockWindowOpen.mockClear();
    mockLocation.href = '';
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders clinic section with correct title', () => {
    render(<ClinicSection {...defaultProps} />);
    
    const title = screen.getByTestId('clinic-clínica-ella-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Clínica Ella');
    expect(title.tagName).toBe('H2');
  });

  it('renders appointment button with correct text', () => {
    render(<ClinicSection {...defaultProps} />);
    
    const button = screen.getByTestId('button-schedule-clínica-ella');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Agendar na Clínica Ella');
  });

  it('opens WhatsApp with correct URL when appointment button is clicked', () => {
    render(<ClinicSection {...defaultProps} />);
    
    const button = screen.getByTestId('button-schedule-clínica-ella');
    fireEvent.click(button);
    
    const expectedMessage = "Olá, gostaria de agendar uma consulta com a Dra. Larissa Freitas";
    const expectedUrl = `https://wa.me/5512982701791?text=${encodeURIComponent(expectedMessage)}`;
    
    expect(mockWindowOpen).toHaveBeenCalledWith(expectedUrl, '_blank');
  });

  it('renders address display element', () => {
    render(<ClinicSection {...defaultProps} />);
    
    const address = screen.getByTestId('address-clínica-ella');
    expect(address).toBeInTheDocument();
    expect(address).toHaveTextContent('Av. Andrômeda, 227 - Vale Sul Shopping, SUC 253/254, Jardim Satélite, São José dos Campos - SP, 12230-000');
  });

  it('renders location and directions links', () => {
    render(<ClinicSection {...defaultProps} />);
    
    const locationLink = screen.getByTestId('link-location-clínica-ella');
    const directionsButton = screen.getByTestId('button-directions-clínica-ella');
    
    expect(locationLink).toBeInTheDocument();
    expect(locationLink).toHaveTextContent('Ver Localização');
    expect(directionsButton).toBeInTheDocument();
    expect(directionsButton).toHaveTextContent('Como Chegar');
  });

  it('opens Google Maps when address is clicked', () => {
    render(<ClinicSection {...defaultProps} />);
    
    const address = screen.getByTestId('address-clínica-ella');
    fireEvent.click(address);
    
    expect(mockWindowOpen).toHaveBeenCalledWith('https://maps.google.com/?q=-23.217326,-45.8906151&z=17', '_blank');
  });

  it('opens Google Maps when location link is clicked', () => {
    render(<ClinicSection {...defaultProps} />);
    
    const locationLink = screen.getByTestId('link-location-clínica-ella');
    fireEvent.click(locationLink);
    
    expect(mockWindowOpen).toHaveBeenCalledWith(defaultProps.googleMapsUrl, '_blank');
  });

  it('opens and closes directions modal correctly', async () => {
    render(<ClinicSection {...defaultProps} />);
    
    // Modal should not be visible initially
    expect(screen.queryByTestId('modal-directions')).not.toBeInTheDocument();
    
    // Click "Como Chegar" button
    const directionsButton = screen.getByTestId('button-directions-clínica-ella');
    fireEvent.click(directionsButton);
    
    // Modal should now be visible
    await waitFor(() => {
      expect(screen.getByTestId('modal-directions')).toBeInTheDocument();
    });
    
    // Check modal title
    const modalTitle = screen.getByTestId('modal-title');
    expect(modalTitle).toHaveTextContent('Como chegar?');
    
    // Close modal
    const closeButton = screen.getByTestId('button-close-modal');
    fireEvent.click(closeButton);
    
    // Modal should be hidden again
    await waitFor(() => {
      expect(screen.queryByTestId('modal-directions')).not.toBeInTheDocument();
    });
  });

  it('renders all transportation options in modal', async () => {
    render(<ClinicSection {...defaultProps} />);
    
    // Open modal
    const directionsButton = screen.getByTestId('button-directions-clínica-ella');
    fireEvent.click(directionsButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('modal-directions')).toBeInTheDocument();
    });
    
    // Check all transportation buttons
    expect(screen.getByTestId('button-uber')).toBeInTheDocument();
    expect(screen.getByTestId('button-99')).toBeInTheDocument();
    expect(screen.getByTestId('button-gmaps')).toBeInTheDocument();
  });

  it('handles Uber click on desktop (web URL)', async () => {
    render(<ClinicSection {...defaultProps} />);
    
    // Open modal
    const directionsButton = screen.getByTestId('button-directions-clínica-ella');
    fireEvent.click(directionsButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('modal-directions')).toBeInTheDocument();
    });
    
    // Click Uber button
    const uberButton = screen.getByTestId('button-uber');
    fireEvent.click(uberButton);
    
    const expectedUrl = 'https://m.uber.com/looking?pickup=my_location&dropoff[latitude]=-23.217326&dropoff[longitude]=-45.8906151';
    expect(mockWindowOpen).toHaveBeenCalledWith(expectedUrl, '_blank');
  });

  it('handles 99 click on desktop (web URL)', async () => {
    render(<ClinicSection {...defaultProps} />);
    
    // Open modal
    const directionsButton = screen.getByTestId('button-directions-clínica-ella');
    fireEvent.click(directionsButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('modal-directions')).toBeInTheDocument();
    });
    
    // Click 99 button
    const ninetyNineButton = screen.getByTestId('button-99');
    fireEvent.click(ninetyNineButton);
    
    expect(mockWindowOpen).toHaveBeenCalledWith('https://99app.com/', '_blank');
  });

  it('handles Google Maps click from modal', async () => {
    render(<ClinicSection {...defaultProps} />);
    
    // Open modal
    const directionsButton = screen.getByTestId('button-directions-clínica-ella');
    fireEvent.click(directionsButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('modal-directions')).toBeInTheDocument();
    });
    
    // Click Google Maps button
    const gmapsButton = screen.getByTestId('button-gmaps');
    fireEvent.click(gmapsButton);
    
    expect(mockWindowOpen).toHaveBeenCalledWith(defaultProps.googleMapsUrl, '_blank');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-clinic-class';
    render(<ClinicSection {...defaultProps} className={customClass} />);
    
    const section = screen.getByTestId('clinic-clínica-ella-title').closest('section');
    expect(section).toHaveClass(customClass);
  });

  it('applies correct Serenidade Rosé theme classes', () => {
    render(<ClinicSection {...defaultProps} />);
    
    const title = screen.getByTestId('clinic-clínica-ella-title');
    const button = screen.getByTestId('button-schedule-clínica-ella');
    const locationLink = screen.getByTestId('link-location-clínica-ella');
    
    // Title typography - responsive text size
    expect(title).toHaveClass('font-montserrat', 'text-lg', 'sm:text-xl', 'font-semibold', 'text-serenity-text');
    
    // Button styling - check for updated gradient and font weight
    expect(button).toHaveClass('bg-gradient-to-r', 'from-serenity-rose', 'to-serenity-wine', 'text-white', 'font-montserrat', 'font-semibold');
    
    // Link styling - updated for new button design
    expect(locationLink).toHaveClass('bg-gray-50', 'hover:bg-serenity-rose/10', 'text-gray-600', 'hover:text-serenity-rose', 'rounded-lg');
  });

  it('handles iOS device detection for 99 app', async () => {
    // Mock iOS user agent
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
      configurable: true
    });
    
    render(<ClinicSection {...defaultProps} />);
    
    // Open modal
    const directionsButton = screen.getByTestId('button-directions-clínica-ella');
    fireEvent.click(directionsButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('modal-directions')).toBeInTheDocument();
    });
    
    // Click 99 button
    const ninetyNineButton = screen.getByTestId('button-99');
    fireEvent.click(ninetyNineButton);
    
    expect(mockWindowOpen).toHaveBeenCalledWith('https://apps.apple.com/br/app/99-corridas-food-pay/id553663691', '_blank');
  });

  it('handles Android device detection for 99 app', async () => {
    // Mock Android user agent
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Linux; Android 11; SM-G991B)',
      configurable: true
    });
    
    render(<ClinicSection {...defaultProps} />);
    
    // Open modal
    const directionsButton = screen.getByTestId('button-directions-clínica-ella');
    fireEvent.click(directionsButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('modal-directions')).toBeInTheDocument();
    });
    
    // Click 99 button
    const ninetyNineButton = screen.getByTestId('button-99');
    fireEvent.click(ninetyNineButton);
    
    expect(mockWindowOpen).toHaveBeenCalledWith('https://play.google.com/store/apps/details?id=com.taxis99', '_blank');
  });

  it('has proper semantic HTML structure', () => {
    render(<ClinicSection {...defaultProps} />);
    
    // Verify semantic structure
    const heading = screen.getByRole('heading', { level: 2 });
    const appointmentButton = screen.getByRole('button', { name: /agendar consulta com dra\. larissa freitas na clínica ella/i });
    const directionsButton = screen.getByRole('button', { name: /como chegar/i });
    
    expect(heading).toHaveTextContent('Clínica Ella');
    expect(appointmentButton).toBeInTheDocument();
    expect(directionsButton).toBeInTheDocument();
    
    // Verify section element exists
    const section = heading.closest('section');
    expect(section).toBeInTheDocument();
  });
});
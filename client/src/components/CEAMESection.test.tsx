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

describe('CEAME Section (using ClinicSection)', () => {
  const ceameProps = {
    clinicName: 'CEAME',
    whatsappNumber: '+5512988064303',
    whatsappMessage: 'Olá! Gostaria de agendar uma consulta com a Dra. Larissa Freitas.',
    uberCoordinates: {
      latitude: -23.3052117,
      longitude: -45.9759764
    },
    googleMapsUrl: 'https://maps.google.com/?q=-23.3052117,-45.9759764&z=17',
    address: 'R. Batista Scavone, 169 - Jardim Leonidia, Jacareí - SP, 12327-130'
  };

  beforeEach(() => {
    mockWindowOpen.mockClear();
    mockLocation.href = '';
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders CEAME section with correct title', () => {
    render(<ClinicSection {...ceameProps} />);
    
    const title = screen.getByTestId('clinic-ceame-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('CEAME');
    expect(title.tagName).toBe('H2');
  });

  it('renders appointment button with correct text', () => {
    render(<ClinicSection {...ceameProps} />);
    
    const button = screen.getByTestId('button-schedule-ceame');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Agendar no CEAME');
  });

  it('opens WhatsApp with correct URL when appointment button is clicked', () => {
    render(<ClinicSection {...ceameProps} />);
    
    const button = screen.getByTestId('button-schedule-ceame');
    fireEvent.click(button);
    
    const expectedMessage = "Olá, gostaria de agendar uma consulta com a Dra. Larissa Freitas";
    const expectedUrl = `https://wa.me/5512988064303?text=${encodeURIComponent(expectedMessage)}`;
    
    expect(mockWindowOpen).toHaveBeenCalledWith(expectedUrl, '_blank');
  });

  it('renders address display element', () => {
    render(<ClinicSection {...ceameProps} />);
    
    const address = screen.getByTestId('address-ceame');
    expect(address).toBeInTheDocument();
    expect(address).toHaveTextContent('R. Batista Scavone, 169 - Jardim Leonidia, Jacareí - SP, 12327-130');
  });

  it('renders location and directions links', () => {
    render(<ClinicSection {...ceameProps} />);
    
    const locationLink = screen.getByTestId('link-location-ceame');
    const directionsButton = screen.getByTestId('button-directions-ceame');
    
    expect(locationLink).toBeInTheDocument();
    expect(locationLink).toHaveTextContent('Ver Localização');
    expect(directionsButton).toBeInTheDocument();
    expect(directionsButton).toHaveTextContent('Como Chegar');
  });

  it('opens Google Maps when address is clicked', () => {
    render(<ClinicSection {...ceameProps} />);
    
    const address = screen.getByTestId('address-ceame');
    fireEvent.click(address);
    
    expect(mockWindowOpen).toHaveBeenCalledWith(ceameProps.googleMapsUrl, '_blank');
  });

  it('opens Google Maps when location link is clicked', () => {
    render(<ClinicSection {...ceameProps} />);
    
    const locationLink = screen.getByTestId('link-location-ceame');
    fireEvent.click(locationLink);
    
    expect(mockWindowOpen).toHaveBeenCalledWith(ceameProps.googleMapsUrl, '_blank');
  });

  it('opens and closes directions modal correctly', async () => {
    render(<ClinicSection {...ceameProps} />);
    
    // Modal should not be visible initially
    expect(screen.queryByTestId('modal-directions')).not.toBeInTheDocument();
    
    // Click "Como Chegar" button
    const directionsButton = screen.getByTestId('button-directions-ceame');
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
    render(<ClinicSection {...ceameProps} />);
    
    // Open modal
    const directionsButton = screen.getByTestId('button-directions-ceame');
    fireEvent.click(directionsButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('modal-directions')).toBeInTheDocument();
    });
    
    // Check all transportation buttons
    expect(screen.getByTestId('button-uber')).toBeInTheDocument();
    expect(screen.getByTestId('button-99')).toBeInTheDocument();
    expect(screen.getByTestId('button-gmaps')).toBeInTheDocument();
  });

  it('handles Uber click on desktop with CEAME coordinates', async () => {
    render(<ClinicSection {...ceameProps} />);
    
    // Open modal
    const directionsButton = screen.getByTestId('button-directions-ceame');
    fireEvent.click(directionsButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('modal-directions')).toBeInTheDocument();
    });
    
    // Click Uber button
    const uberButton = screen.getByTestId('button-uber');
    fireEvent.click(uberButton);
    
    const expectedUrl = 'https://m.uber.com/looking?pickup=my_location&dropoff[latitude]=-23.3052117&dropoff[longitude]=-45.9759764';
    expect(mockWindowOpen).toHaveBeenCalledWith(expectedUrl, '_blank');
  });

  it('handles 99 click on desktop (web URL)', async () => {
    render(<ClinicSection {...ceameProps} />);
    
    // Open modal
    const directionsButton = screen.getByTestId('button-directions-ceame');
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
    render(<ClinicSection {...ceameProps} />);
    
    // Open modal
    const directionsButton = screen.getByTestId('button-directions-ceame');
    fireEvent.click(directionsButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('modal-directions')).toBeInTheDocument();
    });
    
    // Click Google Maps button
    const gmapsButton = screen.getByTestId('button-gmaps');
    fireEvent.click(gmapsButton);
    
    expect(mockWindowOpen).toHaveBeenCalledWith(ceameProps.googleMapsUrl, '_blank');
  });

  it('handles iOS device detection for 99 app', async () => {
    // Mock iOS user agent
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
      configurable: true
    });
    
    render(<ClinicSection {...ceameProps} />);
    
    // Open modal
    const directionsButton = screen.getByTestId('button-directions-ceame');
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
    
    render(<ClinicSection {...ceameProps} />);
    
    // Open modal
    const directionsButton = screen.getByTestId('button-directions-ceame');
    fireEvent.click(directionsButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('modal-directions')).toBeInTheDocument();
    });
    
    // Click 99 button
    const ninetyNineButton = screen.getByTestId('button-99');
    fireEvent.click(ninetyNineButton);
    
    expect(mockWindowOpen).toHaveBeenCalledWith('https://play.google.com/store/apps/details?id=com.taxis99', '_blank');
  });

  it('applies correct Serenidade Rosé theme classes', () => {
    render(<ClinicSection {...ceameProps} />);
    
    const title = screen.getByTestId('clinic-ceame-title');
    const button = screen.getByTestId('button-schedule-ceame');
    const locationLink = screen.getByTestId('link-location-ceame');
    
    // Title typography - responsive text size
    expect(title).toHaveClass('font-montserrat', 'text-lg', 'sm:text-xl', 'font-semibold', 'text-serenity-text');
    
    // Button styling - check for updated gradient and font weight
    expect(button).toHaveClass('bg-gradient-to-r', 'from-serenity-rose', 'to-serenity-wine', 'text-white', 'font-montserrat', 'font-semibold');
    
    // Link styling - updated for new button design
    expect(locationLink).toHaveClass('bg-gray-50', 'hover:bg-serenity-rose/10', 'text-gray-600', 'hover:text-serenity-rose', 'rounded-lg');
  });

  it('has proper semantic HTML structure', () => {
    render(<ClinicSection {...ceameProps} />);
    
    // Verify semantic structure
    const heading = screen.getByRole('heading', { level: 2 });
    const appointmentButton = screen.getByRole('button', { name: /agendar consulta com dra\. larissa freitas no ceame/i });
    const directionsButton = screen.getByRole('button', { name: /como chegar/i });
    
    expect(heading).toHaveTextContent('CEAME');
    expect(appointmentButton).toBeInTheDocument();
    expect(directionsButton).toBeInTheDocument();
    
    // Verify section element exists
    const section = heading.closest('section');
    expect(section).toBeInTheDocument();
  });

  it('uses correct CEAME-specific data', async () => {
    render(<ClinicSection {...ceameProps} />);
    
    // Clear previous calls
    mockWindowOpen.mockClear();
    
    // Verify CEAME-specific phone number is used
    const button = screen.getByTestId('button-schedule-ceame');
    fireEvent.click(button);
    
    const expectedMessage = "Olá, gostaria de agendar uma consulta com a Dra. Larissa Freitas";
    const expectedUrl = `https://wa.me/5512988064303?text=${encodeURIComponent(expectedMessage)}`;
    
    expect(mockWindowOpen).toHaveBeenCalledWith(expectedUrl, '_blank');
    
    // Clear previous calls for next test
    mockWindowOpen.mockClear();
    
    // Verify CEAME coordinates are used for Google Maps
    const locationLink = screen.getByTestId('link-location-ceame');
    fireEvent.click(locationLink);
    
    expect(mockWindowOpen).toHaveBeenCalledWith('https://maps.google.com/?q=-23.3052117,-45.9759764&z=17', '_blank');
  });
});
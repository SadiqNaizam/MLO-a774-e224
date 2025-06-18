import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Components
import MobileFrameComponent from '@/components/MobileFrameComponent';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Sun, Moon } from 'lucide-react'; // Icons for theme toggle

// Interface for MobilePage (as it's not exported from MobileFrameComponent.tsx)
interface MobilePage {
  id: string;
  name: string;
  htmlContent: string;
}

// Placeholder data for MobileFrameComponent
const sampleMobilePages: MobilePage[] = [
  {
    id: 'home_preview',
    name: 'Home',
    htmlContent: `
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; display: flex; flex-direction: column; height: 100vh;">
        <header style="background-color: #333; color: white; padding: 1em; text-align: center;">
          <h1>Homepage</h1>
        </header>
        <main style="padding: 1em; flex-grow: 1;">
          <p>Welcome to the homepage preview. This shows a basic structure.</p>
          <button style="background-color: #5cb85c; color: white; padding: 10px 15px; border: none; border-radius: 5px; cursor: pointer;">Get Started</button>
        </main>
        <footer style="background-color: #333; color: white; padding: 0.5em; text-align: center; font-size: 0.8em;">
          <p>&copy; 2024 MyApp</p>
        </footer>
      </body>
    `,
  },
  {
    id: 'profile_preview',
    name: 'Profile',
    htmlContent: `
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #e9e9e9; display: flex; flex-direction: column; height: 100vh;">
        <header style="background-color: #007bff; color: white; padding: 1em; text-align: center;">
          <h1>User Profile</h1>
        </header>
        <main style="padding: 1em; flex-grow: 1; text-align: center;">
          <img src="https://via.placeholder.com/100" alt="User Avatar" style="border-radius: 50%; margin-bottom: 1em;" />
          <h2>John Doe</h2>
          <p>john.doe@example.com</p>
        </main>
        <footer style="background-color: #007bff; color: white; padding: 0.5em; text-align: center; font-size: 0.8em;">
          <p>Profile Footer</p>
        </footer>
      </body>
    `,
  },
  {
    id: 'settings_preview',
    name: 'Settings',
    htmlContent: `
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; display: flex; flex-direction: column; height: 100vh;">
        <header style="background-color: #6c757d; color: white; padding: 1em; text-align: center;">
          <h1>Settings</h1>
        </header>
        <main style="padding: 1em; flex-grow: 1;">
          <div style="margin-bottom: 1em;">
            <label for="notifications" style="display: block; margin-bottom: 0.5em;">Enable Notifications:</label>
            <input type="checkbox" id="notifications" name="notifications" checked />
          </div>
          <div>
            <label for="theme" style="display: block; margin-bottom: 0.5em;">Theme:</label>
            <select id="theme" name="theme" style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </main>
        <footer style="background-color: #6c757d; color: white; padding: 0.5em; text-align: center; font-size: 0.8em;">
          <p>Save Changes</p>
        </footer>
      </body>
    `,
  },
];

const UIDesignPreviewView = () => {
  console.log('UIDesignPreviewView loaded');
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  const handleNavigation = (value: string) => {
    if (value) {
      navigate(value);
    }
  };

  const toggleTheme = () => {
    setCurrentTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    // In a real app, this would also apply the theme, e.g., by toggling a class on document.documentElement
    console.log(`Theme toggled to: ${currentTheme === 'light' ? 'dark' : 'light'}`);
    // For iframes, theme application is more complex (postMessage or re-rendering srcDoc with new styles)
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* CodeWindowHeader: Rendered as HTML header */}
      <header className="p-4 border-b bg-card shadow-sm flex-shrink-0">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">UI Design Preview</h1>
          <ToggleGroup
            type="single"
            defaultValue="/u-i-design-preview"
            onValueChange={handleNavigation}
            aria-label="View navigation"
          >
            <ToggleGroupItem value="/" aria-label="Switch to Code View">
              Code
            </ToggleGroupItem>
            <ToggleGroupItem value="/u-i-design-preview" aria-label="Switch to UI Design Preview View">
              UI Preview
            </ToggleGroupItem>
            <ToggleGroupItem value="/loading-status" aria-label="Switch to Loading Status View">
              Status
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto flex flex-col items-center justify-center bg-muted/20">
        {sampleMobilePages.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-lg" // Adjusted max-width for better presentation
          >
            <CarouselContent className="-ml-4">
              {sampleMobilePages.map((page, index) => (
                <CarouselItem key={page.id || index} className="pl-4 md:basis-1/1 lg:basis-1/1"> {/* Ensure items take full width */}
                  <div className="p-1"> {/* Added padding around mobile frame if needed */}
                    <MobileFrameComponent pages={[page]} /> {/* Pass one page at a time to MobileFrameComponent */}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden sm:flex" /> {/* Positioned outside on larger screens */}
            <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden sm:flex" />
          </Carousel>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>No mobile pages available for preview.</p>
          </div>
        )}
        
        <Button variant="outline" onClick={toggleTheme} className="mt-6">
          {currentTheme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
          Toggle Theme ({currentTheme})
        </Button>
      </main>

      {/* CodeWindowFooter: Rendered as HTML footer */}
      <footer className="p-4 border-t bg-card text-center text-sm text-muted-foreground flex-shrink-0">
        CodeWindow Footer &copy; {new Date().getFullYear()} - UI Preview Mode
      </footer>
    </div>
  );
};

export default UIDesignPreviewView;
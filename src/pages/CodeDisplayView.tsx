import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CodeViewerComponent, { FileModel } from '@/components/CodeViewerComponent'; // Custom component
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ScrollArea } from '@/components/ui/scroll-area'; // Though CodeViewerComponent uses it, it's in layout_info
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'; // For potential other uses or if CodeViewerComponent's tabs are conceptual
import { Sun, Moon, Code, MonitorSmartphone, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // For conditional class names

// Sample data for CodeViewerComponent
const sampleFiles: FileModel[] = [
  {
    id: 'file1.tsx',
    name: 'MyComponent.tsx',
    content: "import React from 'react';\n\nconst MyComponent = () => {\n  return (\n    <div className=\"p-4 bg-blue-100\">\n      <h1 className=\"text-xl text-blue-700\">Hello from MyComponent!</h1>\n      <p>This is a sample React component.</p>\n    </div>\n  );\n};\n\nexport default MyComponent;",
    language: 'typescript',
  },
  {
    id: 'file2.css',
    name: 'styles.css',
    content: "body {\n  font-family: sans-serif;\n  background-color: #f0f0f0;\n}\n\n.container {\n  padding: 1rem;\n  border: 1px solid #ccc;\n}",
    language: 'css',
  },
  {
    id: 'file3.json',
    name: 'package.json',
    content: "{\n  \"name\": \"my-app\",\n  \"version\": \"1.0.0\",\n  \"dependencies\": {\n    \"react\": \"^18.0.0\"\n  }\n}",
    language: 'json',
  },
  {
    id: 'emptyFile.txt',
    name: 'emptyFile.txt',
    content: '',
    language: 'plaintext',
  }
];

const CodeDisplayView = () => {
  console.log('CodeDisplayView loaded');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();
  const [currentView, setCurrentView] = useState<string>('/');

  useEffect(() => {
    // Update currentView based on browser's path
    setCurrentView(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Apply theme to HTML element
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Conceptual CodeWindowHeader part
  const CodeWindowHeader = (
    <header className="p-3 border-b bg-muted/30 dark:bg-muted/20 sticky top-0 z-10 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">Code Inspector</h1>
        <div className="flex items-center space-x-2">
          <ToggleGroup
            type="single"
            value={currentView}
            onValueChange={(value) => {
              if (value) setCurrentView(value); // Link will handle navigation
            }}
            aria-label="View mode"
            className="bg-muted p-0.5 rounded-md"
          >
            <ToggleGroupItem value="/" aria-label="Code Display" asChild>
              <Link to="/" className="flex items-center px-2 py-1 data-[state=on]:bg-background data-[state=on]:shadow-sm">
                <Code className="h-4 w-4 mr-1.5" /> Code
              </Link>
            </ToggleGroupItem>
            <ToggleGroupItem value="/u-i-design-preview" aria-label="UI Design Preview" asChild>
              <Link to="/u-i-design-preview" className="flex items-center px-2 py-1 data-[state=on]:bg-background data-[state=on]:shadow-sm">
                <MonitorSmartphone className="h-4 w-4 mr-1.5" /> UI Preview
              </Link>
            </ToggleGroupItem>
            <ToggleGroupItem value="/loading-status" aria-label="Loading Status" asChild>
              <Link to="/loading-status" className="flex items-center px-2 py-1 data-[state=on]:bg-background data-[state=on]:shadow-sm">
                <Loader2 className="h-4 w-4 mr-1.5" /> Status
              </Link>
            </ToggleGroupItem>
          </ToggleGroup>
          <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );

  // Conceptual CodeWindowFooter part
  const CodeWindowFooter = (
    <footer className="p-3 border-t bg-muted/30 dark:bg-muted/20 text-center text-xs text-muted-foreground">
      CodeWindow &copy; {new Date().getFullYear()} - All rights reserved.
    </footer>
  );

  return (
    <div className={cn("flex flex-col h-screen bg-background text-foreground", theme)}>
      {CodeWindowHeader}
      <main className="flex-1 overflow-hidden p-4">
        {/* 
          The layout_info mentions ScrollArea and Tabs.
          CodeViewerComponent itself uses ScrollArea for its internal content and Tabs for file navigation.
          So, we directly use CodeViewerComponent here as it embodies these functionalities.
        */}
        <CodeViewerComponent files={sampleFiles} />
      </main>
      {CodeWindowFooter}
    </div>
  );
};

export default CodeDisplayView;
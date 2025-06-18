import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the structure for a mobile page
interface MobilePage {
  id: string; // Unique identifier for the page, used for tab keys
  name: string; // Display name for the tab
  htmlContent: string; // HTML content to be rendered in an iframe
}

// Define the props for the MobileFrameComponent
interface MobileFrameComponentProps {
  pages: MobilePage[]; // An array of MobilePage objects
}

const MobileFrameComponent: React.FC<MobileFrameComponentProps> = ({ pages }) => {
  console.log('MobileFrameComponent loaded', { numPages: pages?.length });

  // Handle the case where there are no pages to display
  if (!pages || pages.length === 0) {
    return (
      <div className="flex items-center justify-center w-full max-w-xs sm:max-w-sm mx-auto h-96 bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-neutral-400 rounded-lg p-4">
        <p className="text-center">No UI design pages available to preview.</p>
      </div>
    );
  }

  // Set the default active tab to the first page if multiple pages exist
  const defaultTabValue = pages[0].id;

  return (
    // Outer container simulating the phone's chassis
    <div className="bg-neutral-900 p-2 sm:p-3 rounded-[2.5rem] shadow-2xl w-full max-w-[280px] sm:max-w-[320px] mx-auto">
      {/* Inner container simulating the phone's screen area */}
      <div className="aspect-[9/19.5] bg-black rounded-[2rem] overflow-hidden relative border-2 border-neutral-700">
        {/* Notch simulation at the top of the screen */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(50%-1rem)] max-w-[120px] h-6 bg-black rounded-b-xl z-20 flex items-center justify-center">
          <div className="w-10 h-1 bg-neutral-700 rounded-full"></div> {/* Speaker grille illusion */}
        </div>

        {/* Content area pushed below the notch */}
        <div className="absolute inset-0 pt-6 z-10 flex flex-col h-full">
          {pages.length > 1 ? (
            // If multiple pages, render Tabs for navigation
            <Tabs defaultValue={defaultTabValue} className="flex flex-col h-full w-full">
              <TabsList className="shrink-0 bg-black/80 backdrop-blur-sm px-2 pt-1 flex justify-center">
                {pages.map((page) => (
                  <TabsTrigger
                    key={page.id}
                    value={page.id}
                    className="text-xs px-2.5 py-1.5 h-auto text-neutral-400 data-[state=active]:text-white data-[state=active]:bg-neutral-600/70 hover:bg-neutral-700/50 rounded-md flex-grow-0"
                  >
                    {page.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {pages.map((page) => (
                <TabsContent
                  key={page.id}
                  value={page.id}
                  className="flex-grow bg-white dark:bg-neutral-100 overflow-y-auto mt-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <iframe
                    srcDoc={page.htmlContent || "<div style='padding:1rem; color:gray; font-family: sans-serif;'>No content for this page.</div>"}
                    title={page.name}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin" // Adjust sandbox as needed for security
                  />
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            // If single page, render it directly
            <div className="h-full bg-white dark:bg-neutral-100 overflow-y-auto">
              <iframe
                srcDoc={pages[0].htmlContent || "<div style='padding:1rem; color:gray; font-family: sans-serif;'>No content for this page.</div>"}
                title={pages[0].name}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileFrameComponent;
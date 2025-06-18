import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Copy, FileText } from 'lucide-react';

export interface FileModel {
  id: string; // Unique ID for each file
  name: string;
  content: string;
  language?: string; // e.g., 'typescript', 'javascript', 'css', 'html'
}

interface CodeViewerComponentProps {
  files: FileModel[];
}

const CodeViewerComponent: React.FC<CodeViewerComponentProps> = ({ files }) => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const { toast } = useToast();

  console.log('CodeViewerComponent rendered with files:', files?.length);

  useEffect(() => {
    // If files are available and no file is selected, or if the selected file is no longer in the list
    if (files && files.length > 0) {
      const currentFileExists = files.some(f => f.id === selectedFileId);
      if (!selectedFileId || !currentFileExists) {
        setSelectedFileId(files[0].id); // Select the first file
      }
    } else if (!files || files.length === 0) {
      setSelectedFileId(null); // No files, so no selection
    }
  }, [files, selectedFileId]);

  const selectedFile = files?.find(file => file.id === selectedFileId);

  const handleCopyToClipboard = async () => {
    if (selectedFile && selectedFile.content) {
      try {
        await navigator.clipboard.writeText(selectedFile.content);
        toast({
          title: "Copied to clipboard!",
          description: `Content of ${selectedFile.name} has been copied.`,
        });
      } catch (err) {
        console.error("Failed to copy text: ", err);
        toast({
          title: "Error Copying",
          description: "Could not copy content to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  if (!files || files.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/20 text-center">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-lg font-medium text-muted-foreground">No Files Available</p>
        <p className="text-sm text-muted-foreground">There are no code files to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-card">
      <Tabs
        value={selectedFileId || (files.length > 0 ? files[0].id : undefined)}
        onValueChange={setSelectedFileId}
        className="flex flex-col flex-grow" // Tabs itself should grow
      >
        <div className="flex-shrink-0 border-b bg-muted/40">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="p-1 h-auto rounded-none border-none">
              {files.map((file) => (
                <TabsTrigger
                  key={file.id}
                  value={file.id}
                  className="text-xs px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  {file.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>
        </div>

        {files.map((file) => (
          <TabsContent
            key={file.id}
            value={file.id}
            className="flex-grow flex flex-col overflow-hidden data-[state=inactive]:hidden mt-0 p-0" // mt-0 and p-0 to reset defaults
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-2 border-b bg-muted/20 flex-shrink-0">
                <h3 className="font-medium text-sm truncate" title={file.name}>
                  {file.name}
                </h3>
                <Button
                  variant="ghost"
                  size="sm" // Changed from "icon" to "sm" for better text visibility
                  onClick={handleCopyToClipboard}
                  disabled={!file.content}
                  aria-label={`Copy content of ${file.name}`}
                  className="px-2" // Added padding for "sm" button
                >
                  <Copy className="h-3.5 w-3.5 mr-1.5" /> {/* Adjusted icon size and margin */}
                  Copy
                </Button>
              </div>

              <ScrollArea className="flex-grow bg-background">
                {/* 
                  DEVELOPER NOTE:
                  Syntax highlighting and line numbers are not implemented due to missing dependencies.
                  To add syntax highlighting, consider using a library like 'react-syntax-highlighter'.
                  Example steps:
                  1. Install: `npm install react-syntax-highlighter @types/react-syntax-highlighter` (or yarn/pnpm/bun)
                  2. Import: 
                     `import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';`
                     `import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';` (or any other style)
                  3. Replace the <pre> tag below with:
                     <SyntaxHighlighter
                       language={file.language || 'plaintext'}
                       style={okaidia} // e.g., okaidia, atomDark, solarizedlight
                       showLineNumbers // Optional: if you want line numbers
                       wrapLines // Optional: to wrap long lines
                       lineNumberStyle={{ minWidth: '3em', opacity: 0.6, userSelect: 'none' }}
                       customStyle={{ padding: '1rem', margin: '0', fontSize: '0.875rem', height: '100%', overflow: 'auto' }}
                       codeTagProps={{ style: { fontFamily: "var(--font-mono)" } }} // Use monospace font
                     >
                       {String(file.content || '// This file is empty.')}
                     </SyntaxHighlighter>
                  Ensure to pass the correct `language` string (e.g., 'tsx', 'css', 'json') in your `FileModel`.
                */}
                <pre className="p-4 text-sm whitespace-pre-wrap break-words h-full font-mono selection:bg-primary/20">
                  <code>{file.content || '// This file is empty or content is not available.'}</code>
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeViewerComponent;
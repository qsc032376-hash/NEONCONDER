import React, { useState, useEffect } from 'react';
import { AppView, ProgrammingLanguage, LevelData, UserProgress } from './types';
import { Landing } from './views/Landing';
import { Roadmap } from './views/Roadmap';
import { Arena } from './views/Arena';

// --- CURRICULUM DATA ---

const GENERIC_LEVELS: Omit<LevelData, 'isLocked' | 'isCompleted'>[] = [
  { id: 1, title: "Hello World Protocol", description: "Initialize communications. Learn basic syntax and output.", topic: "Printing output and basic syntax" },
  { id: 2, title: "Data Vaults", description: "Secure storage for primitive data.", topic: "Variables and Data Types (Strings, Integers)" },
  { id: 3, title: "Neural Arithmetic", description: "Process numeric calculations in the core.", topic: "Basic Arithmetic and Math Operations" },
  { id: 4, title: "Type Mutation", description: "Convert data forms to bypass security filters.", topic: "Type Casting and Conversion" },
  { id: 5, title: "Logic Gates", description: "Establish decision pathways.", topic: "If/Else Conditionals" },
  { id: 6, title: "Binary Nexus", description: "Complex decision trees using boolean logic.", topic: "Logical Operators (AND, OR, NOT)" },
  { id: 7, title: "Loop Cycles: Alpha", description: "Automate tasks with conditional repetition.", topic: "While Loops" },
  { id: 8, title: "Loop Cycles: Beta", description: "Iterate through defined sequences.", topic: "For Loops" },
  { id: 9, title: "Data Arrays", description: "Structure multiple data points in linear formations.", topic: "Introduction to Arrays/Lists" },
  { id: 10, title: "Array Manipulation", description: "Modify the contents of data structures.", topic: "List/Array Methods (Add, Remove, Sort)" },
  { id: 11, title: "Sequence Traversal", description: "Process every item in a data stream.", topic: "Iterating over Arrays/Lists" },
  { id: 12, title: "Function Modules", description: "Encapsulate code for reusable subroutines.", topic: "Defining Functions" },
  { id: 13, title: "Parameter Injection", description: "Pass dynamic data into locked modules.", topic: "Function Parameters and Arguments" },
  { id: 14, title: "Return Signals", description: "Extract results from processed functions.", topic: "Return Values" },
  { id: 15, title: "Key-Value Storage", description: "Map data to specific access keys.", topic: "Dictionaries / Hash Maps / Objects" },
  { id: 16, title: "String Decoding", description: "Analyze and manipulate text patterns.", topic: "String Manipulation Methods" },
  { id: 17, title: "Object Blueprints", description: "Design complex data structures.", topic: "Classes and Objects (OOP Basics)" },
  { id: 18, title: "Method Protocols", description: "Define behaviors for your objects.", topic: "Class Methods" },
  { id: 19, title: "Exception Shields", description: "Protect the system from critical failures.", topic: "Error Handling (Try/Catch/Except)" },
  { id: 20, title: "Recursive Loop", description: "Self-referential algorithms for deep solving.", topic: "Recursion and Base Cases" },
];

const HTML_LEVELS: Omit<LevelData, 'isLocked' | 'isCompleted'>[] = [
  { id: 1, title: "The Skeleton", description: "Construct the basic anatomy of a web document.", topic: "HTML Basic Structure (html, head, body)" },
  { id: 2, title: "Headline Signals", description: "Broadcast hierarchy with header tags.", topic: "Headings (h1-h6) and Paragraphs" },
  { id: 3, title: "Hyperlink Grid", description: "Connect nodes within the network.", topic: "Anchor tags and Href attributes" },
  { id: 4, title: "Visual Assets", description: "Embed static imagery into the display.", topic: "Image tags and Source attributes" },
  { id: 5, title: "Ordered Data", description: "Structure information in sequence.", topic: "Ordered and Unordered Lists" },
  { id: 6, title: "Div Containers", description: "Create generic storage units for content.", topic: "Divs and Spans" },
  { id: 7, title: "ID Signatures", description: "Assign unique identifiers to elements.", topic: "ID and Class attributes" },
  { id: 8, title: "Data Grids", description: "Organize complex data into tabular formats.", topic: "Tables (tr, td, th)" },
  { id: 9, title: "Input Terminals", description: "Create entry points for user data.", topic: "Forms and Input fields" },
  { id: 10, title: "Selection Nodes", description: "Implement multiple choice interfaces.", topic: "Checkboxes and Radio buttons" },
  { id: 11, title: "Semantic Header", description: "Define the top-level navigation zone.", topic: "Semantic HTML: Header and Nav" },
  { id: 12, title: "Content Blocks", description: "Isolate independent content modules.", topic: "Semantic HTML: Article and Section" },
  { id: 13, title: "Media Streams", description: "Embed audio and video feeds.", topic: "Audio and Video tags" },
  { id: 14, title: "Meta Data", description: "Configure the document's hidden properties.", topic: "Meta tags and Charset" },
  { id: 15, title: "Form Types", description: "Specialized input validation fields.", topic: "Input types (email, password, date)" },
  { id: 16, title: "External Portals", description: "Embed remote content windows.", topic: "Iframes and Embeds" },
  { id: 17, title: "Table Headers", description: "Advanced data organization.", topic: "Thead, Tbody, Tfoot" },
  { id: 18, title: "Interactive Details", description: "Create collapsible information widgets.", topic: "Details and Summary tags" },
  { id: 19, title: "Script Injection", description: "Link to executable logic files.", topic: "Linking Scripts and Stylesheets" },
  { id: 20, title: "Portfolio Nexus", description: "Compile all modules into a personal identity hub.", topic: "Final Project: Building a complete personal portfolio page structure" },
];

const APP_DESIGN_LEVELS: Omit<LevelData, 'isLocked' | 'isCompleted'>[] = [
  { id: 1, title: "Concept Origin", description: "Define the application purpose and scope.", topic: "Requirements Gathering and Comments/Docstrings" },
  { id: 2, title: "Data Modeling", description: "Architect the core data structures.", topic: "Defining Data Structures/Classes for Users" },
  { id: 3, title: "UI Blueprint", description: "Draft the visual layout logic.", topic: "Pseudocode for UI Layout Components" },
  { id: 4, title: "Event Horizon", description: "Map user interactions to logic triggers.", topic: "Event Listeners and Handlers" },
  { id: 5, title: "State Core", description: "Design the central memory management.", topic: "State Management Concepts" },
  { id: 6, title: "Nav Protocol", description: "Route users between interface modules.", topic: "Routing Logic and Navigation" },
  { id: 7, title: "API Gateway", description: "Setup communication channels with the cloud.", topic: "Mocking API Requests (GET)" },
  { id: 8, title: "Auth Shield", description: "Implement security login protocols.", topic: "Authentication Logic Flow" },
  { id: 9, title: "Schema Design", description: "Structure the persistent storage layer.", topic: "Database Schema Design (Mock SQL/NoSQL)" },
  { id: 10, title: "Create Ops", description: "Implement data insertion logic.", topic: "CRUD: Create Operations" },
  { id: 11, title: "Read Ops", description: "Implement data retrieval systems.", topic: "CRUD: Read Operations" },
  { id: 12, title: "Update Ops", description: "Implement data modification systems.", topic: "CRUD: Update and Delete" },
  { id: 13, title: "Error Guards", description: "Fortify against crash conditions.", topic: "Validation and Error Boundaries" },
  { id: 14, title: "Async Loader", description: "Handle latency in data transmission.", topic: "Asynchronous Programming Patterns" },
  { id: 15, title: "Local Cache", description: "Implement client-side persistence.", topic: "Local Storage / Caching Logic" },
  { id: 16, title: "Service Uplink", description: "Integrate third-party functional modules.", topic: "Integrating External Services" },
  { id: 17, title: "Security Patch", description: "Sanitize inputs against injection attacks.", topic: "Security Best Practices (Sanitization)" },
  { id: 18, title: "Opti-Prime", description: "Refine code for maximum efficiency.", topic: "Performance Optimization Logic" },
  { id: 19, title: "Build Config", description: "Prepare the asset bundle for deployment.", topic: "Build Scripts and Configuration" },
  { id: 20, title: "Deploy Launch", description: "Finalize and export the master executable.", topic: "Final Project: Assembly and Deployment Configuration" },
];

// --- APP COMPONENT ---

export default function App() {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [currentLanguage, setCurrentLanguage] = useState<ProgrammingLanguage>(ProgrammingLanguage.PYTHON);
  const [progress, setProgress] = useState<UserProgress>({
    unlockedLevelIndex: 0,
    language: ProgrammingLanguage.PYTHON
  });
  const [activeLevelId, setActiveLevelId] = useState<number>(1);

  // Load progress from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('neonCoderProgress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress(parsed);
      } catch (e) {
        console.error("Failed to load progress");
      }
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('neonCoderProgress', JSON.stringify(progress));
  }, [progress]);

  // Select curriculum based on language
  const getBaseLevels = (lang: ProgrammingLanguage) => {
    if (lang === ProgrammingLanguage.HTML) return HTML_LEVELS;
    if (lang === ProgrammingLanguage.APP_DESIGN) return APP_DESIGN_LEVELS;
    return GENERIC_LEVELS;
  };

  // Compute detailed level objects based on progress
  const getLevels = (): LevelData[] => {
    const base = getBaseLevels(currentLanguage);
    return base.map((lvl, index) => ({
      ...lvl,
      isLocked: index > progress.unlockedLevelIndex,
      isCompleted: index < progress.unlockedLevelIndex,
    }));
  };

  const handleLanguageSelect = (lang: ProgrammingLanguage) => {
    setCurrentLanguage(lang);
    // Reset progress if switching to a new language track
    if (lang !== progress.language) {
        setProgress({
            language: lang,
            unlockedLevelIndex: 0
        });
    }
    setView(AppView.ROADMAP);
  };

  const handleLevelSelect = (levelId: number) => {
    setActiveLevelId(levelId);
    setView(AppView.ARENA);
  };

  const handleLevelComplete = () => {
    const currentLevelIndex = activeLevelId - 1;
    // Only unlock next level if we are at the frontier of progress
    if (currentLevelIndex === progress.unlockedLevelIndex) {
      setProgress(prev => ({
        ...prev,
        unlockedLevelIndex: prev.unlockedLevelIndex + 1
      }));
    }
    setView(AppView.ROADMAP);
  };

  const activeLevelData = getLevels().find(l => l.id === activeLevelId) || getLevels()[0];

  return (
    <div className="font-sans antialiased text-gray-100 bg-cyber-black min-h-screen selection:bg-cyber-neonPink selection:text-white">
      {view === AppView.LANDING && (
        <Landing onSelectLanguage={handleLanguageSelect} />
      )}
      
      {view === AppView.ROADMAP && (
        <Roadmap 
          levels={getLevels()} 
          language={currentLanguage} 
          onSelectLevel={handleLevelSelect} 
          onBack={() => setView(AppView.LANDING)}
        />
      )}

      {view === AppView.ARENA && (
        <Arena 
          level={activeLevelData} 
          language={currentLanguage}
          onComplete={handleLevelComplete}
          onExit={() => setView(AppView.ROADMAP)}
        />
      )}
    </div>
  );
}
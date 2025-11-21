export enum AppView {
  LANDING = 'LANDING',
  ROADMAP = 'ROADMAP',
  ARENA = 'ARENA', // The coding interface
}

export enum ProgrammingLanguage {
  PYTHON = 'Python',
  JAVASCRIPT = 'JavaScript',
  CPP = 'C++',
  JAVA = 'Java',
  HTML = 'HTML5',
  APP_DESIGN = 'App Architect',
}

export interface LevelData {
  id: number;
  title: string;
  description: string;
  isLocked: boolean;
  isCompleted: boolean;
  topic: string; // Used for AI generation prompt
}

export interface LessonContent {
  title: string;
  theoryMarkdown: string; // Educational content
  taskDescription: string;
  starterCode: string;
  hints: string[];
}

export interface CodeExecutionResult {
  output: string;
  isSuccess: boolean;
  feedback: string;
}

export interface UserProgress {
  unlockedLevelIndex: number; // 0-based index of highest unlocked level
  language: ProgrammingLanguage;
}
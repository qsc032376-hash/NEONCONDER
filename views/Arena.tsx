import React, { useState, useEffect, useCallback } from 'react';
import { generateLesson, judgeCode } from '../services/geminiService';
import { LevelData, ProgrammingLanguage, LessonContent } from '../types';
import { Loader } from '../components/Loader';
import { CyberButton } from '../components/CyberButton';
import { ArrowLeft, Play, AlertCircle, Check, HelpCircle, Terminal as TerminalIcon, Download } from 'lucide-react';

interface ArenaProps {
  level: LevelData;
  language: ProgrammingLanguage;
  onComplete: () => void;
  onExit: () => void;
}

export const Arena: React.FC<ArenaProps> = ({ level, language, onComplete, onExit }) => {
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string>('// Console ready...');
  const [isJudging, setIsJudging] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [success, setSuccess] = useState(false);

  // Initialize lesson
  useEffect(() => {
    let mounted = true;
    const fetchLesson = async () => {
      setLoading(true);
      const content = await generateLesson(language, level.topic, level.id);
      if (mounted) {
        setLesson(content);
        setCode(content.starterCode);
        setLoading(false);
        setSuccess(false);
        setFeedback(null);
        setOutput('// Console ready...');
      }
    };
    fetchLesson();
    return () => { mounted = false; };
  }, [language, level]);

  const handleRun = useCallback(async () => {
    if (!lesson) return;
    setIsJudging(true);
    setFeedback(null);
    setOutput('// Compiling and executing via Neural Link...');
    
    const result = await judgeCode(language, lesson.taskDescription, code);
    
    setIsJudging(false);
    setOutput(result.output || 'No output');
    setFeedback(result.feedback);
    
    if (result.isSuccess) {
      setSuccess(true);
    }
  }, [code, language, lesson]);

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neon_project_lvl${level.id}.${language === 'HTML5' ? 'html' : 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-cyber-black">
        <Loader />
      </div>
    );
  }

  if (!lesson) return null;

  const isFinalLevel = level.id === 20;

  return (
    <div className="h-screen w-full bg-cyber-black flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-cyber-gray bg-cyber-dark flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center space-x-4">
          <button onClick={onExit} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <span className="font-mono text-cyber-neonPink text-sm">LVL {level.id < 10 ? `0${level.id}` : level.id} :: {language}</span>
          <span className="h-4 w-px bg-cyber-gray"></span>
          <h1 className="font-display font-bold text-white text-lg truncate">{lesson.title}</h1>
        </div>
        <div className="flex items-center space-x-2">
           <button 
             onClick={() => setShowHint(!showHint)}
             className="p-2 text-cyber-neonCyan hover:bg-cyber-neonCyan/10 rounded transition-colors"
             title="Request Hint"
           >
             <HelpCircle size={20} />
           </button>
        </div>
      </header>

      {/* Main Content Split */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left: Theory & Task */}
        <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-cyber-gray bg-cyber-black/50 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <section>
              <h2 className="text-cyber-neonCyan font-display font-bold mb-3 tracking-wide">THEORY UPLINK</h2>
              <div className="prose prose-invert prose-code:text-cyber-neonPink prose-headings:text-white text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                {lesson.theoryMarkdown}
              </div>
            </section>
            
            <div className="h-px bg-gradient-to-r from-transparent via-cyber-gray to-transparent"></div>
            
            <section className="bg-cyber-dark/50 p-4 border border-cyber-gray rounded relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyber-neonPink"></div>
              <h2 className="text-white font-display font-bold mb-2 flex items-center gap-2">
                <AlertCircle size={16} className="text-cyber-neonPink" />
                MISSION OBJECTIVE
              </h2>
              <p className="text-gray-300 text-sm font-mono">{lesson.taskDescription}</p>
            </section>

            {showHint && (
               <section className="bg-cyber-neonCyan/5 p-4 border border-cyber-neonCyan/30 rounded animate-fade-in">
                 <h3 className="text-cyber-neonCyan text-xs font-bold mb-1">DECRYPTED HINT:</h3>
                 <ul className="list-disc pl-4 text-xs text-gray-300 space-y-1">
                   {lesson.hints.map((h, i) => <li key={i}>{h}</li>)}
                 </ul>
               </section>
            )}
          </div>
        </div>

        {/* Right: Code & Terminal */}
        <div className="w-full md:w-7/12 flex flex-col bg-[#0d0d16]">
          {/* Editor */}
          <div className="flex-1 relative flex flex-col min-h-[300px]">
            <div className="bg-cyber-dark border-b border-cyber-gray px-4 py-2 flex justify-between items-center text-xs font-mono text-gray-500">
              <span>main.{language === 'HTML5' ? 'html' : language === 'Python' ? 'py' : language === 'JavaScript' ? 'js' : language === 'C++' ? 'cpp' : 'java'}</span>
              <span>EDIT MODE</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full bg-[#0d0d16] text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-cyber-gray"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
            />
          </div>

          {/* Actions Bar */}
          <div className="h-14 bg-cyber-dark border-t border-cyber-gray flex items-center justify-end px-4 gap-4 shrink-0">
             {success ? (
               <div className="flex items-center gap-4">
                  {isFinalLevel && (
                    <button 
                      onClick={handleDownload}
                      className="flex items-center gap-2 text-cyber-neonCyan hover:text-white transition-colors font-mono text-sm border border-cyber-neonCyan px-3 py-1.5 rounded hover:bg-cyber-neonCyan/20"
                    >
                      <Download size={14} />
                      EXPORT ARTIFACT
                    </button>
                  )}
                  <span className="text-cyber-neonGreen font-mono font-bold animate-pulse">MISSION ACCOMPLISHED</span>
                  <CyberButton onClick={onComplete} glow>Next Level</CyberButton>
               </div>
             ) : (
                <CyberButton onClick={handleRun} disabled={isJudging} glow>
                  <div className="flex items-center gap-2">
                    <Play size={16} className={isJudging ? "animate-spin" : ""} />
                    {isJudging ? 'EXECUTING...' : 'RUN CODE'}
                  </div>
                </CyberButton>
             )}
          </div>

          {/* Terminal / Output */}
          <div className="h-48 md:h-1/3 bg-black border-t border-cyber-gray flex flex-col shrink-0">
            <div className="bg-cyber-gray/20 px-4 py-1 flex items-center gap-2">
               <TerminalIcon size={12} className="text-gray-500" />
               <span className="text-xs font-mono text-gray-500">
                  {language === 'HTML5' ? 'BROWSER RENDER PREVIEW' : 'TERMINAL OUTPUT'}
               </span>
            </div>
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto">
              <pre className={`${isJudging ? 'text-yellow-500' : success ? 'text-cyber-neonGreen' : 'text-cyber-neonCyan'} whitespace-pre-wrap`}>
                {output}
              </pre>
              {feedback && !success && (
                <div className="mt-2 pt-2 border-t border-red-900/50 text-red-400">
                  [SYSTEM_ERROR]: {feedback}
                </div>
              )}
              {success && feedback && (
                 <div className="mt-2 pt-2 border-t border-green-900/50 text-green-400">
                  [SYSTEM_MSG]: {feedback}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
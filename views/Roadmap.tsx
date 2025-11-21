import React from 'react';
import { LevelData, ProgrammingLanguage } from '../types';
import { Lock, Unlock, CheckCircle, ChevronRight } from 'lucide-react';
import { CyberButton } from '../components/CyberButton';

interface RoadmapProps {
  levels: LevelData[];
  language: ProgrammingLanguage;
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
}

export const Roadmap: React.FC<RoadmapProps> = ({ levels, language, onSelectLevel, onBack }) => {
  return (
    <div className="min-h-screen bg-cyber-black flex flex-col relative">
       {/* Header */}
       <header className="p-6 border-b border-cyber-gray bg-cyber-black/90 backdrop-blur z-10 flex justify-between items-center sticky top-0">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">
            <span className="text-cyber-neonPink">{language}</span> MASTERY PATH
          </h2>
          <p className="text-sm font-mono text-gray-400">SELECT YOUR MISSION</p>
        </div>
        <CyberButton variant="secondary" onClick={onBack} className="text-sm py-2 px-4">
          Abort
        </CyberButton>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-12 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none h-full"></div>
        
        <div className="max-w-3xl mx-auto space-y-8 relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-8 top-8 bottom-8 w-1 bg-cyber-gray ml-0.5"></div>

          {levels.map((level, index) => {
            const isClickable = !level.isLocked;
            return (
              <div 
                key={level.id} 
                className={`relative pl-24 transition-all duration-500 ${isClickable ? 'opacity-100' : 'opacity-50 grayscale'}`}
              >
                {/* Connector Node */}
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 bg-cyber-black
                  ${level.isCompleted ? 'border-cyber-neonGreen text-cyber-neonGreen shadow-[0_0_10px_#00ff00]' : 
                    level.isLocked ? 'border-gray-600 text-gray-600' : 'border-cyber-neonCyan text-cyber-neonCyan shadow-[0_0_10px_#00ffff]'}
                `}>
                  {level.isCompleted ? <CheckCircle size={20} /> : level.isLocked ? <Lock size={18} /> : <Unlock size={18} />}
                </div>

                {/* Card */}
                <button
                  onClick={() => isClickable && onSelectLevel(level.id)}
                  disabled={!isClickable}
                  className={`w-full text-left group bg-cyber-dark border p-6 relative overflow-hidden transition-all duration-300
                    ${isClickable ? 'border-cyber-gray hover:border-cyber-neonCyan hover:bg-cyber-gray/50 cursor-pointer' : 'border-cyber-dark cursor-not-allowed'}
                  `}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <span className="font-mono text-xs text-cyber-neonPink mb-1 block">LEVEL 0{level.id}</span>
                      <h3 className="text-xl font-display font-bold text-white">{level.title}</h3>
                      <p className="text-gray-400 text-sm mt-1 max-w-md">{level.description}</p>
                    </div>
                    {isClickable && (
                      <ChevronRight className="text-cyber-neonCyan opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all" />
                    )}
                  </div>
                  
                  {/* Progress Bar Decor for current level */}
                  {!level.isLocked && !level.isCompleted && (
                    <div className="absolute bottom-0 left-0 h-1 bg-cyber-neonCyan w-1/3 animate-pulse"></div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
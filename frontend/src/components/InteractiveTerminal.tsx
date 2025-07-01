import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';

interface TerminalCommand {
  command: string;
  output: string;
  delay?: number;
}

const InteractiveTerminal: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [currentLine, setCurrentLine] = useState('');
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([
    {
      command: 'ssh stef@portfolio.dev',
      output: `${t('terminal.welcome')}\nType \"help\" to see available commands...`,
      delay: 0
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const executeCommand = async (commandData: TerminalCommand) => {
    setIsTyping(true);
    
    // Simulate typing the command
    for (let i = 0; i < commandData.command.length; i++) {
      setCurrentLine(commandData.command.slice(0, i + 1));
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    setCurrentLine('');
    setCommandHistory(prev => [...prev, { command: commandData.command, output: '' }]);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, commandData.delay || 500));
    
    // Type out the response
    let output = '';
    for (let i = 0; i < commandData.output.length; i++) {
      output += commandData.output[i];
      setCommandHistory(prev => 
        prev.map((cmd, idx) => 
          idx === prev.length - 1 
            ? { ...cmd, output } 
            : cmd
        )
      );
      await new Promise(resolve => setTimeout(resolve, 20));
    }
    
    setIsTyping(false);
    
    if (commandData.command === 'ssh stef@portfolio.dev') {
      // After SSH, show the help command
      setTimeout(() => {
        executeCommand({
          command: 'help',
          output: `${t('terminal.help')}\n` +
                  `  help     - ${t('terminal.help')}\n` +
                  `  start    - ${t('terminal.start')}\n` +
                  `  about    - ${t('terminal.about')}\n` +
                  `  lang     - ${t('terminal.lang')}\n` +
                  `  clear    - ${t('terminal.clear')}\n`,
          delay: 300
        });
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentLine.trim()) {
      const command = currentLine.trim();
      setCurrentLine('');
      // No agregar aquí el comando al historial, solo ejecutarlo
      switch (command.toLowerCase()) {
        case 'ssh stef@portfolio.dev':
          executeCommand({
            command,
            output: 'Already connected!\n',
            delay: 300
          });
          break;
        case 'start':
          executeCommand({
            command,
            output: `Starting Stef's Code Adventure...\nRedirecting to level 1...\n`,
            delay: 1000
          });
          setTimeout(() => router.push('/adventure'), 2000);
          break;
        case 'help':
          executeCommand({
            command,
            output: `${t('terminal.help')}\n` +
                    `  start    - ${t('terminal.start')}\n` +
                    `  about    - ${t('terminal.about')}\n` +
                    `  lang     - ${t('terminal.lang')}\n` +
                    `  clear    - ${t('terminal.clear')}\n`,
            delay: 300
          });
          break;
        case 'about':
          executeCommand({
            command,
            output: `${t('terminal.about.stef')}\n`,
            delay: 500
          });
          break;
        case 'clear':
          setCommandHistory([
            {
              command: 'ssh stef@portfolio.dev',
              output: `${t('terminal.welcome')}\nType \"help\" to see available commands...`,
              delay: 0
            }
          ]);
          break;
        case 'lang':
          executeCommand({
            command,
            output: `${t('terminal.lang')}:\n` +
                    `  lang es  - Español\n` +
                    `  lang en  - English\n` +
                    `  lang fr  - Français\n`,
            delay: 300
          });
          break;
        case 'lang es':
        case 'lang en':
        case 'lang fr':
          const lang = command.split(' ')[1];
          const langMessages = {
            es: `${t('terminal.language.changed')} Español 🇪🇸\n`,
            en: `${t('terminal.language.changed')} English 🇺🇸\n`,
            fr: `${t('terminal.language.changed')} Français 🇫🇷\n`
          };
          setLanguage(lang as 'es' | 'en' | 'fr');
          executeCommand({
            command,
            output: langMessages[lang as keyof typeof langMessages] || 'Language not supported\n',
            delay: 300
          });
          break;
        default:
          executeCommand({
            command,
            output: `${t('terminal.command.not.found')} ${command}\n${t('terminal.type.help')}\n`,
            delay: 300
          });
      }
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button close"></span>
          <span className="terminal-button minimize"></span>
          <span className="terminal-button maximize"></span>
        </div>
        <div className="terminal-title">stef@portfolio.dev</div>
      </div>
      
      <div 
        className="terminal-body" 
        ref={terminalRef}
        onClick={() => inputRef.current?.focus()}
      >
        {commandHistory.map((cmd, index) => (
          <div key={index} className="command-block">
            <div className="command-line">
              <span className="prompt">$ </span>
              <span className="command">{cmd.command}</span>
            </div>
            {cmd.output && (
              <div className="command-output" dangerouslySetInnerHTML={{ __html: cmd.output.replace(/\n/g, '<br/>') }} />
            )}
          </div>
        ))}
        {/* El prompt de entrada y el input solo aparecen cuando isTyping es false, fuera del historial */}
        { !isTyping && (
          <div className="current-line">
            <span className="prompt">$ </span>
            <span className="command">{currentLine}</span>
            {showCursor && <span className="cursor">|</span>}
            <input
              ref={inputRef}
              type="text"
              value={currentLine}
              onChange={(e) => setCurrentLine(e.target.value)}
              onKeyPress={handleKeyPress}
              className="terminal-input"
              autoFocus
              placeholder=""
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', font: 'inherit', width: '90%' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveTerminal; 
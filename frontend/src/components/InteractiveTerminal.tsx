import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';
import { useTerminal } from '../contexts/TerminalContext';
import LanguageSwitcher from './LanguageSwitcher';

interface TerminalCommand {
  command: string;
  output: string;
  delay?: number;
}

const InteractiveTerminal: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { commandHistory, setCommandHistory, addCommand, updateCommandOutput, isInitialized, setIsInitialized, initializeTerminal, clearHistory } = useTerminal();
  const [currentLine, setCurrentLine] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);


  useEffect(() => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  useEffect(() => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  const executeCommand = useCallback(async (commandData: TerminalCommand) => {
    setIsTyping(true);
    
    // Type the command
    for (let i = 0; i < commandData.command.length; i++) {
      setCurrentLine(commandData.command.slice(0, i + 1));
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    setCurrentLine('');
    
    // Add command to history with empty output first
    addCommand({ command: commandData.command, output: '' });
    
    // Wait before showing output
    await new Promise(resolve => setTimeout(resolve, commandData.delay || 500));
    
    // Type the output character by character
    let output = '';
    for (let i = 0; i < commandData.output.length; i++) {
      output += commandData.output[i];
      // Update the last command in history with the current output
      addCommand({ command: commandData.command, output });
      await new Promise(resolve => setTimeout(resolve, 20));
    }
    
    setIsTyping(false);
  }, [addCommand]);

  // Memoize translated command outputs - only translate when not typing
  const translatedCommands = useMemo(() => {
    return commandHistory.map(cmd => {
      let translatedOutput = cmd.output;
      
      // Only translate if we're not currently typing
      if (!isTyping) {
        // Translate specific command outputs based on language
        if (cmd.command === 'ssh stef@portfolio.dev') {
          translatedOutput = `${t('terminal.welcome')}\n${t('terminal.help.prompt')}`;
        } else if (cmd.command === 'help') {
          translatedOutput = `${t('terminal.help')}\n` +
                           `  start    - ${t('terminal.start')}\n` +
                           `  projects - ${t('terminal.projects')}\n` +
                           `  stack    - ${t('terminal.stack')}\n` +
                           `  about    - ${t('terminal.about')}\n` +
                           `  recruiter-mode - ${t('terminal.recruiter-mode')}\n` +
                           `  clear    - ${t('terminal.clear')}\n`;
        } else if (cmd.command === 'about') {
          translatedOutput = `${t('terminal.about.stef')}\n`;
        } else if (cmd.command === 'start') {
          translatedOutput = `${t('terminal.starting.adventure')}\n${t('terminal.redirecting.level')}\n`;
        } else if (cmd.command === 'lang') {
          translatedOutput = `${t('terminal.lang')}:\n` +
                           `  lang es  - Español\n` +
                           `  lang en  - English\n` +
                           `  lang fr  - Français\n`;
        }
      }
      
      return {
        ...cmd,
        output: translatedOutput
      };
    });
  }, [commandHistory, language, t, isTyping]);


  useEffect(() => {
    if (!isInitialized) {
      setTimeout(() => {
        executeCommand({
          command: 'ssh stef@portfolio.dev',
          output: `${t('terminal.welcome')}\n${t('terminal.help.prompt')}`,
          delay: 1000
        });
        setIsInitialized(true);
      }, 500);
    }
  }, [isInitialized, t, setIsInitialized, executeCommand]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentLine.trim()) {
      const command = currentLine.trim();
      setCurrentLine('');
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
            output: `${t('terminal.starting.adventure')}\n${t('terminal.redirecting.level')}\n`,
            delay: 1000
          });
          setTimeout(() => router.push('/adventure'), 2000);
          break;
        case 'help':
          executeCommand({
            command,
            output: `${t('terminal.help')}\n` +
                    `  start    - ${t('terminal.start')}\n` +
                    `  projects - ${t('terminal.projects')}\n` +
                    `  stack    - ${t('terminal.stack')}\n` +
                    `  about    - ${t('terminal.about')}\n` +
                    `  recruiter-mode - ${t('terminal.recruiter-mode')}\n` +
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
        case 'projects':
          executeCommand({
            command,
            output: `Redirecting to projects view...\n`,
            delay: 500
          });
          setTimeout(() => router.push('/projects'), 1000);
          break;
        case 'stack':
          executeCommand({
            command,
            output: `Redirecting to tech stack view...\n`,
            delay: 500
          });
          setTimeout(() => router.push('/stack'), 1000);
          break;
        case 'clear':
          // Clear history using context function
          clearHistory();
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

        case 'recruiter-mode':
          executeCommand({
            command,
            output: `⏩ Fast track activated!\n`,
            delay: 300
          });
          setTimeout(() => router.push('/recruiter'), 1500);
          break;
        case 'skip':
          executeCommand({
            command,
            output: `Command "skip" is deprecated. Try 'recruiter-mode' instead 😉\n`,
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

  useEffect(() => {
    const handleScroll = () => {
      if (!terminalRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = terminalRef.current;
      // Considera "abajo" si está a 10px del fondo
      setIsUserAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    };
    const ref = terminalRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (ref) {
        ref.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (terminalRef.current && isUserAtBottom) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [translatedCommands, isUserAtBottom]);

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button close"></span>
          <span className="terminal-button minimize"></span>
          <span className="terminal-button maximize"></span>
        </div>
        <div className="terminal-title">stef@portfolio.dev</div>
        <div style={{ marginLeft: 'auto' }}>
          <LanguageSwitcher />
        </div>
      </div>
      
      <div 
        className="terminal-body" 
        ref={terminalRef}
        onClick={() => inputRef.current?.focus()}
      >
        {translatedCommands.map((cmd, index) => (
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

        { !isTyping && (
          <div className="current-line">
            <span className="prompt">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={currentLine}
              onChange={(e) => setCurrentLine(e.target.value)}
              onKeyPress={handleKeyPress}
              className="terminal-input visible-input"
              autoFocus
              placeholder=""
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', font: 'inherit', width: '90%' }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveTerminal; 
import React, { useState, useEffect, useRef } from 'react';
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
  const { 
    commandHistory, 
    setCommandHistory, 
    addCommand, 
    updateCommandOutput, 
    isInitialized, 
    setIsInitialized,
    initializeTerminal 
  } = useTerminal();
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

  // Initialize terminal only if not already initialized and no saved state
  useEffect(() => {
    if (!isInitialized && commandHistory.length === 0) {
      setTimeout(() => {
        executeCommand({
          command: 'ssh stef@portfolio.dev',
          output: `${t('terminal.welcome')}\n${t('terminal.help.prompt')}`,
          delay: 1000
        });
        setIsInitialized(true);
      }, 500);
    }
  }, [isInitialized, commandHistory.length, t, setIsInitialized]);

  // Update command outputs when language changes
  useEffect(() => {
    setCommandHistory(prev => 
      prev.map(cmd => {
        if (cmd.command === 'ssh stef@portfolio.dev') {
          return {
            ...cmd,
            output: `${t('terminal.welcome')}\n${t('terminal.help.prompt')}`
          };
        }
        if (cmd.command === 'help') {
          return {
            ...cmd,
            output: `${t('terminal.help')}\n` +
                    `  start    - ${t('terminal.start')}\n` +
                    `  projects - ${t('terminal.projects')}\n` +
                    `  stack    - ${t('terminal.stack')}\n` +
                    `  about    - ${t('terminal.about')}\n` +
                    `  recruiter-mode - ${t('terminal.recruiter-mode')}\n` +
                    `  clear    - ${t('terminal.clear')}\n`
          };
        }
        if (cmd.command === 'about') {
          return {
            ...cmd,
            output: `${t('terminal.about.stef')}\n`
          };
        }
        if (cmd.command === 'stack') {
          return {
            ...cmd,
            output: `${t('terminal.redirecting.stack')}\n`
          };
        }
        if (cmd.command === 'start') {
          return {
            ...cmd,
            output: `${t('terminal.starting.adventure')}\n${t('terminal.redirecting.level')}\n`
          };
        }
        if (cmd.command === 'projects') {
          return {
            ...cmd,
            output: `${t('terminal.redirecting.projects')}\n`
          };
        }
        if (cmd.command === 'recruiter-mode') {
          return {
            ...cmd,
            output: `${t('terminal.fast.track.activated')}\n`
          };
        }

        return cmd;
      })
    );
  }, [language, t, setCommandHistory]);

  const executeCommand = async (commandData: TerminalCommand) => {
    setIsTyping(true);
    
    // Type the command
    for (let i = 0; i < commandData.command.length; i++) {
      setCurrentLine(commandData.command.slice(0, i + 1));
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    setCurrentLine('');
    
    // Add command to history
    const newCommand = { command: commandData.command, output: '' };
    addCommand(newCommand);
    
    // Wait before showing output
    await new Promise(resolve => setTimeout(resolve, commandData.delay || 500));
    
    // Type the output
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
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentLine.trim()) {
      const command = currentLine.trim();
      setCurrentLine('');
      const commandParts = command.split(' ');
      const baseCommand = commandParts[0].toLowerCase();
      const args = commandParts.slice(1);
      
      switch (baseCommand) {
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

        case 'about':
          if (args.includes('--deep')) {
            executeCommand({
              command,
              output: `${t('terminal.about.redirecting')}\n`,
              delay: 300
            });
            setTimeout(() => router.push('/about'), 1000);
          } else {
            executeCommand({
              command,
              output: `${t('terminal.about.stef')}\n`,
              delay: 500
            });
          }
          break;
        case 'projects':
          executeCommand({
            command,
            output: `${t('terminal.redirecting.projects')}\n`,
            delay: 500
          });
          setTimeout(() => router.push('/projects'), 1000);
          break;

        case 'clear':
          setCommandHistory([
            {
              command: 'ssh stef@portfolio.dev',
              output: `${t('terminal.welcome')}\n${t('terminal.help.prompt')}`,
              delay: 0
            }
          ]);
          break;

        case 'lang':
          if (args.length > 0) {
            const lang = args[0];
            const langMessages = {
              es: `${t('terminal.language.changed')} Español 🇪🇸\n`,
              en: `${t('terminal.language.changed')} English 🇺🇸\n`,
              fr: `${t('terminal.language.changed')} Français 🇫🇷\n`
            };
            if (lang in langMessages) {
              setLanguage(lang as 'es' | 'en' | 'fr');
              executeCommand({
                command,
                output: langMessages[lang as keyof typeof langMessages],
                delay: 300
              });
            } else {
              executeCommand({
                command,
                output: 'Language not supported. Use: lang es, lang en, or lang fr\n',
                delay: 300
              });
            }
          } else {
            executeCommand({
              command,
              output: `${t('terminal.lang')}:\n` +
                      `  lang es  - Español\n` +
                      `  lang en  - English\n` +
                      `  lang fr  - Français\n`,
              delay: 300
            });
          }
          break;
        case 'stack':
          executeCommand({
            command,
            output: `${t('terminal.redirecting.stack')}\n`,
            delay: 300
          });
          setTimeout(() => router.push('/stack'), 1000);
          break;
        case 'recruiter-mode':
          executeCommand({
            command,
            output: `${t('terminal.fast.track.activated')}\n`,
            delay: 300
          });
          setTimeout(() => router.push('/recruiter'), 1500);
          break;
        case 'help':
          if (args.includes('--verbose')) {
            executeCommand({
              command,
              output:
                `${t('terminal.help.verbose.title')}\n` +
                `${'='.repeat(50)}\n\n` +
                `${t('terminal.help.verbose.intro')}\n\n` +
                `${t('terminal.help.verbose.commands.title')}\n` +
                `${'-'.repeat(30)}\n` +
                `  start         - ${t('terminal.help.verbose.start.desc')}\n` +
                `  projects      - ${t('terminal.help.verbose.projects.desc')}\n` +
                `  about         - ${t('terminal.help.verbose.about.desc')}\n` +
                `  recruiter-mode - ${t('terminal.help.verbose.recruiter.desc')}\n` +
                `  clear         - ${t('terminal.help.verbose.clear.desc')}\n\n` +
                `${t('terminal.help.verbose.tips.title')}\n` +
                `${'-'.repeat(20)}\n` +
                `  ${t('terminal.help.verbose.tips.1')}\n` +
                `  ${t('terminal.help.verbose.tips.2')}\n` +
                `  ${t('terminal.help.verbose.tips.3')}\n` +
                `  ${t('terminal.help.verbose.tips.4')}\n\n` +
                `${t('terminal.help.verbose.footer')}\n`,
              delay: 100
            });
          } else {
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
          }
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
  }, [commandHistory, isUserAtBottom]);

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
          <LanguageSwitcher hideLabel={true} />
        </div>
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
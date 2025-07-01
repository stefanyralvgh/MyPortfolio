import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface TerminalCommand {
  command: string;
  output: string;
  delay?: number;
}

const InteractiveTerminal: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [currentLine, setCurrentLine] = useState('');
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  // const [currentStep, setCurrentStep] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(true);
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
            `  help --verbose - ${t('terminal.help.verbose')}\n` +
                    `  start    - ${t('terminal.start')}\n` +
                    `  recruiter-mode - ${t('terminal.recruiter-mode')}\n` +
                    `  skip - ${t('terminal.skip')}\n` +
                    `  about    - ${t('terminal.about')}\n` +
                    `  lang     - ${t('terminal.lang')}\n` +
                    `  clear    - ${t('terminal.clear')}\n`
          };
        }
        if (cmd.command === 'about') {
          return {
            ...cmd,
            output: `${t('terminal.about.stef')}\n`
          };
        }
        return cmd;
      })
    );
  }, [language, t]);

  // Ejecutar automáticamente el mensaje de bienvenida al montar
  useEffect(() => {
    setTimeout(() => {
      executeCommand({
        command: 'ssh stef@portfolio.dev',
        output: `${t('terminal.welcome')}\n${t('terminal.help.prompt')}`,
        delay: 1000
      });
    }, 500);
  }, []);

  const executeCommand = async (commandData: TerminalCommand) => {
    setIsTyping(true);
    
  
    for (let i = 0; i < commandData.command.length; i++) {
      setCurrentLine(commandData.command.slice(0, i + 1));
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    setCurrentLine('');
    setCommandHistory(prev => [...prev, { command: commandData.command, output: '' }]);
    

    await new Promise(resolve => setTimeout(resolve, commandData.delay || 500));
    

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
            `  help --verbose - ${t('terminal.help.verbose')}\n` +
                    `  start    - ${t('terminal.start')}\n` +
                    `  recruiter-mode - ${t('terminal.recruiter-mode')}\n` +
                    `  skip - ${t('terminal.skip')}\n` +
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
              output: `${t('terminal.welcome')}\n${t('terminal.help.prompt')}`,
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
        case 'help --verbose':
          executeCommand({
            command,
            output:
              `Welcome to the interactive terminal! \n` +
              `You're about to explore my portfolio in a playful, command-line style.\n` +
              `Type commands as if you're in a real terminal.\n` +
              `You'll uncover my story, projects, skills, and some quirky facts.\n` +
              `Some commands are functional, others are just for fun.\n` +
              `Switch language anytime with 'lang es', 'lang en', or 'lang fr'.\n` +
              `If you're a recruiter in a hurry, try 'recruiter-mode' for a fast track.\n` +
              `\n` +
              `Pro tip: Some commands reveal hidden surprises 😉\n`,
            delay: 300
          });
          break;
        case 'recruiter-mode':
        case 'skip':
          executeCommand({
            command,
            output: `🧠 Stefany Ramos – Backend Developer (Ruby on Rails, PostgreSQL, Redis, APIs)\\n` +
                    `🌎 Bilingual (English 🇬🇧 / Spanish 🇪🇸) – Remote-ready\\n` +
                    `🩺 Ex-dentist turned dev – Problem solver by nature\\n` +
                    `📍 Current role: Software Engineer at [Company]\\n` +
                    `📄 <a href='[CV_LINK]' target='_blank'>CV</a> | 💼 <a href='[LINKEDIN_LINK]' target='_blank'>LinkedIn</a> | 🐙 <a href='[GITHUB_LINK]' target='_blank'>GitHub</a>\\n`,
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
        <div style={{ marginLeft: 'auto' }}>
          <LanguageSwitcher />
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
            <span className="command">{currentLine}</span>
            <span className={`cursor${isInputFocused ? '' : ' cursor-blur'}`}>{showCursor ? '|' : ' '}</span>
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
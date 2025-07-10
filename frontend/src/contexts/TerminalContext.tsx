import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { TerminalCommand, TerminalContextType } from '../interfaces/terminalInterfaces';

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

const STORAGE_KEY = 'terminal_state';
const TIMESTAMP_KEY = 'terminal_timestamp';

export const TerminalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentTime = Date.now();
      const savedTimestamp = localStorage.getItem(TIMESTAMP_KEY);
      const timeDiff = savedTimestamp ? currentTime - parseInt(savedTimestamp) : Infinity;
      
     
      if (!savedTimestamp || timeDiff > 5000) {

        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(TIMESTAMP_KEY);
        setCommandHistory([]);
        setIsInitialized(false);
      } else {
      
        loadFromLocalStorage();
      }
      

      localStorage.setItem(TIMESTAMP_KEY, currentTime.toString());
    }
  }, []);


  useEffect(() => {
    if (isInitialized) {
      saveToLocalStorage();
    }
  }, [commandHistory, isInitialized]);

  const saveToLocalStorage = () => {
    try {
      const stateToSave = {
        commandHistory,
        isInitialized
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving terminal state to localStorage:', error);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setCommandHistory(parsedState.commandHistory || []);
        setIsInitialized(parsedState.isInitialized || false);
      }
    } catch (error) {
      console.error('Error loading terminal state from localStorage:', error);
  
      setCommandHistory([]);
      setIsInitialized(false);
    }
  };

  const addCommand = (command: TerminalCommand) => {
    setCommandHistory(prev => {
  
      if (prev.length > 0 && prev[prev.length - 1].command === command.command) {
        return [...prev.slice(0, -1), command];
      }
      return [...prev, command];
    });
  };

  const updateCommandOutput = (commandIndex: number, newOutput: string) => {
    setCommandHistory(prev => {
      const newHistory = [...prev];
      if (newHistory[commandIndex]) {
        newHistory[commandIndex] = {
          ...newHistory[commandIndex],
          output: newOutput
        };
      }
      return newHistory;
    });
  };

  const clearHistory = () => {
    setCommandHistory([{
      command: 'ssh stef@portfolio.dev',
      output: 'Welcome to Stef Portfolio Terminal!\nType "help" for available commands.',
      delay: 0
    }]);
    setIsInitialized(true);
  };

  const initializeTerminal = () => {
    if (!isInitialized) {
      setCommandHistory([{
        command: 'ssh stef@portfolio.dev',
        output: 'Welcome to Stef Portfolio Terminal!\nType "help" for available commands.',
        delay: 0
      }]);
      setIsInitialized(true);
    }
  };

  return (
    <TerminalContext.Provider value={{
      commandHistory,
      setCommandHistory,
      addCommand,
      updateCommandOutput,
      clearHistory,
      isInitialized,
      setIsInitialized,
      initializeTerminal,
      saveToLocalStorage,
      loadFromLocalStorage
    }}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = (): TerminalContextType => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}; 
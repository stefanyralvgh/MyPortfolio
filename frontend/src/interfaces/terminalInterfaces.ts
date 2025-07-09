export interface TerminalCommand {
  command: string;
  output: string;
  delay?: number;
}

export interface TerminalContextType {
  commandHistory: TerminalCommand[];
  setCommandHistory: (
    history:
      | TerminalCommand[]
      | ((prev: TerminalCommand[]) => TerminalCommand[])
  ) => void;
  addCommand: (command: TerminalCommand) => void;
  updateCommandOutput: (commandIndex: number, newOutput: string) => void;
  clearHistory: () => void;
  isInitialized: boolean;
  setIsInitialized: (initialized: boolean) => void;
  initializeTerminal: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

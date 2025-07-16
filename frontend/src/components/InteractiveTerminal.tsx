import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useLanguage } from "../contexts/LanguageContext";
import { useTerminal } from "../contexts/TerminalContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { TerminalCommand } from "../interfaces/terminalInterfaces";
import { pingApi, wakeUpApi } from "../utils/api";
import Head from "next/head";

const InteractiveTerminal: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const {
    commandHistory,
    setCommandHistory,
    addCommand,

    isInitialized,
    setIsInitialized,
  } = useTerminal();
  const [currentLine, setCurrentLine] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
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
    if (!isInitialized && commandHistory.length === 0) {
      setTimeout(() => {
        executeCommand({
          command: "ssh stefanyramosalvis@gmail.com",
          output: `${t("terminal.welcome")}\n${t("terminal.help.prompt")}`,
          delay: 1000,
        });
        setIsInitialized(true);
      }, 500);
    }
  }, [isInitialized, commandHistory.length, t, setIsInitialized]);

  useEffect(() => {
    // Wake up backend API on mount with enhanced retry logic
    const wakeUpBackend = async () => {
      const isAlive = await wakeUpApi();
      if (isAlive) {
        console.log("Backend API is ready");
      } else {
        console.log(
          "Backend API might be sleeping, will retry on first interaction"
        );
      }
    };

    wakeUpBackend();
  }, []);

  useEffect(() => {
    setCommandHistory((prev) =>
      prev.map((cmd) => {
        if (cmd.command === "ssh stefanyramosalvis@gmail.com") {
          return {
            ...cmd,
            output: `${t("terminal.welcome")}\n${t("terminal.help.prompt")}`,
          };
        }
        if (
          cmd.command === "ssh stefanyramosalvis@gmail.com" &&
          cmd.output.includes("Already connected")
        ) {
          return {
            ...cmd,
            output: t("terminal.already.connected"),
          };
        }
        if (cmd.command === "help") {
          return {
            ...cmd,
            output:
              `${t("terminal.help")}
` +
              `start    - ${t("terminal.start")}
` +
              `projects - ${t("terminal.projects")}
` +
              `stack    - ${t("terminal.stack")}
` +
              `about    - ${t("terminal.about")}
` +
              `recruiter - ${t("terminal.recruiter")}
` +
              `clear    - ${t("terminal.clear")}
`,
          };
        }
        if (cmd.command === "about") {
          return {
            ...cmd,
            output: `${t("terminal.about.stef")}\n`,
          };
        }
        if (cmd.command === "about --deep") {
          return {
            ...cmd,
            output: `${t("terminal.about.redirecting")}\n`,
          };
        }
        if (cmd.command === "stack") {
          return {
            ...cmd,
            output: `${t("terminal.redirecting.stack")}\n`,
          };
        }
        if (cmd.command === "start") {
          return {
            ...cmd,
            output: `${t("terminal.starting.adventure")}\n${t(
              "terminal.redirecting.level"
            )}\n`,
          };
        }
        if (cmd.command === "projects") {
          return {
            ...cmd,
            output: `${t("terminal.redirecting.projects")}\n`,
          };
        }
        if (cmd.command === "recruiter") {
          return {
            ...cmd,
            output: `${t("terminal.fast.track.activated")}\n`,
          };
        }
        if (cmd.command === "skip") {
          return {
            ...cmd,
            output: t("terminal.skip.deprecated"),
          };
        }

        return cmd;
      })
    );
  }, [language, t, setCommandHistory]);

  const executeCommand = async (commandData: TerminalCommand) => {
    setIsTyping(true);

    for (let i = 0; i < commandData.command.length; i++) {
      setCurrentLine(commandData.command.slice(0, i + 1));
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    setCurrentLine("");

    const newCommand = { command: commandData.command, output: "" };
    addCommand(newCommand);

    await new Promise((resolve) =>
      setTimeout(resolve, commandData.delay || 500)
    );

    let output = "";
    for (let i = 0; i < commandData.output.length; i++) {
      output += commandData.output[i];
      setCommandHistory((prev) =>
        prev.map((cmd, idx) =>
          idx === prev.length - 1 ? { ...cmd, output } : cmd
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentLine.trim()) {
      const command = currentLine.trim();
      setCurrentLine("");
      const commandParts = command.split(" ");
      const baseCommand = commandParts[0].toLowerCase();
      const args = commandParts.slice(1);

      switch (baseCommand) {
        case "ssh stefanyramosalvis@gmail.com":
          executeCommand({
            command,
            output: t("terminal.already.connected"),
            delay: 300,
          });
          break;
        case "start":
          executeCommand({
            command,
            output: `${t("terminal.starting.adventure")}\n${t(
              "terminal.redirecting.level"
            )}\n`,
            delay: 1000,
          });
          setTimeout(() => router.push("/adventure"), 2000);
          break;

        case "about":
          if (args.includes("--deep")) {
            executeCommand({
              command,
              output: `${t("terminal.about.redirecting")}\n`,
              delay: 300,
            });
            setTimeout(() => router.push("/about"), 1000);
          } else {
            executeCommand({
              command,
              output: `${t("terminal.about.stef")}\n`,
              delay: 500,
            });
          }
          break;
        case "projects":
          executeCommand({
            command,
            output: `${t("terminal.redirecting.projects")}\n`,
            delay: 500,
          });
          setTimeout(() => router.push("/projects"), 1000);
          break;

        case "clear":
          setCommandHistory([
            {
              command: "ssh stefanyramosalvis@gmail.com",
              output: `${t("terminal.welcome")}\n${t("terminal.help.prompt")}`,
              delay: 0,
            },
          ]);
          break;

        case "lang":
          if (args.length > 0) {
            const lang = args[0];
            const langMessages = {
              es: `${t("terminal.language.changed")} Español 🇪🇸\n`,
              en: `${t("terminal.language.changed")} English 🇺🇸\n`,
              fr: `${t("terminal.language.changed")} Français 🇫🇷\n`,
            };
            if (lang in langMessages) {
              setLanguage(lang as "es" | "en" | "fr");
              executeCommand({
                command,
                output: langMessages[lang as keyof typeof langMessages],
                delay: 300,
              });
            } else {
              executeCommand({
                command,
                output: t("terminal.language.not.supported"),
                delay: 300,
              });
            }
          } else {
            executeCommand({
              command,
              output:
                `${t("terminal.lang")}:\n` +
                `  lang es  - Español\n` +
                `  lang en  - English\n` +
                `  lang fr  - Français\n`,
              delay: 300,
            });
          }
          break;
        case "stack":
          executeCommand({
            command,
            output: `${t("terminal.redirecting.stack")}\n`,
            delay: 300,
          });
          setTimeout(() => router.push("/stack"), 1000);
          break;
        case "recruiter":
          executeCommand({
            command,
            output: `${t("terminal.fast.track.activated")}\n`,
            delay: 300,
          });
          setTimeout(() => router.push("/recruiter"), 1500);
          break;
        case "help":
          executeCommand({
            command,
            output:
              `${t("terminal.help")}\n` +
              `  start    - ${t("terminal.start")}\n` +
              `  projects - ${t("terminal.projects")}\n` +
              `  stack    - ${t("terminal.stack")}\n` +
              `  about    - ${t("terminal.about")}\n` +
              `  recruiter - ${t("terminal.recruiter")}\n` +
              `  clear    - ${t("terminal.clear")}\n`,
            delay: 300,
          });
          break;
        case "skip":
          executeCommand({
            command,
            output: t("terminal.skip.deprecated"),
            delay: 300,
          });
          break;
        default:
          executeCommand({
            command,
            output: `${t("terminal.command.not.found")} ${command}\n${t(
              "terminal.type.help"
            )}\n`,
            delay: 300,
          });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!terminalRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = terminalRef.current;

      setIsUserAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    };
    const ref = terminalRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (ref) {
        ref.removeEventListener("scroll", handleScroll);
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
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          Stefany Ramos | Backend Developer (Node.js, Express, PostgreSQL)
        </title>
        <meta
          name="description"
          content="Stefany Ramos Alvis - Backend Developer. Expert in Node.js, Express, PostgreSQL, scalable APIs, and cloud. Portfolio, projects, and contact."
        />
        <meta
          name="keywords"
          content="Stefany Ramos Alvis, Backend Developer, Node.js, Express, PostgreSQL, APIs, Cloud, Remote, Portfolio, Stefany R"
        />
        <meta
          property="og:title"
          content="Stefany Ramos | Backend Developer (Node.js, Express, PostgreSQL)"
        />
        <meta
          property="og:description"
          content="Portfolio of Stefany Ramos Alvis, backend developer specialized in Node.js, Express, PostgreSQL, and scalable architecture."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stefralv.com" />
        <meta
          property="og:image"
          content="https://stefralv.com/your-photo-or-banner.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Stefany Ramos | Backend Developer (Node.js, Express, PostgreSQL)"
        />
        <meta
          name="twitter:description"
          content="Portfolio of Stefany Ramos Alvis, backend developer."
        />
        <meta
          name="twitter:image"
          content="https://stefralv.com/your-photo-or-banner.png"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://stefralv.com" />
      </Head>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button close"></span>
          <span className="terminal-button minimize"></span>
          <span className="terminal-button maximize"></span>
        </div>
        <div className="terminal-title">backend@developer</div>
        <div style={{ marginLeft: "auto" }}>
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
            {cmd.output &&
              (t("terminal.help") &&
              cmd.output.startsWith(t("terminal.help")) ? (
                <div className="command-output">
                  {cmd.output.split("\n").map((line, idx) => {
                    if (line.trim() === "" || line === t("terminal.help"))
                      return line === t("terminal.help") ? (
                        <div key={idx}>{line}</div>
                      ) : null;
                    const match = line.match(/^(.*?)\s*-\s*(.*)$/);
                    if (match) {
                      return (
                        <div key={idx}>
                          <span className="help-cmd">{match[1]}</span>
                          <span> - {match[2]}</span>
                        </div>
                      );
                    }
                    return <div key={idx}>{line}</div>;
                  })}
                </div>
              ) : (
                <div className="command-output">
                  {cmd.output.split("\n").map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              ))}
          </div>
        ))}

        {!isTyping && (
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
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "inherit",
                font: "inherit",
                width: "90%",
              }}
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

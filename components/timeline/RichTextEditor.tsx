"use client";

import { useEffect, useRef, useState } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
  appearance?: "adaptive" | "light";
}

interface EditorControl {
  label: string;
  command: string;
  value?: string;
}

const BLOCK_CONTROLS: EditorControl[] = [
  { label: "H1", command: "formatBlock", value: "h1" },
  { label: "H2", command: "formatBlock", value: "h2" },
  { label: "H3", command: "formatBlock", value: "h3" },
  { label: "H4", command: "formatBlock", value: "h4" },
  { label: "H5", command: "formatBlock", value: "h5" },
  { label: "H6", command: "formatBlock", value: "h6" },
  { label: "Blockquote", command: "formatBlock", value: "blockquote" },
  { label: "UL", command: "insertUnorderedList" },
  { label: "OL", command: "insertOrderedList" },
  { label: "Code Block", command: "formatBlock", value: "pre" },
];

const INLINE_CONTROLS: EditorControl[] = [
  { label: "Bold", command: "bold" },
  { label: "Italic", command: "italic" },
  { label: "Underline", command: "underline" },
  { label: "Monospace", command: "fontName", value: "monospace" },
];

export default function RichTextEditor({
  value,
  onChange,
  ariaLabel = "Rich text content",
  appearance = "adaptive",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeCommands, setActiveCommands] = useState<string[]>([]);
  const lightAppearance = appearance === "light";

  // Synchronize externally loaded HTML without turning contentEditable into a controlled field.
  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.innerHTML !== value) editor.innerHTML = value;
  }, [value]);

  // Reflect the browser selection state in the toolbar's active buttons.
  useEffect(() => {
    const updateActiveCommands = () => {
      const editor = editorRef.current;
      const selection = window.getSelection();
      if (!editor || !selection?.anchorNode || !editor.contains(selection.anchorNode)) {
        return;
      }

      const commands = [...BLOCK_CONTROLS, ...INLINE_CONTROLS]
        .filter(({ command, value: commandValue }) => {
          if (command === "formatBlock") {
            return document.queryCommandValue(command).toLowerCase() === commandValue;
          }
          if (command === "fontName") {
            return document.queryCommandValue(command).toLowerCase().includes("mono");
          }
          return document.queryCommandState(command);
        })
        .map(({ label }) => label);

      setActiveCommands(commands);
    };

    document.addEventListener("selectionchange", updateActiveCommands);
    return () =>
      document.removeEventListener("selectionchange", updateActiveCommands);
  }, []);

  // Preserve the selection while applying a native rich-text command.
  const runCommand = (command: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const renderControl = ({
    label,
    command,
    value: commandValue,
  }: {
    label: string;
    command: string;
    value?: string;
  }) => (
    <button
      type="button"
      className={`rounded-md px-2 py-1 text-sm transition-colors ${
        activeCommands.includes(label)
          ? lightAppearance
            ? "bg-[#111114] text-white"
            : "bg-[var(--text)] text-[var(--bg)]"
          : lightAppearance
            ? "text-[#6e6e73] hover:bg-[#fafafa] hover:text-[#111114]"
            : "text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--text)]"
      }`}
      aria-label={`Apply ${label}`}
      aria-pressed={activeCommands.includes(label)}
      onMouseDown={(event) => {
        event.preventDefault();
        runCommand(command, commandValue);
      }}
      key={label}
    >
      {label}
    </button>
  );

  return (
    <div className={`overflow-hidden rounded-[10px] border font-sans ${lightAppearance ? "border-[#e8e8ea] bg-white text-[#111114]" : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"}`}>
      <div className={`flex flex-wrap gap-1 border-b p-3 ${lightAppearance ? "border-[#e8e8ea]" : "border-[var(--border)]"}`}>
        {BLOCK_CONTROLS.map(renderControl)}
      </div>
      <div className={`flex flex-wrap gap-1 border-b px-3 py-2 ${lightAppearance ? "border-[#e8e8ea]" : "border-[var(--border)]"}`}>
        {INLINE_CONTROLS.map(renderControl)}
      </div>
      <div className="relative">
        {!value && (
          <span className={`pointer-events-none absolute left-4 top-4 text-base ${lightAppearance ? "text-[#8a8a8f]" : "text-[var(--muted)]"}`}>
            Tell a story...
          </span>
        )}
        <div
          ref={editorRef}
          className={`min-h-64 cursor-text px-4 py-4 text-base leading-7 outline-none [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:px-4 [&_blockquote]:italic [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:font-semibold [&_h4]:text-lg [&_h4]:font-semibold [&_h5]:text-base [&_h5]:font-semibold [&_h6]:text-sm [&_h6]:font-semibold [&_ol]:list-decimal [&_ol]:pl-6 [&_pre]:my-4 [&_pre]:rounded-[8px] [&_pre]:p-4 [&_pre]:font-mono [&_ul]:list-disc [&_ul]:pl-6 ${lightAppearance ? "[&_blockquote]:border-[#111114] [&_pre]:bg-[#111114] [&_pre]:text-white" : "[&_blockquote]:border-[var(--text)] [&_pre]:bg-[var(--text)] [&_pre]:text-[var(--bg)]"}`}
          contentEditable
          role="textbox"
          aria-multiline="true"
          aria-label={ariaLabel}
          suppressContentEditableWarning
          onInput={(event) => onChange(event.currentTarget.innerHTML)}
        />
      </div>
    </div>
  );
}

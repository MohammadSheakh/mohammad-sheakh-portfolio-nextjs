"use client";

import { useEffect, useRef, useState } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
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
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeCommands, setActiveCommands] = useState<string[]>([]);

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
          ? "bg-blue-50 text-blue-600"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
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
    <div className="overflow-hidden rounded-xl border border-slate-300 bg-white font-serif text-slate-900">
      <div className="flex flex-wrap gap-1 border-b border-slate-200 p-3">
        {BLOCK_CONTROLS.map(renderControl)}
      </div>
      <div className="flex flex-wrap gap-1 border-b border-slate-200 px-3 py-2">
        {INLINE_CONTROLS.map(renderControl)}
      </div>
      <div className="relative">
        {!value && (
          <span className="pointer-events-none absolute left-4 top-4 text-base text-slate-400">
            Tell a story...
          </span>
        )}
        <div
          ref={editorRef}
          className="min-h-64 cursor-text px-4 py-4 text-base leading-7 outline-none [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-slate-200 [&_blockquote]:px-4 [&_blockquote]:italic [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_h4]:text-lg [&_h5]:text-base [&_h6]:text-sm [&_ol]:list-decimal [&_ol]:pl-6 [&_pre]:my-4 [&_pre]:rounded-lg [&_pre]:bg-slate-100 [&_pre]:p-4 [&_pre]:font-mono [&_ul]:list-disc [&_ul]:pl-6"
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

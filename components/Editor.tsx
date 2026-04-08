"use client";

import { EditorContent } from "@tiptap/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function Editor({ editor }: { editor: any }) {
  const [toolbarOpen, setToolbarOpen] = useState(false);

  if (!editor) return null;

  const buttons = [
    {
      label: "B",
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      label: "I",
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      label: "U",
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
    },
    {
      label: "H",
      action: () => editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive("highlight"),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Toolbar Toggle */}
      <div
        onClick={() => setToolbarOpen(!toolbarOpen)}
        className="flex justify-between items-center px-3 py-2 bg-gray-100 cursor-pointer"
      >
        <span className="text-sm font-medium text-gray-700">
          Formatting Tools
        </span>
        {toolbarOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      {/* Toolbar */}
      {toolbarOpen && (
        <div className="flex gap-2 flex-wrap p-2 border-b bg-gray-50">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              className={`px-2 py-1 text-sm rounded transition ${
                btn.active
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {/* Editor */}
      <div className="p-3">
        <EditorContent
          editor={editor}
          className="min-h-30 text-black outline-none [&_.ProseMirror]:outline-none"
        />
      </div>
    </div>
  );
}

export default Editor;

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import Editor from "./Editor";
import { Edit, Minus, Plus, Trash, X } from "lucide-react";

type Note = {
  id: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  content: string;
};

function Notes({
  selected,
  setShowNotes,
  selectedDateRange,
}: {
  selected: Date | undefined;
  setShowNotes: (show: boolean) => void;
  selectedDateRange: { startDate: Date; endDate: Date } | null;
}) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color,
      Highlight,
      TextStyle,
      OrderedList,
      ListItem,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: "",
    immediatelyRender: false,
  });

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const handleSave = () => {
    if (!selected || !editor) return;
    let i = 0;
    const generateId = () => {
      return `note-${Date.now()}-${i++}`;
    };

    const content = editor.getHTML();

    if (editor.isEmpty) return;

    const newNote: Note = {
      id: generateId(),
      startDate: selectedDateRange?.startDate?.toDateString() ?? "",
      endDate: selectedDateRange?.endDate?.toDateString() ?? "",
      date: selected?.toDateString(),
      content,
    };

    const existingNotes = JSON.parse(localStorage.getItem("notes") || "[]");

    const updatedNotes = [...existingNotes, newNote];

    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    setNotes(updatedNotes);

    editor.commands.clearContent();
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");

    const filteredNotes = savedNotes.filter((note: Note) => note.id !== id);
    console.log("Filtered Notes:", filteredNotes);

    localStorage.setItem("notes", JSON.stringify(filteredNotes));
    setNotes(filteredNotes);
  };

  if (!selected && !selectedDateRange) return null;

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-h-112 overflow-scroll no-scrollbar">
      <div className="border-[0.5px] border-gray-100 rounded-md w-full relative">
        <div className="bg-linear-to-r from-blue-100 to-blue-50 px-3 py-2 cursor-pointer flex justify-between items-center">
          <span className="font-semibold text-gray-800">Notes</span>
          <div className="flex items-center gap-2">
            <span
              className="text-lg transition-all duration-150"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <Minus size={14} /> : <Plus size={14} />}
            </span>
            <span
              onClick={() => {
                setShowNotes(false);
              }}
              className="flex items-center transition-all duration-150"
            >
              <X color="red" size={14} />
            </span>
          </div>
        </div>

        <div className="p-3 space-y-2 max-h-80 overflow-y-auto no-scrollbar">
          {notes.map((note, i) => (
            <div
              key={i}
              className="p-2 rounded-lg bg-gray-50 border hover:bg-gray-100 transition"
            >
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1">
                  {!note.startDate && !note.endDate ? (
                    <p className="text-xs text-gray-500">{note.date}</p>
                  ) : (
                    <>
                      <p className="text-xs text-gray-500">{note.startDate}</p>{" "}
                      - <p className="text-xs text-gray-500">{note.endDate}</p>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <span onClick={() => handleDelete(note.id)}>
                    <Trash color="red" size={16} />
                  </span>
                </div>
              </div>
              <div
                className="text-sm text-gray-800"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
            </div>
          ))}
        </div>

        {isOpen && (
          <div className="p-2 border-t space-y-2 overflow-scroll no-scrollbar">
            {" "}
            <Editor editor={editor} />{" "}
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {" "}
              Save Note{" "}
            </button>{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;

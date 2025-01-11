import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

const BoldEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    // Handle editor state change
    const handleChange = (state) => {
        setEditorState(state);
    };

    // Handle bold styling
    const toggleBold = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    };

    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
            }}
        >
            {/* Toolbar */}
            <div style={{ marginBottom: "10px" }}>
                <button
                    onClick={toggleBold}
                    style={{
                        padding: "5px 10px",
                        marginRight: "5px",
                        cursor: "pointer",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                    }}
                >
                    Bold
                </button>
            </div>

            {/* Editor */}
            <div
                style={{
                    border: "1px solid #ccc",
                    minHeight: "150px",
                    padding: "10px",
                }}
                onClick={() =>
                    document.querySelector("[contenteditable=true]").focus()
                }
            >
                <Editor editorState={editorState} onChange={handleChange} />
            </div>
        </div>
    );
};

export default BoldEditor;

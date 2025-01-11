import React, { useState } from "react";
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

const OrderedListEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    // Handle editor state change
    const handleChange = (state) => {
        setEditorState(state);
    };

    // Toggle ordered list
    const toggleOrderedList = () => {
        setEditorState(
            RichUtils.toggleBlockType(editorState, "ordered-list-item")
        );
    };

    // Toggle unordered list
    const toggleUnorderedList = () => {
        setEditorState(
            RichUtils.toggleBlockType(editorState, "unordered-list-item")
        );
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
                    onClick={toggleOrderedList}
                    style={{
                        padding: "5px 10px",
                        marginRight: "5px",
                        cursor: "pointer",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                    }}
                >
                    Ordered List
                </button>
                <button
                    onClick={toggleUnorderedList}
                    style={{
                        padding: "5px 10px",
                        cursor: "pointer",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                    }}
                >
                    Unordered List
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

export default OrderedListEditor;

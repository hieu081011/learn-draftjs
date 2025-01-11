import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

const ColorEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    // Function to handle editor state change
    const handleChange = (state) => {
        setEditorState(state);
    };

    // Function to toggle text color
    const toggleColor = (color) => {
        const newState = RichUtils.toggleInlineStyle(editorState, color);
        setEditorState(newState);
    };

    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
            }}
        >
            <div style={{ marginBottom: "10px" }}>
                <button
                    onClick={() => toggleColor("RED")}
                    style={{
                        padding: "5px 10px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        marginRight: "5px",
                    }}
                >
                    Red
                </button>
                <button
                    onClick={() => toggleColor("BLUE")}
                    style={{
                        padding: "5px 10px",
                        backgroundColor: "blue",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        marginRight: "5px",
                    }}
                >
                    Blue
                </button>
                <button
                    onClick={() => toggleColor("GREEN")}
                    style={{
                        padding: "5px 10px",
                        backgroundColor: "green",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                    }}
                >
                    Green
                </button>
            </div>

            {/* Editor */}
            <div
                style={{
                    border: "1px solid #ccc",
                    minHeight: "150px",
                    padding: "10px",
                }}
            >
                <Editor
                    editorState={editorState}
                    onChange={handleChange}
                    customStyleMap={customStyleMap} // Apply custom inline styles
                />
            </div>
        </div>
    );
};

// Custom inline styles for text color
const customStyleMap = {
    RED: {
        color: "red",
    },
    BLUE: {
        color: "blue",
    },
    GREEN: {
        color: "green",
    },
};

export default ColorEditor;

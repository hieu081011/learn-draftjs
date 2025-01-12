import React, { useState } from "react";
import { Editor, EditorState, CompositeDecorator } from "draft-js";
import "draft-js/dist/Draft.css";

// Custom component to render the hashtag in blue color
const HashtagSpan = (props) => {
    return (
        <span style={{ color: "blue", fontWeight: "bold" }}>
            {props.children}
        </span>
    );
};

// Decorator function to detect hashtags
const findHashtags = (contentBlock, callback, contentState) => {
    const text = contentBlock.getText();
    const regex = /(^|\s)(#\w+)/g;
    let matchArr;

    while ((matchArr = regex.exec(text)) !== null) {
        const start = matchArr.index + matchArr[1].length;
        const end = start + matchArr[2].length;
        callback(start, end); // Pass the range of the hashtag text
    }
};

// Create the decorator with the findHashtags function
const decorator = new CompositeDecorator([
    {
        strategy: findHashtags,
        component: HashtagSpan,
    },
]);

const HashtagEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(decorator)
    );

    const handleChange = (state) => {
        setEditorState(state);
    };

    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
            }}
        >
            <div
                style={{
                    border: "1px solid #ccc",
                    minHeight: "150px",
                    padding: "10px",
                }}
            >
                <Editor editorState={editorState} onChange={handleChange} />
            </div>
        </div>
    );
};

export default HashtagEditor;

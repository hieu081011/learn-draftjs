import React from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import BoldEditor from "./components/BoldEditor";
import OrderedListEditor from "./components/OrderList";
import ImageEditor from "./components/ImageEditor";
import HashtagEditor from "./components/HashEditor";
import ColorEditor from "./components/ColorEditor";
import MediaEditorExample from "./components/MediaEditor";
import MediaUploadEditor from "./components/UploadFileEditor";
function App() {
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );

    return (
        <div
            style={{
                border: "2px solid black",
                borderRadius: "12px",
                padding: "10px 20px 10px 20px",
            }}
        >
            <MediaUploadEditor />
        </div>
    );
}

export default App;

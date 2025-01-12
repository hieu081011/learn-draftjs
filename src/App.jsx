import React from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import BoldEditor from "./components/BoldEditor";
import OrderedListEditor from "./components/OrderList";
import ImageEditor from "./components/ImageEditor";
import HashtagEditor from "./components/HashEditor";
import ColorEditor from "./components/ColorEditor";
import MediaUploadEditor from "./components/UploadFileEditor";
import DraftLinkWithPreview from "./components/LinkEditor";
function App() {
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );

    return (
        <div>
            <DraftLinkWithPreview />
        </div>
    );
}

export default App;

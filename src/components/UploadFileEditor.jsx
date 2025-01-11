import React, { useState, useRef } from "react";
import {
    AtomicBlockUtils,
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
} from "draft-js";

const MediaUploadEditor = ({ consoleLog, clearConsole }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [file, setFile] = useState(null);
    const editorRef = useRef(null);
    const fileInputRef = useRef(null);

    const focus = () => editorRef.current.focus();
    const logContentState = () => {
        const contentState = editorState.getCurrentContent();
        consoleLog(JSON.stringify(contentState.toJS(), null, 4));
    };
    const logRawContentState = () => {
        const contentState = editorState.getCurrentContent();
        consoleLog(JSON.stringify(convertToRaw(contentState), null, 4));
    };
    const onChange = (newEditorState) => setEditorState(newEditorState);

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.type.split("/")[0]; // Get type (image, audio, video, etc.)
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileURL = reader.result;
                _insertMedia(fileURL, fileType, selectedFile.type);
            };
            reader.readAsDataURL(selectedFile); // Convert the file to a base64 URL
        }
    };

    const _insertMedia = (fileURL, fileType, mimeType) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            fileType,
            "IMMUTABLE",
            { src: fileURL, mimeType }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });
        setEditorState(
            AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
        );
        setTimeout(() => focus(), 0);
    };

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return true;
        }
        return false;
    };

    return (
        <div style={styles.root}>
            <div style={{ marginBottom: 10 }}>
                Use the button to upload a file (image, audio, video).
            </div>
            <div style={styles.buttons}>
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={onFileChange}
                    style={styles.fileInput}
                />
            </div>
            <div style={styles.editor} onClick={focus}>
                <Editor
                    blockRendererFn={mediaBlockRenderer}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={onChange}
                    placeholder="Enter some text..."
                    ref={editorRef}
                />
            </div>
        </div>
    );
};

const mediaBlockRenderer = (block) => {
    if (block.getType() === "atomic") {
        return { component: Media, editable: false };
    }
    return null;
};

const Audio = ({ src }) => {
    return <audio controls src={src} style={styles.media} />;
};

const Image = ({ src }) => {
    return <img src={src} style={styles.media} alt="Example" />;
};

const Video = ({ src }) => {
    return <video controls src={src} style={styles.media} />;
};

const Media = (props) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src, mimeType } = entity.getData();

    // Render based on mimeType
    let media;
    if (mimeType.startsWith("image")) {
        media = <Image src={src} />;
    } else if (mimeType.startsWith("audio")) {
        media = <Audio src={src} />;
    } else if (mimeType.startsWith("video")) {
        media = <Video src={src} />;
    }

    return media;
};

const styles = {
    root: {
        padding: "20px",
    },
    buttons: {
        marginBottom: 10,
    },
    fileInput: {
        padding: "5px",
    },
    editor: {
        border: "1px solid #ddd",
        cursor: "text",
        padding: "15px",
    },
    media: {
        width: "100%",
    },
};

export default MediaUploadEditor;

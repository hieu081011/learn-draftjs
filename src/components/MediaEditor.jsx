import React, { useState, useRef } from "react";
import {
    AtomicBlockUtils,
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
} from "draft-js";

const MediaEditorExample = ({ consoleLog, clearConsole }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [showURLInput, setShowURLInput] = useState(false);
    const [urlValue, setUrlValue] = useState("");
    const [urlType, setUrlType] = useState("");
    const editorRef = useRef(null);
    const urlRef = useRef(null);

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
    const onURLChange = (e) => setUrlValue(e.target.value);

    const addAudio = () => _promptForMedia("audio");
    const addImage = () => _promptForMedia("image");
    const addVideo = () => _promptForMedia("video");
    const confirmMedia = (e) => _confirmMedia(e);
    const handleKeyCommand = (command) => _handleKeyCommand(command);
    const onURLInputKeyDown = (e) => _onURLInputKeyDown(e);

    const _handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return true;
        }
        return false;
    };

    const _confirmMedia = (e) => {
        e.preventDefault();
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            urlType,
            "IMMUTABLE",
            { src: urlValue }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });
        setEditorState(
            AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
        );
        setShowURLInput(false);
        setUrlValue("");
        setTimeout(() => focus(), 0);
    };

    const _onURLInputKeyDown = (e) => {
        if (e.which === 13) {
            _confirmMedia(e);
        }
    };

    const _promptForMedia = (type) => {
        setShowURLInput(true);
        setUrlValue("");
        setUrlType(type);
        setTimeout(() => urlRef.current.focus(), 0);
    };

    let urlInput;
    if (showURLInput) {
        urlInput = (
            <div style={styles.urlInputContainer}>
                <input
                    onChange={onURLChange}
                    ref={urlRef}
                    style={styles.urlInput}
                    type="text"
                    value={urlValue}
                    onKeyDown={onURLInputKeyDown}
                />
                <button className="btn btn-default" onMouseDown={confirmMedia}>
                    Confirm
                </button>
            </div>
        );
    }

    return (
        <div style={styles.root}>
            <div style={{ marginBottom: 10 }}>
                Use the buttons to add audio, image, or video.
            </div>
            <div style={{ marginBottom: 10 }}>
                Here are some examples that can be entered as a URL:
                <ul></ul>
            </div>
            <div style={styles.buttons}>
                <button
                    onMouseDown={addImage}
                    className="btn btn-default"
                    style={{ marginRight: 10 }}
                >
                    Add Image
                </button>
                <button
                    onMouseDown={addAudio}
                    className="btn btn-default"
                    style={{ marginRight: 10 }}
                >
                    Add Audio
                </button>
                <button
                    onMouseDown={addVideo}
                    className="btn btn-default"
                    style={{ marginRight: 10 }}
                >
                    Add Video
                </button>
            </div>
            {urlInput}
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
    return (
        <img
            src={
                "https://letsenhance.io/static/03620c83508fc72c6d2b218c7e304ba5/11499/UpscalerAfter.jpg"
            }
            style={styles.media}
            alt="Example"
        />
    );
};

const Video = ({ src }) => {
    return (
        <video
            controls
            src={
                "https://videos.pexels.com/video-files/7565438/7565438-hd_1080_1920_25fps.mp4"
            }
            style={styles.media}
        />
    );
};

const Media = (props) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();
    let media;
    if (type === "audio") {
        media = <Audio src={src} />;
    } else if (type === "image") {
        media = <Image src={src} />;
    } else if (type === "video") {
        media = <Video src={src} />;
    }
    return media;
};

const styles = {
    buttons: {
        marginBottom: 10,
    },
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: "1px solid #ddd",
        cursor: "text",
        padding: "15px",
    },
    button: {
        marginTop: 10,
        textAlign: "center",
    },
    media: {
        width: "100%",
    },
};

export default MediaEditorExample;

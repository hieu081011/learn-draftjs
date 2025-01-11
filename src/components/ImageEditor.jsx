import React, { useState } from "react";
import { Editor, EditorState, AtomicBlockUtils } from "draft-js";
import "draft-js/dist/Draft.css";

const ImageEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [imageURL, setImageURL] = useState("");

    // Handle editor state change
    const handleChange = (state) => {
        setEditorState(state);
    };

    // Function to add image to the editor
    const addImage = () => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "IMAGE",
            "IMMUTABLE",
            { src: imageURL }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
            editorState,
            entityKey,
            " "
        );
        setEditorState(newEditorState);
        setImageURL(""); // Clear the input field after inserting the image
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
                <input
                    type="text"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    placeholder="Enter image URL"
                    style={{
                        padding: "5px",
                        marginRight: "5px",
                        width: "200px",
                        borderRadius: "3px",
                        border: "1px solid #ccc",
                    }}
                />
                <button
                    onClick={addImage}
                    style={{
                        padding: "5px 10px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                    }}
                >
                    Insert Image
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
                <Editor
                    editorState={editorState}
                    onChange={handleChange}
                    blockRendererFn={mediaBlockRenderer} // Custom block renderer for media
                />
            </div>
        </div>
    );
};

// Block renderer function for handling images
const mediaBlockRenderer = (block) => {
    if (block.getType() === "atomic") {
        const entityKey = block.getEntityAt(0); // Get the entity key from the block
        if (!entityKey) return null; // If no entity key, return null
        console.log("block", Object.keys(block));
        const entity = block.getEntityKeyAt(0); // Get entity data from the entityKey
        const entityData = entity ? block.getEntityData(entityKey) : null;
        const media = entityData && entityData.src ? entityData.src : null;

        if (media) {
            return {
                component: MediaComponent,
                editable: false,
                props: {
                    src: media,
                },
            };
        }
    }
    return null;
};

// Media component to render images
const MediaComponent = (props) => {
    return (
        <img
            src={props.src}
            alt="inserted"
            style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
        />
    );
};

export default ImageEditor;

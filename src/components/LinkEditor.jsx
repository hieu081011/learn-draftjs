import React, { useState } from "react";
import {
    Editor,
    EditorState,
    CompositeDecorator,
    Modifier,
    ContentState,
} from "draft-js";
import "draft-js/dist/Draft.css";

const LinkSpan = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} style={{ color: "blue", textDecoration: "underline" }}>
            {props.children}
        </a>
    );
};

const decorator = new CompositeDecorator([
    {
        strategy: (contentBlock, callback, contentState) => {
            contentBlock.findEntityRanges((character) => {
                const entityKey = character.getEntity();
                return (
                    entityKey !== null &&
                    contentState.getEntity(entityKey).getType() === "LINK"
                );
            }, callback);
        },
        component: LinkSpan,
    },
]);

const DraftEditorWithEntity = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(decorator)
    );

    const addLinkEntity = () => {
        const contentState = editorState.getCurrentContent();

        const contentStateWithEntity = contentState.createEntity(
            "LINK",
            "MUTABLE",
            { url: "https://example.com" }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        const selectionState = editorState.getSelection();
        const contentWithEntity = Modifier.applyEntity(
            contentStateWithEntity,
            selectionState,
            entityKey
        );

        const newEditorState = EditorState.push(
            editorState,
            contentWithEntity,
            "apply-entity"
        );
        setEditorState(newEditorState);
    };

    return (
        <div>
            <div
                style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    minHeight: "150px",
                }}
            >
                <Editor editorState={editorState} onChange={setEditorState} />
            </div>
            <button onClick={addLinkEntity}>Add Link</button>
        </div>
    );
};

export default DraftEditorWithEntity;

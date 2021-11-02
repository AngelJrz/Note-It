import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./index.css";

export default function EditorContenido(props) {
    const { cuerpo, cambioDeEditorState, cambioDeCuerpo} = props;

    return (
      <>
        <Editor
          editorState={cuerpo}
          toolbarClassName="editor-toolbar"
          wrapperClassName="wrapper"
          editorClassName="editor"
          hashtag={{
            separator: " ",
            trigger: "#",
          }}
          onEditorStateChange={cambioDeEditorState}
          className="editor"
        />
        <textarea
          name="cuerpo"
          className="contenido-textarea"
          disabled
          ref={cambioDeCuerpo}
          value={draftToHtml(convertToRaw(cuerpo.getCurrentContent()))}
        />
      </>
    );
}

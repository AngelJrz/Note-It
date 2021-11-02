import { useState } from "react";
import {
  EditorState,
  ContentState,
  convertFromHTML,
} from "draft-js";

export default function useCuerpoNota(esCreacion = true, cuerpoAEditar = '') {
    let editorState;
    if (esCreacion) {
        editorState = EditorState.createEmpty();
    }
    else {
        editorState = EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(cuerpoAEditar))
        );
    }

    const [cuerpo, setCuerpo] = useState(editorState);

    const cambioDeEditorState = (state) => {
        if (!state) {
            setCuerpo(editorState);
        }
        else {
            setCuerpo(state);
        }
    };

    return { cuerpo, cambioDeEditorState };
}

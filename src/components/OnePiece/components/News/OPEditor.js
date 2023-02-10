import React, {useState} from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const OPEditor = ({content, setContent}) => {


  return (
    <div>
      <Editor
        // editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        // onEditorStateChange={this.onEditorStateChange}
        onChange={(e) => setContent(e)}
      />
      <textarea
        disabled
        value={draftToHtml(content)}
      />
    </div>
  );
  
}

export default OPEditor
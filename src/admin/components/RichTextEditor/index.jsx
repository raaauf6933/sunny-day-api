import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const RichTextEditor = (props) => {
  const { onEditorChange, initialValue, disabled } = props;
  //   const editorRef = useRef(null);
  //   const log = () => {
  //     if (editorRef.current) {
  //       console.log(editorRef.current.getContent());
  //     }
  //   };

  return (
    <>
      {" "}
      <Editor
        apiKey="3vv3gewkg1fbzgbgl1bo7re25283ovdcbcqwnkysn1ouhoxs"
        initialValue={initialValue}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
            "table",
            "preview",
            "link",
            "lists",
          ],
          // toolbar: "numlist bullist",
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help |",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={(content) => onEditorChange(content)}
        disabled={disabled}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
};

export default RichTextEditor;

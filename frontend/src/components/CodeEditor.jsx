import React, { useRef, useState } from "react";
import { Box, HStack, Input, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import DragFile from "./DragFile";
import { VStack } from "@chakra-ui/react";

const CodeEditor = React.forwardRef((props, ref) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const getValue = () => {
    return editorRef.current.getValue();
  };

  React.useImperativeHandle(ref, () => ({ getValue }));

  return (
    <Box>
      <HStack spacing={2}>
        <Box w="60%">
          <HStack mb="4" justifyContent="space-between">
            <HStack w="60%" spacing={0}>
              <Text fontSize="lg" w="50%">Function Name:</Text>
              <Input
                placeholder="entrypoint"
                value={props.entryPoint}
                onChange={(e) => props.setEntryPoint(e.target.value)}
              />
            </HStack>
            <LanguageSelector language={language} onSelect={onSelect} />
          </HStack>
          <Editor
            options={{
              minimap: { enabled: false },
            }}
            height="65vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Box w="40%">
          <VStack spacing={14}>
            <Output editorValue={value} language={language} />
            <DragFile editorRef={editorRef} setValue={setValue} />
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
});

export default CodeEditor;
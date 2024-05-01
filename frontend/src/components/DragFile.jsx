import { useState } from "react";
import { Box, Button, Text, Spinner } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

const DragFile = ({ editorRef, setValue }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        setValue(fileContent);
        editorRef.current.setValue(fileContent);
        setIsLoading(false);
      };
      reader.readAsText(file);
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    multiple: false,
    accept: ".py",
  });

  const handleButtonClick = () => {
    setIsLoading(true);
    open();
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && !file.webkitRelativePath) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        setValue(fileContent);
        editorRef.current.setValue(fileContent);
        setIsLoading(false);
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      w="80%"
      border="2px dashed gray"
      borderRadius="md"
      p={4}
      textAlign="center"
      height="20vh"
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Button colorScheme="blue" mb={4} onClick={handleButtonClick}>
        {isLoading ? <Spinner size="sm" /> : "Select a file to upload"}
      </Button>
      <Text>or</Text>
      <Text>Drop file here</Text>
    </Box>
  );
};

export default DragFile;
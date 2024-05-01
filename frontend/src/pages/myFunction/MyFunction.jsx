import { useState, useRef } from 'react'
import CodeEditor from '../../components/CodeEditor.jsx'
import { Box, Flex, Textarea, Button } from '@chakra-ui/react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const apiUrl = 'http://localhost:5000/api/';

function MyFunction() {
  const [entryPoint, setEntryPoint] = useState('');
  const [description, setDescription] = useState('');
  const codeEditorRef = useRef(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append('function_code', codeEditorRef.current.getValue());
      formData.append('entry_point', entryPoint);
      formData.append('description', description);

      const response2 = await axios.post(apiUrl + 'upload', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });

      response2.data && alert('Success! Function URL: ' + response2.data.body.url);

    } catch (error) {
      console.error('Error submitting Lambda function:', error);
      alert('Error submitting Lambda function');
    }
  };

  return (localStorage.getItem("token") == null || localStorage.getItem("token") == '') ? <Navigate to="/" /> :
    <Box maxW="" mx="auto" mt={5} mb={5} >
      <Flex direction="column" gap={4} ml={10} mr={10} >

        <CodeEditor ref={codeEditorRef} setEntryPoint={setEntryPoint} entryPoint={entryPoint} />

        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button colorScheme="gray" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </Box>
}

export default MyFunction
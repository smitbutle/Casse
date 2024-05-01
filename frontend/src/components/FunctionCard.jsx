import { useRef, useState } from 'react';
import {
  Box, Text, Link, Code, Flex, Divider, Button, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from 'axios';

var host = "localhost"
var port = "8000"

const FunctionCard = ({ functionData }) => {
  const { content, create_date, description, entrypoint, function_id, user_id, weburl, resource_id } = functionData;
  console.log(functionData)
  const [isExpanded, setIsExpanded] = useState(false);

  const formatContent = (content) => {
    const lines = content.split('\n');
    const formattedLines = lines.map(line => '    ' + line); // Adding 4 spaces to each line for indentation
    return formattedLines.join('\n');
  };
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const deleteFunction = () => {
    let req = {
      'functionName': entrypoint,
      'resource_id': resource_id,
    }
    axios({
      baseURL: `http://${host}:${port}/api/deletefunc`,
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      method: 'post',
      data: req
    }).then((response) => {
      console.log(response)
      // handleClickCloseDialog()
      // props.setRe(!props.re)
    }).then((error) => {
      console.log(error)
      // handleClickCloseDialog()
      // props.setRe(!props.re)
    });
  }
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" m="2">
      <Flex justify="space-between" >
        <Box onClick={() => setIsExpanded(!isExpanded)} cursor="pointer">
          <Text fontWeight="bold">{entrypoint}</Text>
          <Text fontsize="sm" color="gray.500">{description}</Text>
        </Box>
        <Box>
          <Button size="sm" variant="outline" m={2} onClick={() => setIsExpanded(!isExpanded)} cursor="pointer">
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
          <Button size="sm" variant="outline" m={2} color={"white"} background={"red"} _hover={{ background: "#8c0e0e" }} onClick={onOpen}>
            Delete
          </Button>
        </Box>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete {entrypoint}
              </AlertDialogHeader>

              <AlertDialogBody>
                {"Are you sure? You can't undo this action afterwards."}
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={()=>{onClose(); deleteFunction();}} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

      </Flex>
      {isExpanded && (
        <>
          <Divider my="2" />
          <Code whiteSpace="pre" overflowX="auto" border="none" borderRadius="5px" p="2">
            {formatContent(content)}
          </Code>

          <Divider my="2" />
          <Text fontsize="sm">Created: {create_date}</Text>

          <Divider my="2" />
          <Text fontsize="sm">Function ID: {function_id}</Text>

          <Divider my="2" />
          <Text fontsize="sm">User ID: {user_id}</Text>

          <Divider my="2" />
          <Link color="blue.500" href={weburl} target="_blank" rel="noopener noreferrer">Web URL: {weburl}</Link>
        </>
      )}
    </Box>
  );
};

export default FunctionCard;
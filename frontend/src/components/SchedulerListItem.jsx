import { useRef, useState } from 'react';
import {
  ListItem,
  Avatar,
  Text,
  IconButton,
  Box,
  Tooltip,
  Switch,
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Stack, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const host = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_PORT;


export default function SchedulerListItem(props) {
  const [disabled, setDisabled] = useState(!props.scheduler.disabled);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleClickCloseDialog = () => {
    props.setRe(!props.re)
  }

  function deleteScheduler() {

    let req = {
      'id': props.scheduler.id,
      'referenceId': props.scheduler.referenceId,
    }
    axios({
      baseURL: `http://${host}:${port}/api/deletejob`,
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      method: 'post',
      data: req
    }).then((response) => {
      console.log(response)
      handleClickCloseDialog()
      // props.setRe(!props.re)
    }).then((error) => {
      console.log(error)
      handleClickCloseDialog()
      // props.setRe(!props.re)
    });
  }

  function switchScheduler() {
    let req = {
      'id': props.scheduler.id,
      'referenceId': props.scheduler.referenceId,
      'disabled': disabled,
    }
    axios({
      baseURL: `http://${host}:${port}/api/toggle`,
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      method: 'post',
      data: req
    }).then((response) => {
      console.log(response)
      handleClickCloseDialog()
    }).then((error) => {
      console.log(error)
      handleClickCloseDialog()
    });
  }
  const cancelRef = useRef()
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete  {props.scheduler.name}
            </AlertDialogHeader>

            <AlertDialogBody>
              {"Are you sure? You can't undo this action afterwards."}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => {deleteScheduler();onClose()}} ml={3} >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <ListItem
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        py={2}
        borderRadius="md"
        bg="gray.100"
        _hover={{ bg: "gray.200" }}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            mr={4}
            cursor="pointer"
            onClick={handleOpenModal}
            bg="blue.500"
          />
          <Box>
            <Text
              onClick={handleOpenModal}
              fontWeight="bold"
              fontSize="lg"
              mb={1}
              cursor="pointer"
            >
              {props.scheduler.name}
            </Text>
            <Text onClick={onOpen} color="gray.600">
              {props.scheduler.desc}
            </Text>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" gap="1rem" alignItems="center">
          <Tooltip label="Turn on/off scheduler">
            <div>
              <Switch
                defaultChecked={!props.scheduler.disabled}
                onChange={() => {
                  setDisabled(!disabled);
                  switchScheduler();
                }}
                colorScheme="blue"
              />
            </div>
          </Tooltip>

          <Tooltip label="Delete scheduler">
            <IconButton
              aria-label="delete"
              icon={<DeleteIcon />}
              onClick={onOpen}
              ml={2}
              colorScheme="red"
            />
          </Tooltip>
          <Tooltip
            label={`Scheduler retry attempts: ${props.scheduler.retry}`}
            bg="blue.500"
            color="white"
          >
            <Tag colorScheme="blue">{props.scheduler.retry}</Tag>
          </Tooltip>
        </Box>

        <Modal isOpen={openModal} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Scheduler Detail</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <Box>
                  <Text fontWeight="bold">NAME:</Text>
                  <Text>{props.scheduler.name}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">ENTRY ID:</Text>
                  <Text>{props.scheduler.entryId}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">SCH ID:</Text>
                  <Text>{props.scheduler.id}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">REF ID:</Text>
                  <Text>{props.scheduler.referenceId}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">EXECUTOR:</Text>
                  <Text>{props.scheduler.executor}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">SPEC:</Text>
                  <Text>{props.scheduler.spec}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">ACTIVE:</Text>
                  <Text>{props.scheduler.disabled ? 'NO' : 'YES'}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">PERSISTED:</Text>
                  <Text>{props.scheduler.persist ? 'YES' : 'NO'}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">URL:</Text>
                  <Text>{props.scheduler.url}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">METHOD:</Text>
                  <Text>{props.scheduler.method}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">RETRY:</Text>
                  <Text>{props.scheduler.retry}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">RETRY THRESHOLD:</Text>
                  <Text>{props.scheduler.retryThreshold}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">CREATED AT:</Text>
                  <Text>{props.scheduler.createdAt}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">BODY:</Text>
                  <Text>{props.scheduler.body}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Press ESC on keyboard to close modal</Text>
                </Box>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </ListItem>
    </>
  );
}

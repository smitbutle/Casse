import { useState } from 'react';

import {
    Box,
    Flex,
    Text,
    Input,
    Stack,
    Switch,
    FormControl,
    FormLabel,
    Textarea,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    IconButton,
    Radio,
    RadioGroup,
    HStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import CronParser from '../CronParser';

const host = import.meta.env.VITE_HOST;


export default function MainHeader(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => { setOpenModal(false); props.setRe(!props.re) };
    const handleOpenModal2 = () => setOpenModal2(true);
    const handleCloseModal2 = () => { setOpenModal2(false) };
    // State variables
    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const [persist, setPersist] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [cronSpec, setCronSpec] = useState('');
    const [method, setMethod] = useState('get');
    const [url, setUrl] = useState('');
    const [retryCount, setRetryCount] = useState(0);
    const [retryThreshold, setRetryThreshold] = useState(0);

    const createScheduler = () => {

        if (name === "" || url === "" || method === "" || cronSpec === "") {

            alert("Please fill the form data is", name, url, method, cronSpec)
        } else {
            let req = {
                'name': name,
                'url': url,
                'method': method,
                'body': body == "" ? null : body,
                'retry': parseInt(retryCount),
                'retryThreshold': parseInt(retryThreshold),
                'persist': persist,
                'disabled': disabled,
                'spec': cronSpec,
            }
            axios({
                baseURL: `http://${host}/api/scheduler`,
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                method: 'post',
                data: req
            }).then(() => {
                handleCloseModal()
            }).then(() => {
                handleCloseModal()
            });
        }
    };
    return (
        <Box>
            <Modal isOpen={openModal} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>Create New Scheduler</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Stack spacing={3}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input value={name} onChange={(e) => setName(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <HStack justify="space-between">
                                    <FormLabel >Cron Spec
                                    </FormLabel>
                                    <FormLabel onClick={handleOpenModal2} cursor="pointer" css={{ color: "#34cceb" }}>Generate Expression
                                    </FormLabel>
                                </HStack>
                                <Modal isOpen={openModal2} onClose={handleCloseModal2}>
                                    <ModalOverlay />
                                    <ModalContent
                                        minWidth="1000px"
                                        height="fit-content"
                                    >
                                        <ModalHeader>Cron Expression</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody >
                                            <CronParser setCronSpec={setCronSpec} cronSpec={cronSpec}/>
                                        </ModalBody>
                                    </ModalContent>
                                </Modal>
                                <Input value={cronSpec} onChange={(e) => setCronSpec(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Retry</FormLabel>
                                <Input value={retryCount} onChange={(e) => setRetryCount(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Retry Threshold (In second unit)</FormLabel>
                                <Input value={retryThreshold} onChange={(e) => setRetryThreshold(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>URL</FormLabel>
                                <Input value={url} onChange={(e) => setUrl(e.target.value)} />
                            </FormControl>

                            <RadioGroup defaultValue="get" onChange={(value) => setMethod(value)} row>
                                <Stack direction="row">
                                    <Radio value="get">GET</Radio>
                                    <Radio value="post">POST</Radio>
                                    <Radio value="put">PUT</Radio>
                                    <Radio value="delete">DELETE</Radio>
                                </Stack>
                            </RadioGroup>;

                            <FormControl display="flex" alignItems="center">
                                <FormLabel>Persist</FormLabel>
                                <Switch
                                    isChecked={persist}
                                    onChange={(e) => setPersist(e.target.checked)}
                                />
                            </FormControl>
                            <FormControl display="flex" alignItems="center">
                                <FormLabel>Disable</FormLabel>
                                <Switch
                                    isChecked={disabled}
                                    onChange={(e) => setDisabled(e.target.checked)}
                                />
                            </FormControl>

                            <FormControl variant="filled" fullWidth sx={{ pb: 3 }}>
                                <FormLabel>Body Request</FormLabel>
                                <Textarea
                                    placeholder="Body Request"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                />
                            </FormControl>;

                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={createScheduler}>
                            Create
                        </Button>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Flex align="center" justify="space-between" p={4}>
                <Text fontSize="xl">Current Jobs</Text>
                <Flex align="center">
                    <Input placeholder="Search..." mr={4} />
                    <IconButton
                        aria-label="Add new scheduler"
                        icon={<AddIcon />}
                        onClick={handleOpenModal}
                    />
                </Flex>
            </Flex>
        </Box>
    );
}

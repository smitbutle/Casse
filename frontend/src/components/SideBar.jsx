import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, List, ListItem } from '@chakra-ui/react';

function SideBar() {
  return (
    <Box>
      <div style={{ backgroundColor: '#0056B3', padding: '10px 0' }}>
        <List
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap={6}
          pb={1}
        >
          <ListItem>
            <Link
              as={RouterLink}
              to="/"
              color="#fff"
              textDecoration="none"
              px={3}
              py={2}
              borderRadius="md"
              _hover={{ bg: "blue.500" }}
            >
              Dashboard
            </Link>
          </ListItem>
          <ListItem>
            <Link
              as={RouterLink}
              to="/cron"
              color="#fff"
              textDecoration="none"
              px={3}
              py={2}
              borderRadius="md"
              _hover={{ bg: "blue.500" }}
            >
              Cron
            </Link>
          </ListItem>
          <ListItem>
            <Link
              as={RouterLink}
              to="/myFunction"
              color="#fff"
              textDecoration="none"
              px={3}
              py={2}
              borderRadius="md"
              _hover={{ bg: "blue.500" }}
            >
              Create Function
            </Link>
          </ListItem>
          <ListItem>
            <Link
              as={RouterLink}
              to="/listFunctions"
              color="#fff"
              textDecoration="none"
              px={3}
              py={2}
              borderRadius="md"
              _hover={{ bg: "blue.500" }}
            >
              Saved Functions
            </Link>
          </ListItem>
          {/* <ListItem>
            <Link
              as={RouterLink}
              to="/notification"
              color="#fff"
              textDecoration="none"
              px={3}
              py={2}
              borderRadius="md"
              _hover={{ bg: "blue.500" }}
            >
              Notification
            </Link>
          </ListItem> */}
        </List>
      </div>
    </Box>
  );
}

export default SideBar;
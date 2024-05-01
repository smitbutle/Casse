import { Box, Button, Heading} from '@chakra-ui/react';
import SideBar from './SideBar';
function updatingSoon() {
  return;
}

function handleLoginChange(handleLoginSuccess) {
  return () => {
    handleLoginSuccess();
  };
}

function NavBar(props) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" style={{ backgroundColor: '#0056B3', padding: '10px 0', color: "#E6F4FF" }}>


        <Heading as="h1" size="xl" padding="0 0 0 3rem">
          Casse
        </Heading>
        <SideBar />
        
        <Box>
        <Button onClick={() => { handleLoginChange(props.handleLoginSuccess), localStorage.removeItem("token"), window.location.reload(); }} marginRight="1rem">Logout</Button>
        <Button onClick={updatingSoon} marginRight="1rem">Profile</Button>
        </Box>

    </Box>
  );
}

export default NavBar;
import { VStack } from "@chakra-ui/react";
import FunctionCard from "./FunctionCard";

import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

var host = "localhost"
var port = "8000"


const FunctionList = () => {
  
  const [functions, setFunctions] = useState([]);

  useEffect(() => {

    axios({
      baseURL: `http://${host}:${port}/api/myfunc`,
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      method: 'get',
    }).then((response) => {
      setFunctions(response.data.functions);
    });
  }, []);


  return (localStorage.getItem("token") == null || localStorage.getItem("token") == '') ? <Navigate to="/" /> :
    <VStack spacing="4" align="stretch" m={10}>
      {functions.map(func => (
        <FunctionCard key={func.function_id} functionData={func} />
      ))}
    </VStack>
};

export default FunctionList;

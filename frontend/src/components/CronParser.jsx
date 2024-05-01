import {
  Select,
} from "chakra-react-select";
import { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Flex,
  ChakraProvider,
  extendTheme,
  Input,
} from '@chakra-ui/react';
import { Link } from "react-router-dom";

const theme = extendTheme({
  components: {
    Select: {
      variants: {
        customSelect: {
          option: {
            _selected: {
              bg: 'blue.500',
              color: 'white',
            },
          },
        },
      },
    },
  },
});

const CronParser = ({ setCronSpec, cronSpec }) => {
  const [minute, setMinute] = useState(['*']);
  const [hour, setHour] = useState(['*']);
  const [dayOfMonth, setDayOfMonth] = useState(['*']);
  const [month, setMonth] = useState(['*']);
  const [dayOfWeek, setDayOfWeek] = useState(['*']);

  function getCronSpecString() {
    return minute.join(',') + ' ' + hour.join(',') + ' ' + dayOfMonth.join(',') + ' ' + month.join(',') + ' ' + dayOfWeek.join(',')
  }
  useEffect(() => {
    setCronSpec(getCronSpecString());
  }, [minute, dayOfMonth, dayOfWeek, month, hour])

  const weekDaysOptions = [
    { value: '*', label: 'Every Week Day' },
    { value: '1', label: 'Monday' },
    { value: '2', label: 'Tuesday' },
    { value: '3', label: 'Wednesday' },
    { value: '4', label: 'Thursday' },
    { value: '5', label: 'Friday' },
    { value: '6', label: 'Saturday' },
    { value: '7', label: 'Sunday' }
  ];

  const monthOptions = [
    { value: '*', label: 'Every Month' },
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ]

  const monthDaysOptions = [
    { value: '*', label: 'Every Day' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
    { value: '26', label: '26' },
    { value: '27', label: '27' },
    { value: '28', label: '28' },
    { value: '29', label: '29' },
    { value: '30', label: '30' },
    { value: '31', label: '31' }
  ]
  const hourOptions = [
    { value: '*', label: 'Every Hour' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' }
  ]

  const minutesOptions = [
    { value: '*', label: 'Every Minute' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
    { value: '26', label: '26' },
    { value: '27', label: '27' },
    { value: '28', label: '28' },
    { value: '29', label: '29' },
    { value: '30', label: '30' },
    { value: '31', label: '31' },
    { value: '32', label: '32' },
    { value: '33', label: '33' },
    { value: '34', label: '34' },
    { value: '35', label: '35' },
    { value: '36', label: '36' },
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },
    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' },
    { value: '45', label: '45' },
    { value: '46', label: '46' },
    { value: '47', label: '47' },
    { value: '48', label: '48' },
    { value: '49', label: '49' },
    { value: '50', label: '50' },
    { value: '51', label: '51' },
    { value: '52', label: '52' },
    { value: '53', label: '53' },
    { value: '54', label: '54' },
    { value: '55', label: '55' },
    { value: '56', label: '56' },
    { value: '57', label: '57' },
    { value: '58', label: '58' },
    { value: '59', label: '59' },
    { value: '60', label: '60' }
  ];

  const [minutesSelectedOptions, setMinutesSelectedOptions] = useState([{ value: '*', label: 'Every Minute' }]);
  const [hourSelectedOptions, setHourSelectedOptions] = useState([{ value: '*', label: 'Every Hour' }]);
  const [dayOfMonthSelectedOptions, setDayOfMonthSelectedOptions] = useState([{ value: '*', label: 'Every Day' }]);
  const [monthSelectedOptions, setMonthSelectedOptions] = useState([{ value: '*', label: 'Every Month' }]);
  const [dayOfWeekSelectedOptions, setDayOfWeekSelectedOptions] = useState([{ value: '*', label: 'Every Week Day' }]);

  const handleDayOfWeekSelectedOptions = (selectedOptions) => {
    setDayOfWeek(Array.from(selectedOptions, option => option.value))
    setDayOfWeekSelectedOptions(selectedOptions);
  };

  const handleMonthSelectedOptions = (selectedOptions) => {
    setMonth(Array.from(selectedOptions, option => option.value))
    setMonthSelectedOptions(selectedOptions);
  };

  const handleDayOfMonthSelectedOptions = (selectedOptions) => {
    setDayOfMonth(Array.from(selectedOptions, option => option.value))
    setDayOfMonthSelectedOptions(selectedOptions);
  };

  const handleHourSelectedOptions = (selectedOptions) => {
    setHour(Array.from(selectedOptions, option => option.value))
    setHourSelectedOptions(selectedOptions);
  };


  const handleMinutesSelectedOptions = (selectedOptions) => {
    setMinute(Array.from(selectedOptions, option => option.value))
    setMinutesSelectedOptions(selectedOptions);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box >
        <Flex direction={['column', 'row']} wrap="wrap" justify="space-between">
          <FormControl mb={4} mr={4} flex="1 1 30%">
            <FormLabel>Minute:</FormLabel>
            <Select
              isMulti
              onChange={handleMinutesSelectedOptions}
              value={minutesSelectedOptions}
              variant={"outline"}
              options={minutesOptions}
            />
          </FormControl>

          <FormControl mb={4} mr={4} flex="1 1 30%">
            <FormLabel>Hour:</FormLabel>
            <Select
              isMulti
              onChange={handleHourSelectedOptions}
              value={hourSelectedOptions}
              variant={"outline"}
              options={hourOptions}
            />
          </FormControl>

          <FormControl mb={4} mr={4} flex="1 1 30%">
            <FormLabel>Day of Month:</FormLabel>
            <Select
              isMulti
              onChange={handleDayOfMonthSelectedOptions}
              value={dayOfMonthSelectedOptions}
              variant={"outline"}
              options={monthDaysOptions}
            />
          </FormControl>

          <FormControl mb={4} mr={4} flex="1 1 30%">
            <FormLabel>Month:</FormLabel>
            <Select
              isMulti
              onChange={handleMonthSelectedOptions}
              value={monthSelectedOptions}
              variant={"outline"}
              options={monthOptions}
            />
          </FormControl>

          <FormControl mb={4} flex="1 1 30%">
            <FormLabel>Day of Week:</FormLabel>
            <Select
              isMulti
              onChange={handleDayOfWeekSelectedOptions}
              value={dayOfWeekSelectedOptions}
              variant={"outline"}
              options={weekDaysOptions}
            />
          </FormControl>
        </Flex>

        <Link to={"https://crontab.guru/#" +  getCronSpecString().replace(' ', '_')} target="_blank" >More Info</Link>
        <FormControl>
          <Input value={cronSpec} onChange={(e) => setCronSpec(e.target.value)} />
        </FormControl>
      </Box>
    </ChakraProvider>
  );
};

export default CronParser;
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Stopwatch from './Stopwatch';
import cronParser from 'cron-parser';

function Dashboard({ schedulers }) {

  let enabledJobs = 0, disabledJobs = 0, successfulJobs = 0, failedJobs = 0;
  schedulers.forEach(job => {

    if (job.disabled) {
      disabledJobs++;
    } else {
      enabledJobs++;
      const isSuccess = true; // Assuming it's true for now
      if (isSuccess) {
        successfulJobs++;
      } else {
        failedJobs++;
      }
    }
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == "") {
      navigate('');
    }
  }, []);


  function getLastExecTime(spec) {
    const interval = cronParser.parseExpression(spec);
    const recentTime = interval.prev().toString();
    return recentTime;
  }
  
  function getNextExecTime(spec) {
    const interval = cronParser.parseExpression(spec);
    const recentTime = interval.next().toString();
    return recentTime;
  }

  function getNextExecTimeRemaining(spec) {
    const interval = cronParser.parseExpression(spec);
    const nextTime = interval.next().getTime();
    return nextTime;
  }

  return (
    <div>
      <Box
        bg="#E6F4FF"
      >
        <Box display="flex" justifyContent="space-around" mt={4}>
          <StatBox color="#00BFA6" title="Enabled Jobs" value={enabledJobs} />
          <StatBox color="#FF9100" title="Disabled Jobs" value={disabledJobs} />
          <StatBox color="#00C853" title="Successful Jobs" value={successfulJobs} />
          <StatBox color="#FF4C4C" title="Failed Jobs" value={failedJobs} />
        </Box>
      </Box>
      <Box
        bg="#E6F4FF"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="#E6F4FF" // Light blue background
          p={4}
          mt={4}
          width="100%"
        >
          <h1 style={{ fontWeight: 'bold', color: '#0056B3', paddingBottom: '1rem' }}>Scheduled Jobs</h1>

          <table style={{ width: '100%', borderCollapse: 'collapse', overflow: 'hidden', borderRadius: '8px' }}>
            <thead>
              <tr style={{ backgroundColor: '#0056B3', color: '#E6F4FF' }}> {/* Dark blue header */}
                <th style={{ borderBottom: '2px solid #E6F4FF', padding: '12px 0', fontWeight: 'bold', textAlign: 'left', paddingLeft: '16px' }}>No.</th>
                <th style={{ borderBottom: '2px solid #E6F4FF', padding: '12px 0', fontWeight: 'bold', textAlign: 'left', paddingLeft: '16px' }}>Job</th>
                <th style={{ borderBottom: '2px solid #E6F4FF', padding: '12px 0', fontWeight: 'bold', textAlign: 'left', paddingLeft: '16px' }}>Last Execution Time</th>
                <th style={{ borderBottom: '2px solid #E6F4FF', padding: '12px 0', fontWeight: 'bold', textAlign: 'left', paddingLeft: '16px' }}>Time till next execution</th>
              </tr>
            </thead>
            <tbody>
              {schedulers.sort((a, b) => {
                if (a.disabled !== b.disabled) {
                  return a.disabled ? 1 : -1; // Sort 'false' before 'true'
                }
                return a.disabled ? 0 : getNextExecTimeRemaining(a.spec) - getNextExecTimeRemaining(b.spec);

              }).map((job, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#E6F4FF' : '#F5F5F5', color: '#333333' }}> {/* Alternating row colors */}
                  <td style={{ borderBottom: '1px solid #E6F4FF', padding: '12px 0', textAlign: 'left', paddingLeft: '16px' }}>{index + 1}</td>
                  <td style={{ borderBottom: '1px solid #E6F4FF', padding: '12px 0', textAlign: 'left', paddingLeft: '16px' }}>{job.name}</td>

                  <td style={{ borderBottom: '1px solid #E6F4FF', padding: '12px 0', textAlign: 'left', paddingLeft: '16px' }}>{job.disabled ? '-' : getLastExecTime(job.spec)}</td>
                  <td style={{ borderBottom: '1px solid #E6F4FF', padding: '12px 0', textAlign: 'left', paddingLeft: '16px' }}>{job.disabled ? '-' : <Stopwatch initialTime={getNextExecTimeRemaining(job.spec)} />}</td>
                </tr>
              ))
              }

            </tbody>
          </table>
        </Box>
      </Box>
    </div>
  );
}

const StatBox = ({ color, title, value }) => (
  <Box
    flex={1}
    bg={color}
    height="100px"
    boxShadow="0px 0px 3px 3px #E6F4FF"
    m={2}
    borderRadius="8px"
    textAlign="center"
    p={4}
    color="#E6F4FF"
  >
    <h1 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{title}</h1>
    <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Count: {value}</p>
  </Box>
);

export default Dashboard;

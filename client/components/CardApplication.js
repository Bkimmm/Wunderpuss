import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import ProgressBar from './Progressbar.js';
import { progressTypes } from '../constants/formFields.js';
import {
  Grid,
  TextField,
  MenuItem,
  Avatar,
  Typography,
  CardContent,
} from '@mui/material';

import { Container, Box, Button, Card } from '@mui/material';

function CardApplication(props) {
  const navigate = useNavigate();
  const [showFullDesc, toggleShowFullDesc] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [progress, setProgress] = useState(props.progress);
  const {
    title,
    url,
    company_name,
    company_logo,
    job_type,
    publication_date,
    candidate_required_location,
    salary,
    description,
    priority,
  } = props;
  console.log(props);
  const appId = props._id;
  const remove = () => {
    props.deleteApp(appId);
  };

  const handleChange = (e) => {
    setProgress(e.target.value);
  };

  const handleProgressUpdate = () => {
    console.log({ progress });
    props.updateApp(appId, { progress });
    setIsEditing(false);
  };

  const handleCancelChange = () => {
    setIsEditing(false);
    setProgress(props.progress);
  };
  const DESC_LIMIT = 250;

  const toggleDescription = (desc) => {
    if (desc.length > DESC_LIMIT) {
      if (showFullDesc) {
        return (
          <>
            {desc}
            <Button onClick={() => toggleShowFullDesc(false)}>Show Less</Button>
          </>
        );
      } else {
        return (
          <>
            {desc.slice(0, DESC_LIMIT)}...{' '}
            <Button onClick={toggleShowFullDesc}>Show More</Button>
          </>
        );
      }
    } else {
      return desc;
    }
  };

  const editComponent = () => {
    if (!isEditing)
      return (
        <Button variant='contained' onClick={() => setIsEditing(true)}>
          Update progress
        </Button>
      );
    else
      return (
        <Grid container mt={3}>
          <Grid item xs={12}>
            <TextField
              required
              id='progress'
              name='progress'
              label='Where in the pipeline are you with this posting?'
              select
              fullWidth
              autoComplete='given-name'
              value={progress}
              onChange={handleChange}
              variant='standard'
            >
              {progressTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' onClick={handleProgressUpdate}>
              Save
            </Button>
            <Button variant='contained' onClick={handleCancelChange}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      );
  };

  return (
    <Card variant='outlined' sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ bgcolor: 'navy', mr: '10px' }} src={company_logo} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography className='job-title' variant='h6'>
                <a
                  href={url}
                  target='_blank'
                  style={{ textDecoration: 'none', color: '#212121' }}
                >
                  {title}
                </a>
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {company_name} {salary}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'start',
            }}
          >
            <Typography
              align='right'
              style={{
                color:
                  priority === 'High'
                    ? '#8bc34a'
                    : priority === 'Med'
                    ? '#cddc39'
                    : '#009688',
              }}
            >
              {priority.toUpperCase()}
            </Typography>
            <Typography align='right' color='text.secondary' variant='body2'>
              {new Date(publication_date).toDateString()}
            </Typography>
          </Box>
        </Box>
        <div className='cardInfo'>
          <strong>Location: </strong>
          {candidate_required_location}
        </div>

        <div className='description'>
          <Box sx={{ p: 1 }}>
            <Typography variant='body2' color='text.primary'>
              {toggleDescription(description)}
            </Typography>
          </Box>
        </div>
      </CardContent>
      <CardContent>
        <ProgressBar progress={progress} />
        <div className='cardInfo-buttons'>
          {editComponent()}
          <Button
            variant='outlined'
            onClick={() => {
              remove();
            }}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardApplication;

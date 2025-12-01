import { useQuery, gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Avatar,
  Chip,
  Button,
  Alert,
  Divider,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      name
      age
      class
      subjects
      attendance
      email
      department
      position
      role
    }
  }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: '32px',
  paddingBottom: '32px',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
}));

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id },
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <StyledContainer>
        <Alert severity="error">Error loading employee: {error.message}</Alert>
      </StyledContainer>
    );
  }

  const { employee } = data;

  return (
    <StyledContainer maxWidth="md">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back to Home
      </Button>

      <StyledCard>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" gap={3} mb={4}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'primary.main',
                fontSize: '48px',
              }}
            >
              {employee.name.charAt(0)}
            </Avatar>
            <Box flex={1}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {employee.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {employee.position}
              </Typography>
              <Box display="flex" gap={1} mt={1}>
                <Chip label={employee.department} color="primary" />
                <Chip label={employee.role} color="secondary" variant="outlined" />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Employee ID
              </Typography>
              <Typography variant="h6" fontWeight="medium">
                {employee.id}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Age
              </Typography>
              <Typography variant="h6" fontWeight="medium">
                {employee.age} years
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Email
              </Typography>
              <Typography variant="h6" fontWeight="medium">
                {employee.email}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Class
              </Typography>
              <Typography variant="h6" fontWeight="medium">
                {employee.class}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Attendance Rate
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h6" fontWeight="medium">
                  {employee.attendance}%
                </Typography>
                <Chip
                  label={employee.attendance >= 90 ? 'Excellent' : 'Good'}
                  size="small"
                  color={employee.attendance >= 90 ? 'success' : 'warning'}
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Subjects
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
              {employee.subjects?.map((subject, idx) => (
                <Chip key={idx} label={subject} color="primary" variant="outlined" size="medium" />
              ))}
            </Box>
          </Box>
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};

export default EmployeeDetails;

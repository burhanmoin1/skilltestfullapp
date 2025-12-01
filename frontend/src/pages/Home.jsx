import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Chip,
  Avatar,
  ButtonGroup,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  GridView as GridViewIcon,
  ViewModule as ViewModuleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Flag as FlagIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const GET_EMPLOYEES = gql`
  query GetEmployees($page: Int, $limit: Int, $sortBy: String, $sortOrder: String) {
    employees(page: $page, limit: $limit, sortBy: $sortBy, sortOrder: $sortOrder) {
      employees {
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
      totalPages
      currentPage
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: '24px',
  paddingBottom: '24px',
  minHeight: 'calc(100vh - 64px)',
}));

const ViewToggleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
  flexWrap: 'wrap',
  gap: '16px',
}));

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '24px',
  marginTop: '24px',
}));

const TileCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
}));

const TableContainer = styled(Box)(({ theme }) => ({
  overflowX: 'auto',
  marginTop: '24px',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  backgroundColor: 'white',
}));

const Table = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: '1200px',
}));

const TableHead = styled('thead')(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
}));

const TableRow = styled('tr')(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#f5f5f5',
  },
  '&:hover': {
    backgroundColor: '#e3f2fd',
  },
  cursor: 'pointer',
}));

const TableCell = styled('td')(({ theme }) => ({
  padding: '16px',
  borderBottom: '1px solid #e0e0e0',
  fontSize: '14px',
}));

const TableHeaderCell = styled('th')(({ theme }) => ({
  padding: '16px',
  textAlign: 'left',
  fontWeight: '600',
  fontSize: '14px',
  color: 'white',
}));

const DetailDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    minWidth: '600px',
    maxWidth: '800px',
  },
}));

const Home = () => {
  const [view, setView] = useState('grid');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuEmployee, setMenuEmployee] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES, {
    variables: { page: 1, limit: 50, sortBy: 'name', sortOrder: 'asc' },
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      setSnackbar({ open: true, message: 'Employee deleted successfully', severity: 'success' });
      refetch();
      handleMenuClose();
    },
    onError: (error) => {
      setSnackbar({ open: true, message: error.message, severity: 'error' });
    },
  });

  const handleMenuOpen = (event, employee) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuEmployee(null);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedEmployee(null);
  };

  const handleDelete = () => {
    if (menuEmployee) {
      deleteEmployee({ variables: { id: menuEmployee.id } });
    }
  };

  const handleEdit = () => {
    setSnackbar({ open: true, message: 'Edit functionality - Coming soon!', severity: 'info' });
    handleMenuClose();
  };

  const handleFlag = () => {
    setSnackbar({ open: true, message: 'Employee flagged for review', severity: 'warning' });
    handleMenuClose();
  };

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
        <Alert severity="error">Error loading employees: {error.message}</Alert>
      </StyledContainer>
    );
  }

  const { employees } = data.employees;

  return (
    <StyledContainer maxWidth="xl">
      <ViewToggleContainer>
        <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
          Employee Management Dashboard
        </Typography>
        <ButtonGroup variant="contained" size="large">
          <Button
            onClick={() => setView('grid')}
            startIcon={<ViewModuleIcon />}
            variant={view === 'grid' ? 'contained' : 'outlined'}
          >
            Tile View
          </Button>
          <Button
            onClick={() => setView('table')}
            startIcon={<GridViewIcon />}
            variant={view === 'table' ? 'contained' : 'outlined'}
          >
            Grid View
          </Button>
        </ButtonGroup>
      </ViewToggleContainer>

      {view === 'grid' ? (
        <GridContainer>
          {employees.map((employee) => (
            <TileCard key={employee.id} onClick={() => handleEmployeeClick(employee)}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box display="flex" alignItems="center" gap={2} flex={1}>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: 'primary.main',
                        fontSize: '24px',
                      }}
                    >
                      {employee.name.charAt(0)}
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {employee.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {employee.position}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, employee)}
                    sx={{ marginTop: '-8px', marginRight: '-8px' }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Box mt={2} display="flex" flexDirection="column" gap={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Department:
                    </Typography>
                    <Chip label={employee.department} size="small" color="primary" variant="outlined" />
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Age:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {employee.age}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Attendance:
                    </Typography>
                    <Chip
                      label={`${employee.attendance}%`}
                      size="small"
                      color={employee.attendance >= 90 ? 'success' : 'warning'}
                    />
                  </Box>
                </Box>
              </CardContent>
            </TileCard>
          ))}
        </GridContainer>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <tr>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Age</TableHeaderCell>
                <TableHeaderCell>Position</TableHeaderCell>
                <TableHeaderCell>Department</TableHeaderCell>
                <TableHeaderCell>Class</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Subjects</TableHeaderCell>
                <TableHeaderCell>Attendance</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </TableHead>
            <tbody>
              {employees.map((employee) => (
                <TableRow key={employee.id} onClick={() => handleEmployeeClick(employee)}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        {employee.name.charAt(0)}
                      </Avatar>
                      <strong>{employee.name}</strong>
                    </Box>
                  </TableCell>
                  <TableCell>{employee.age}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Chip label={employee.department} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>{employee.class}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {employee.subjects?.slice(0, 2).map((subject, idx) => (
                        <Chip key={idx} label={subject} size="small" variant="outlined" />
                      ))}
                      {employee.subjects?.length > 2 && (
                        <Chip label={`+${employee.subjects.length - 2}`} size="small" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${employee.attendance}%`}
                      size="small"
                      color={employee.attendance >= 90 ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, employee)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleFlag}>
          <FlagIcon fontSize="small" sx={{ mr: 1 }} />
          Flag
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Employee Details Dialog */}
      <DetailDialog open={detailsOpen} onClose={handleDetailsClose} maxWidth="md" fullWidth>
        {selectedEmployee && (
          <>
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" fontWeight="bold">
                  Employee Details
                </Typography>
                <IconButton onClick={handleDetailsClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box display="flex" alignItems="center" gap={3}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: 'primary.main',
                      fontSize: '48px',
                    }}
                  >
                    {selectedEmployee.name.charAt(0)}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                      {selectedEmployee.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      {selectedEmployee.position}
                    </Typography>
                    <Box display="flex" gap={1} mt={1}>
                      <Chip label={selectedEmployee.department} color="primary" />
                      <Chip label={selectedEmployee.role} color="secondary" variant="outlined" />
                    </Box>
                  </Box>
                </Box>

                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Employee ID
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedEmployee.id}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Age
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedEmployee.age} years
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Email
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedEmployee.email}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Class
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedEmployee.class}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Attendance Rate
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedEmployee.attendance}%
                      </Typography>
                      <Chip
                        label={selectedEmployee.attendance >= 90 ? 'Excellent' : 'Good'}
                        size="small"
                        color={selectedEmployee.attendance >= 90 ? 'success' : 'warning'}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Subjects
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                    {selectedEmployee.subjects?.map((subject, idx) => (
                      <Chip key={idx} label={subject} color="primary" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDetailsClose} variant="outlined">
                Close
              </Button>
              <Button
                onClick={() => {
                  handleDetailsClose();
                  handleEdit();
                }}
                variant="contained"
                startIcon={<EditIcon />}
              >
                Edit Employee
              </Button>
            </DialogActions>
          </>
        )}
      </DetailDialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default Home;

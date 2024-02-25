import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  useTheme,
  Modal,
  TextField,
  IconButton
} from '@mui/material';
import Swal from 'sweetalert2'
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../components/Header';
import { tokens } from '../../theme';

import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from '../../../app_settings';
import { formatDate } from '@fullcalendar/core';

const CompanyList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'Company ID' },
    { field: 'name', headerName: 'Company Name', flex: 1, cellClassName: 'name-column--cell' }
  ];

  // State for handling modal open/close
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for form data
  const [formData, setFormData] = useState({
    companyName: '', // Add other form fields as needed
  });

  const [searchText, setSearchText] = useState('');

  

  //Company List API Call

  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    getAllOrganizations('');
  }, []);

  const getAllOrganizations = (str) => {
    const authToken = Cookies.get('_auth');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');
    let requestBody = {};
    if(str){
      requestBody = {
          "searchModel": {
            
            "valueSearch": {
              "searchValueType": "string",
              "searchValue": str,
              "searchColumnList": [
                "name"
              ]
            }
          },
          
          "page": 1,
          "pageSize": 30
    };
    setSearchText("")
  }else{
    requestBody = {
      page: 1, // Example value for the page parameter
      pageSize: 30 // Example value for the pageSize parameter
    };
  }

    axios.post(`${BASE_URL}Organization/get-all`, requestBody, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        userId,
        organizationId
      }
    })
    .then(response => {
      const org = response.data.data; // Assuming the response contains an array of workflow objects
      setOrganizations(org);
    })
    .catch(error => {
      console.error('Error fetching organizations:', error);
    });
  }



  // Function to handle modal open
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submit
  const handleSubmit = () => {
    // Perform actions like sending a request to the backend API to create a new company
    if (formData.companyName) {
      const existingOrganizations = organizations;
  
      const isNameExists = existingOrganizations.some(
        (org) => org.name === formData.companyName
      );
  
      if (isNameExists) {
        // // Show duplicate name alert
        // setShowDuplicateAlert(true);
        alert("Company name already exists!");
  
        // Hide alert after a few seconds (adjust as needed)
        //setTimeout(() => setShowDuplicateAlert(false), 5000);
      } else {

        // Retrieve authentication token and user/organization IDs from cookies
        const authToken = Cookies.get('_auth');
        const userId = Cookies.get('userId');
        const organizationId = Cookies.get('organizationId');

        
        // Define the API data object
        const api_data = {
          "name" : formData.companyName
        };
  
  
        // Make the API call to save the organization
        axios.post(`${BASE_URL}Organization/save`, api_data, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId,
            organizationId
          }
        })
        .then(response => {
          // Handle success response if needed
          Swal.fire({
            title: "Success!",
            text: "Organization saved successfully.",
            icon: "success"
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            window.location.reload();
          });
          
          
        })
        .catch(error => {
          // Handle errors, such as setting an error state or displaying an error message
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong!",
            icon: "error"
          });
        });
  
        // Optionally, you can also clear duplicate name alert
        // setShowDuplicateAlert(false);
      }
    }

    // You can use formData to access the values entered in the form
    console.log('Company created:', formData);

    // Close the modal after submission
    handleModalClose();
  };

  // Function to handle cancel button click
  const handleCancel = () => {
    // Close the modal without submitting the form
    handleModalClose();
  };


  




  return (
    <>
    <Box m="20px">
          <Header title="COMPANY LIST" />
          <Box display="flex" justifyContent="space-between">
      {/* Left side: Search input box and search button */}
      <Box backgroundColor={colors.primary[800]} display="flex" alignItems="center">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <IconButton type="button" sx={{ p: 1 }} onClick={() => getAllOrganizations(searchText)}>
          <SearchIcon />
        </IconButton>
      </Box>
      
      {/* Right side: Create Company button */}
      <Box>
        <Button type="submit" color="secondary" variant="contained" onClick={handleModalOpen}>
          Create Company
        </Button>
      </Box>
    </Box>

      {/* Modal for Create Company */}
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="create-company-modal"
        aria-describedby="create-company-form"
      >
        {/* Modal content */}
        <Box
          sx={{
            position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        width: 400,
                        borderRadius: '8px', // Add border-radius for a rounded look
                        outline: 'none',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Create Company
          </Typography>
          {/* Add your form fields for creating a company */}
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
          />
          {/* Add other form fields as needed */}
          {/* Add your submit button */}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginTop: '16px' }}
          >
            Create
          </Button>
          <Button
                variant="contained"
                color="error"
                onClick={handleCancel}
                sx={{ marginTop: '16px' }}
              >
                Cancel
              </Button>
        </Box>
      </Modal>

      {/* DataGrid */}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
                      border: "none"
                    },
                    "& .MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                      outline: "none !important",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none"
                    },
                    "& .name-column--cell": {
                      color: colors.turquoise[300]
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: colors.pink[700],
                      borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: colors.primary[900]
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderT: "none",
                      backgroundColor: colors.pink[700]
                    }
        }}
      >
      <DataGrid
        rows={organizations}
        columns={columns}
        hideFooterSelectedRowCount
     />
      </Box>
    </Box>
    </>
  );
};

export default CompanyList;

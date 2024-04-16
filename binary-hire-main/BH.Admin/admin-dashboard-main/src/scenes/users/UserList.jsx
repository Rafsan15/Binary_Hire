import { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme, IconButton, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { Link, useLocation } from 'react-router-dom'
import { mockDataTeam } from "../../data/mockData"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"

import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from '../../../app_settings';


const UserList = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode);
  const [searchText, setSearchText] = useState('');
  const columns = [
        { field: "id", headerName: "ID" },
        { field: "userName", headerName: "User Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "firstName", headerName: "First Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "lastName", headerName: "lastName", type: "number", headerAlign: "left", align: "left" },
        { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "organizationName", headerName: "Organization", flex: 1 },
  ]

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUser("");
  }, []);

  const getAllUser = (str) => {
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
                "firstName", "lastName", "userName"
              ]
            }
          },
          
          "page": 1,
          "pageSize": 50
    };
    setSearchText("")
  }else{
    requestBody = {
      page: 1, // Example value for the page parameter
      pageSize: 30 // Example value for the pageSize parameter
    };
  }

    axios.post(`${BASE_URL}User/get-all`, requestBody, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        userId,
        organizationId
      }
    })
    .then(response => {
      const userList = response.data.data; // Assuming the response contains an array of workflow objects
      setUsers(userList);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
  }

  return (
    <Box m="20px">
          <Header title="COMPANY LIST" />
          <Box display="flex" justifyContent="space-between">
      {/* Left side: Search input box and search button */}
      <Box backgroundColor={colors.primary[800]} display="flex" alignItems="center">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <IconButton type="button" sx={{ p: 1 }} onClick={() => getAllUser(searchText)}>
          <SearchIcon />
        </IconButton>
      </Box>
      
      {/* Right side: Create Company button */}
      <Box>
        <Link to="/user-create">
         <Button type="submit" color="success" variant="contained">
             Create User 
         </Button>
         </Link>
        </Box>
    </Box>
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
          rows={users}
          columns={columns}
          hideFooterSelectedRowCount
        />
      </Box>
    </Box>
  )
}

export default UserList
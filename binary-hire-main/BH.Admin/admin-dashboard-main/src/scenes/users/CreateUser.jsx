import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from 'react';
import { Formik } from "formik";
import Swal from 'sweetalert2'
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from '../../../app_settings';
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleSubmit = (values, { resetForm }) => {
    // Retrieve authentication token and user/organization IDs from cookies
    const authToken = Cookies.get('_auth');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');

    // Define the API data object
    const api_data = {
      "email": values.email,
      "userName": values.userName,
      "firstName": values.firstName,
      "lastName": values.lastName,
      "phoneNumber": "",
      "userTypeId": 2,
      "organizationId": values.organizationId,
      "password": values.password,
      "confirmPassword": values.confirmPassword
    };

    // Make the API call to create the user
    axios
      .post(`${BASE_URL}Account/Register`, api_data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId,
          organizationId,
        },
      })
      .then((response) => {
        // Handle success response if needed
        Swal.fire({
          title: "Success!",
          text: "User created successfully!",
          icon: "success"
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          navigate('/users');
        });
      })
      .catch((error) => {
        // Handle errors, such as setting an error state or displaying an error message
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong!",
          icon: "error"
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          
        });
      });

    resetForm();
  }

  const initialValues = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    organizationId: "",
    password: "",
    confirmPassword: "",
  }

  const [organizations, setOrganizations] = useState([]);

  const phoneRegExp = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;

  const userSchema = yup.object().shape({
    userName: yup.string().required("required"),
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid email").required("required"),
    phoneNumber: yup.string().matches(phoneRegExp, "Invalid phone number").required("required"),
    organizationId: yup.string().required("required"),
    password: yup.string().required("required"),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required("required"),
  })

  useEffect(() => {
    const authToken = Cookies.get('_auth');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');

    const requestBody = {
      page: 1,
      pageSize: 10,
    };

    axios.post(`${BASE_URL}Organization/get-all`, requestBody, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        userId,
        organizationId
      }
    })
    .then(response => {
      const organizationList = response.data.data;
      setOrganizations(organizationList);
    })
    .catch(error => {
      console.error('Error fetching organizations:', error);
    });
  }, []);

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create user for an individual company"/>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? null : "span 4" }
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="UserName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name="userName"
                error={!!touched.userName && !!errors.userName}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="FirstName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="LastName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}
                  error={!!touched.organizationId && !!errors.organizationId}>
                <InputLabel id="demo-simple-select-label">Organization</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="organizationId"
                  id="demo-simple-select"
                  value={values.organizationId}
                  label="Organization"
                  onChange={(e) => {
                    handleChange(e);
                    values.organizationId = e.target.value;
                  }}
                >
                  <MenuItem value="">Select</MenuItem>
                  {organizations.map((org) => (
                    <MenuItem key={org.id} value={org.id}>
                      {org.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateUser;

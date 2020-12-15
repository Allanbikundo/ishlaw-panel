import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  InputAdornment,
  SvgIcon,
  Link,
  makeStyles
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import api from '../../../utils/api';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const FileCategory = props => {
  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add File Category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Use the form below to add a file category, the name and description
          field are compulsory
        </DialogContentText>
        <Formik
          initialValues={{
            name: 'Litigation',
            description: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .max(255)
              .required('Name is required'),
            description: Yup.string()
              .max(255)
              .required('Description is required')
          })}
          onSubmit={async values => {
            try {
              var response = await api.files().createFile(values);
              //TODO alert that it has been done 
              console.log(response)
              props.handleClose()
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Name"
                margin="normal"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                type="string"
                value={values.name}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.description && errors.description)}
                fullWidth
                helperText={touched.description && errors.description}
                label="Description"
                margin="normal"
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.description}
                variant="outlined"
              />
              <Box my={2}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Create
                </Button>
              </Box>
              <Box my={2}>
                <Button
                  color="red"
                  disabled={isSubmitting}
                  onClick={props.handleClose}
                  fullWidth
                  size="large"
                  variant="contained"
                >
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default FileCategory;

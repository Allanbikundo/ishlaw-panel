import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Link,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import AddFileCategoryDialog from "./CreateFileCategory"
import CreateFileDialog from "./CreateFile"

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [createFileOpen,setCreateFileOpen] = React.useState(false)
  const [createFileCategoryOpen, setCreateFileCategoryOpen] = React.useState(false)

  const handleCreateFileCategoryOpen = () => {
    setCreateFileCategoryOpen(true)
  }

  const handleCreateFileCategoryClose = () => {
    setCreateFileCategoryOpen(false)
  }

  const handleCreateFileOpen = () => {
    setCreateFileOpen(true)
  }

  const handleCreateFileClose = () => {
    setCreateFileOpen(false)
  }

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <AddFileCategoryDialog handleClose={handleCreateFileCategoryClose} open={createFileCategoryOpen}/>
      <CreateFileDialog handleClose={handleCreateFileClose} open={createFileOpen}/>
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={handleCreateFileCategoryOpen} className={classes.importButton}>
          Add File Category
        </Button>
        <Button onClick={handleCreateFileOpen} color="primary" variant="contained">
          Create File
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search file"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;

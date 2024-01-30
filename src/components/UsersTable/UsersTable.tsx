import React from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { UserAccount } from '../../API/mockData';

interface UsersTableProps {
    users: UserAccount[];
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    searchTerm: string;  
    onDeleteUser: (userId: string) => void;
    onOpenModal: (user?: UserAccount) => void;
  }

const UsersTable: React.FC<UsersTableProps> = ({ users, setSearchTerm, searchTerm, onDeleteUser,onOpenModal }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, userId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleDelete = () => {
    if (selectedUserId) {
      onDeleteUser(selectedUserId);
      handleMenuClose();
    }
  };
  
  const handleEdit = () => {
    const userToEdit = users.find(user => user.id === selectedUserId);
    if (userToEdit) {
      onOpenModal(userToEdit);
      handleMenuClose();
    }
  };
  return (
    <div className='Full-table-container'>
      <div className='Table-controls-container'>
        <TextField 
          label="Search" 
          variant="outlined" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <Button variant="contained" color="primary" onClick={() => onOpenModal()}>
          <AddCircleOutlineIcon /> Create User
        </Button>
      </div>
      <TableContainer component={Paper} className="tableContainer">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
                {["Account Name", "ID", "Email", "Currency", "Balance", "Action"].map((text) => (
                <TableCell key={text}>{text}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="tableRow">
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.currency}</TableCell>
                <TableCell>{user.balance}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuClick(e, user.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default UsersTable;

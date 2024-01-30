import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Currency, UserAccount } from '../../API/mockData';

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user?: UserAccount;
  onSubmit: (user: UserAccount | undefined) => void;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, user, onSubmit }) => {
  const [accountName, setAccountName] = useState(user?.name || '');
  const [accountNameError, setAccountNameError] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [emailError, setEmailError] = useState('');
  const [currency, setCurrency] = useState<Currency>(user?.currency || 'Euro');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (user) {
      setAccountName(user.name);
      setEmail(user.email);
      setCurrency(user.currency);
    } else {
      setAccountName('');
      setEmail('');
      setCurrency('Euro');
    }
  }, [user]);

  const handleSubmit = () => {
    let isValid = true;

    if (!accountName) {
      setAccountNameError('Account name is required');
      isValid = false;
    } else {
      setAccountNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (isValid) {
      const userData = { name: accountName, email, currency, id: user?.id || '', balance: user?.balance || 0 };
      onSubmit(userData);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {user ? 'Edit User' : 'Create User'}
        <IconButton onClick={onClose} style={{ position: 'absolute', right: '10px', top: '10px' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Account Name"
          type="text"
          fullWidth
          variant="outlined"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          error={!!accountNameError}
          helperText={accountNameError}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Currency</InputLabel>
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            label="Currency"
          >
            {['Euro', 'Dollars', 'Sterling', 'Yen'].map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained" 
          fullWidth
        >
          {user ? 'Edit Account' : 'Create Account'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;

import { UserAccount, mockAccounts } from './mockData';

export function getUsers(filter?: string, users?: UserAccount[]) {
  let filteredUsers = users && users.length > 0 ? users : mockAccounts;
  if (filter) {
    filteredUsers = filteredUsers.filter(user => {
      return (
        user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.id.includes(filter) ||
        user.email.toLowerCase().includes(filter.toLowerCase())
      );
    });
  }

  const totalUsers = filteredUsers.length;

  return {
    users: filteredUsers,
    totalUsers,
  };
}

export function saveUser(users: UserAccount[], newUser: UserAccount): UserAccount[] {
  const userId = newUser.id;

  if (userId && users.some(user => user.id === userId)) {
    return users.map(user => user.id === userId ? { ...user, ...newUser } : user);
  } else {
    let newUserId = userId || generateUserId();

    // eslint-disable-next-line no-loop-func
    while (users.some(user => user.id === newUserId)) {
      newUserId = generateUserId();
    }

    const userToAdd = { ...newUser, id: newUserId };
    return [...users, userToAdd];
  }
}

export function deleteUser(users: UserAccount[], userId: string) {
  const updatedUsers = users.filter(user => user.id !== userId);
  return updatedUsers;
}


export function generateUserId() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const getRandomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const getRandomDigit = () => Math.floor(Math.random() * 10);

  const letterPart = Array.from({ length: 2 }, getRandomLetter).join('');
  const digitPart = Array.from({ length: 3 }, getRandomDigit).join('');

  return `${letterPart}${digitPart}`;
}



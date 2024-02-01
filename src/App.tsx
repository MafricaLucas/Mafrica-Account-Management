import { useEffect, useState } from 'react';
import { deleteUser, getUsers, saveUser } from './API/api';
import './styles/App.css';
import './styles/StatCard.css';
import './styles/TableUsers.css';
import logo from './assets/img/logo.png';
import StatCard from './components/StatCard/StatCard';
import UsersTable from './components/UsersTable/UsersTable';
import UserModal from './components/UserModal/UserModal';
import { UserAccount } from './API/mockData';

function App() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [usersState, setUsersState] = useState<UserAccount[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserAccount[]>([]);

    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<UserAccount | undefined>(
        undefined
    );

    const handleOpenModal = (user?: UserAccount) => {
        setCurrentUser(user || undefined);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentUser(undefined);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getUsers();
            setUsersState(fetchedUsers.users);
            setTotalUsers(fetchedUsers.totalUsers);
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const filterUsers = () => {
            if (!searchTerm) {
                setFilteredUsers(usersState);
            } else {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                const filtered = usersState.filter(
                    (user) =>
                        user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                        user.email
                            .toLowerCase()
                            .includes(lowerCaseSearchTerm) ||
                        user.id.includes(searchTerm)
                );
                setFilteredUsers(filtered);
            }
        };

        const timer = setTimeout(() => {
            filterUsers();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, usersState]);

    const handleDeleteUser = async (userId: string) => {
        const updatedUsers = await deleteUser(usersState, userId);
        if (updatedUsers) {
            setUsersState(updatedUsers);
            setTotalUsers(updatedUsers.length);
        }
    };

    async function handleSubmitUser(
        user: UserAccount | undefined
    ): Promise<void> {
        if (user) {
            const updatedUsersResponse = await saveUser(usersState, user);
            setUsersState(updatedUsersResponse.updatedUsers);
            setTotalUsers(updatedUsersResponse.updatedUsers.length);
            handleCloseModal();
        }
    }

    return (
        <div className='App'>
            <header className='App-header'>
                <img
                    className='App-header-logo'
                    src={logo}
                    alt='Mafrica Account Management Logo'
                />
                <div className='App-header-name-container'>
                    <h1 className='App-header-name'>Mafrica</h1>
                    <h1 className='App-header-name'>Account</h1>
                    <h1 className='App-header-name'>Management</h1>
                </div>
            </header>
            <div className='Main-container'>
                <div className='Stat-cards-container'>
                    <StatCard
                        title='Total Users'
                        number={totalUsers}
                        color='#28B5E1'
                    />
                </div>
                <div className='Table-users-container'>
                    <UsersTable
                        users={filteredUsers}
                        setSearchTerm={setSearchTerm}
                        searchTerm={searchTerm}
                        onDeleteUser={handleDeleteUser}
                        onOpenModal={handleOpenModal}
                    />
                    <UserModal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        user={currentUser}
                        onSubmit={handleSubmitUser}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;

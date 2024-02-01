/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { deleteUser, getUsers, saveUser } from '../API/api';
import { mocked } from 'jest-mock';
import { UserAccount } from '../API/mockData';
import { act } from 'react-dom/test-utils';

let mockUsers: UserAccount[] = [
    {
        name: 'Alice Johnson',
        id: 'aj101',
        email: 'alice.j@example.com',
        currency: 'Euro',
        balance: 1200.5
    },
    {
        name: 'Bob Smith',
        id: 'bs202',
        email: 'bob.s@example.com',
        currency: 'Dollars',
        balance: 2300.0
    }
];

jest.mock('../API/api', () => ({
    getUsers: jest.fn(),
    deleteUser: jest.fn(),
    saveUser: jest.fn()
}));

describe('<App />', () => {
    it('should fetch and display users on initial render', async () => {
        mocked(getUsers).mockResolvedValueOnce({
            users: mockUsers,
            totalUsers: mockUsers.length
        });

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
        });
    });

    it('should open modal when create user button is clicked', async () => {
        mocked(getUsers).mockResolvedValueOnce({
            users: mockUsers,
            totalUsers: mockUsers.length
        });

        render(<App />);

        await act(async () => {
            userEvent.click(
                screen.getByTestId('CreateEditUserOpenModalButton')
            );
        });

        await waitFor(() => {
            expect(
                screen.getByTestId('CreateEditUserModal')
            ).toBeInTheDocument();
        });
    });

    it('should open action menu modal when action button is clicked and edit modal when edit button is clicked', async () => {
        mocked(getUsers).mockResolvedValueOnce({
            users: mockUsers,
            totalUsers: mockUsers.length
        });

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
        });

        await act(async () => {
            const actionButton = screen.getAllByRole('button', { name: '' })[0];
            userEvent.click(actionButton);
        });

        await waitFor(async () => {
            expect(
                await screen.findByTestId('ActionMenuModal')
            ).toBeInTheDocument();
        });
        await act(async () => {
            const editButton = await screen.findByTestId(
                'ActionMenuModalEditButton'
            );
            userEvent.click(editButton);
        });

        await waitFor(async () => {
            expect(
                await screen.findByTestId('CreateEditUserModal')
            ).toBeInTheDocument();
        });
    });

    it('should update displayed users based on search term', async () => {
        mocked(getUsers).mockResolvedValueOnce({
            users: mockUsers,
            totalUsers: mockUsers.length
        });
        render(<App />);

        await act(async () => {
            userEvent.type(screen.getByLabelText('Search'), 'Alice');
        });
        await waitFor(() => {
            expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
            expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
        });
    });

    it('should add a new user when submitted through modal', async () => {
        mocked(getUsers).mockResolvedValueOnce({
            users: mockUsers,
            totalUsers: mockUsers.length
        });

        mocked(saveUser).mockResolvedValue({
            updatedUsers: [
                ...mockUsers,
                {
                    id: 'cb303',
                    name: 'Charlie Brown',
                    email: 'charlie@example.com',
                    currency: 'Euro',
                    balance: 500
                }
            ]
        });

        render(<App />);

        await screen.findByText('Alice Johnson');

        await act(async () => {
            userEvent.click(
                screen.getByTestId('CreateEditUserOpenModalButton')
            );
        });
        // Attendre que la modal soit ouverte
        await waitFor(() => {
            expect(
                screen.getByTestId('CreateEditUserModal')
            ).toBeInTheDocument();
        });

        await act(async () => {
            // Effectuer des changements dans la modal et soumettre
            fireEvent.change(screen.getByTestId('AccountNameField'), {
                target: { value: 'Charlie Brown' }
            });
            fireEvent.change(screen.getByTestId('EmailField'), {
                target: { value: 'charlie@example.com' }
            });

            fireEvent.click(screen.getByTestId('CreateEditSubmitButton'));
        });
        // Vérifier les résultats après les mises à jour d'état
        await waitFor(() => {
            expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
        });
    });

    it('should edit an existing user when submitted through modal', async () => {
        mocked(getUsers).mockResolvedValueOnce({
            users: mockUsers,
            totalUsers: mockUsers.length
        });

        mocked(saveUser).mockResolvedValue({
            updatedUsers: [
                {
                    name: 'Alice Brown',
                    id: 'aj101',
                    email: 'alice.brown@example.com',
                    currency: 'Euro',
                    balance: 1200.5
                },
                {
                    name: 'Bob Smith',
                    id: 'bs202',
                    email: 'bob.s@example.com',
                    currency: 'Dollars',
                    balance: 2300.0
                }
            ]
        });

        render(<App />);

        await screen.findByText('Alice Johnson');

        await act(async () => {
            const actionButton = screen.getAllByRole('button', { name: '' })[0];
            userEvent.click(actionButton);
        });
        await waitFor(async () => {
            expect(
                await screen.findByTestId('ActionMenuModal')
            ).toBeInTheDocument();
        });

        await act(async () => {
            const editButton = await screen.findByTestId(
                'ActionMenuModalEditButton'
            );
            userEvent.click(editButton);
        });
        await waitFor(async () => {
            expect(
                await screen.findByTestId('CreateEditUserModal')
            ).toBeInTheDocument();
        });

        await act(async () => {
            fireEvent.change(screen.getByTestId('AccountNameField'), {
                target: { value: 'Alice Brown' }
            });
            fireEvent.change(screen.getByTestId('EmailField'), {
                target: { value: 'alice.brown@example.com' }
            });

            fireEvent.click(screen.getByTestId('CreateEditSubmitButton'));
        });
        await waitFor(() => {
            expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
            expect(screen.getByText('Alice Brown')).toBeInTheDocument();
            expect(
                screen.getByText('alice.brown@example.com')
            ).toBeInTheDocument();
        });
    });

    it('should delete an existing user', async () => {
        mocked(getUsers).mockResolvedValueOnce({
            users: mockUsers,
            totalUsers: mockUsers.length
        });

        mocked(deleteUser).mockResolvedValue([
            {
                name: 'Bob Smith',
                id: 'bs202',
                email: 'bob.s@example.com',
                currency: 'Dollars',
                balance: 2300.0
            }
        ]);

        render(<App />);
        await waitFor(() => screen.findByText('Alice Johnson'));

        await act(async () => {
            const actionButton = screen.getAllByRole('button', { name: '' })[0];
            userEvent.click(actionButton);
        });
        await waitFor(() => screen.findByTestId('ActionMenuModal'));

        await act(async () => {
            const deleteButton = screen.getByTestId(
                'ActionMenuModalDeleteButton'
            );
            userEvent.click(deleteButton);
        });
        await waitFor(async () => {
            expect(deleteUser).toHaveBeenCalledWith(mockUsers, 'aj101');
            expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});

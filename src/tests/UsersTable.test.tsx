import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UsersTable from '../components/UsersTable/UsersTable';
import { UserAccount } from '../API/mockData';

describe('UsersTable', () => {
    const mockUsers: UserAccount[] = [
        {
            name: 'John Doe',
            id: 'jd101',
            email: 'john@example.com',
            currency: 'Euro',
            balance: 1000
        },
        {
            name: 'Jane Doe',
            id: 'jd102',
            email: 'jane@example.com',
            currency: 'Dollars',
            balance: 1500
        }
    ];

    const mockSetSearchTerm = jest.fn();
    const mockOnDeleteUser = jest.fn();
    const mockOnOpenModal = jest.fn();

    const setup = () =>
        render(
            <UsersTable
                users={mockUsers}
                setSearchTerm={mockSetSearchTerm}
                searchTerm=''
                onDeleteUser={mockOnDeleteUser}
                onOpenModal={mockOnOpenModal}
            />
        );

    it('should display the users correctly', () => {
        setup();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('jd101')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    it('should call setSearchTerm when search input is changed', () => {
        setup();
        fireEvent.change(screen.getByLabelText('Search'), {
            target: { value: 'John' }
        });
        expect(mockSetSearchTerm).toHaveBeenCalledWith('John');
    });

    it('should open the edit modal when edit button is clicked', () => {
        setup();
        const actionButtons = screen.getAllByRole('button', { name: '' });
        fireEvent.click(actionButtons[0]);
        const editButton = screen.getByTestId('ActionMenuModalEditButton');
        fireEvent.click(editButton);
        expect(mockOnOpenModal).toHaveBeenCalledWith(mockUsers[0]);
    });

    it('should call onDeleteUser when delete button is clicked', () => {
        setup();
        const actionButtons = screen.getAllByRole('button', { name: '' });
        fireEvent.click(actionButtons[0]);
        const deleteButton = screen.getByTestId('ActionMenuModalDeleteButton');
        fireEvent.click(deleteButton);
        expect(mockOnDeleteUser).toHaveBeenCalledWith('jd101');
    });
});

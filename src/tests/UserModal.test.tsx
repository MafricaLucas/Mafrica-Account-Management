/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import {
    render,
    screen,
    fireEvent,
    within,
    waitFor
} from '@testing-library/react';
import UserModal from '../components/UserModal/UserModal';
import '@testing-library/jest-dom';
import { UserAccount } from '../API/mockData';

describe('UserModal', () => {
    const mockOnClose = jest.fn();
    const mockOnSubmit = jest.fn();
    const user: UserAccount = {
        id: 'u1',
        name: 'John Doe',
        email: 'john@example.com',
        currency: 'Dollars',
        balance: 1000
    };

    it('should display modal with correct information for editing user', async () => {
        render(
            <UserModal
                open={true}
                onClose={mockOnClose}
                user={user}
                onSubmit={mockOnSubmit}
            />
        );
        await waitFor(async () => {
            expect(
                screen.getByTestId('CreateEditUserModal')
            ).toBeInTheDocument();
            expect(screen.getByLabelText('Account Name')).toHaveValue(
                user.name
            );
            expect(screen.getByLabelText('Email')).toHaveValue(user.email);
        });
        const select = screen.getByTestId('CurrencyField');
        const withinSelect = within(select);

        await waitFor(async () => {
            expect(withinSelect.getByText('Dollars')).toBeInTheDocument();
        });
    });

    it('should display error when email is invalid and submit button is clicked', async () => {
        render(
            <UserModal
                open={true}
                onClose={mockOnClose}
                user={user}
                onSubmit={mockOnSubmit}
            />
        );

        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'invalidemail' }
        });
        fireEvent.click(screen.getByText('Edit Account'));

        await waitFor(async () => {
            expect(
                screen.getByText('Invalid email format')
            ).toBeInTheDocument();
            expect(mockOnSubmit).not.toHaveBeenCalled();
        });
    });

    it('should call onSubmit with updated user data when form is valid and submit button is clicked', async () => {
        const updatedUser = { ...user, name: 'Jane Doe' };

        render(
            <UserModal
                open={true}
                onClose={mockOnClose}
                user={user}
                onSubmit={mockOnSubmit}
            />
        );

        fireEvent.change(screen.getByLabelText('Account Name'), {
            target: { value: updatedUser.name }
        });
        fireEvent.click(screen.getByText('Edit Account'));

        await waitFor(async () => {
            expect(mockOnSubmit).toHaveBeenCalledWith(updatedUser);
        });
    });
});

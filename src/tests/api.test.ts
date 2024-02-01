import { getUsers, saveUser, deleteUser, generateUserId } from '../API/api';
import { UserAccount } from '../API/mockData';

describe('API Functions', () => {
    const mockUsers: UserAccount[] = [
        {
            id: 'ab123',
            name: 'John Doe',
            email: 'johndoe@example.com',
            currency: 'Euro',
            balance: 100
        },
        {
            id: 'cd456',
            name: 'Jane Smith',
            email: 'janesmith@example.com',
            currency: 'Dollars',
            balance: 150
        }
    ];

    describe('getUsers', () => {
        it('should return all users when no filter is provided', async () => {
            const result = await getUsers(undefined, mockUsers);
            expect(result.users).toEqual(mockUsers);
            expect(result.totalUsers).toBe(2);
        });

        it('should filter users by name', async () => {
            const result = await getUsers('John', mockUsers);
            expect(result.users).toHaveLength(1);
            expect(result.users[0].name).toBe('John Doe');
        });
    });

    describe('saveUser', () => {
        it('should add a new user if the ID is not present', async () => {
            const newUser: UserAccount = {
                name: 'Alice',
                email: 'alice@example.com',
                currency: 'Euro',
                balance: 200,
                id: ''
            };
            const result = await saveUser(mockUsers, newUser);

            expect(result.updatedUsers).toHaveLength(3);
            expect(result.updatedUsers[2].name).toBe('Alice');
        });

        it('should update an existing user if the ID is present', async () => {
            const updatedUser: UserAccount = {
                ...mockUsers[0],
                name: 'John Updated'
            };
            const result = await saveUser(mockUsers, updatedUser);

            expect(result.updatedUsers).toHaveLength(2);
            expect(result.updatedUsers[0].name).toBe('John Updated');
        });
    });

    describe('deleteUser', () => {
        it('should delete a user by ID', async () => {
            const result = await deleteUser(mockUsers, 'ab123');
            expect(result).toHaveLength(1);
            expect(result.find((user) => user.id === 'ab123')).toBeUndefined();
        });
    });

    describe('generateUserId', () => {
        it('should generate a valid user ID', () => {
            const userId = generateUserId();
            expect(userId).toMatch(/^[a-z]{2}\d{3}$/);
        });
    });
});

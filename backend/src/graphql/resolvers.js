let employees = [
    { id: '1', name: 'John Doe', age: 30, class: 'Engineering', subjects: ['Math', 'Physics', 'Computer Science'], attendance: 95.5, role: 'ADMIN', email: 'john@example.com', department: 'IT', position: 'Senior Engineer' },
    { id: '2', name: 'Jane Smith', age: 28, class: 'Management', subjects: ['Business', 'Finance', 'Marketing'], attendance: 92.0, role: 'EMPLOYEE', email: 'jane@example.com', department: 'Sales', position: 'Manager' },
    { id: '3', name: 'Bob Johnson', age: 35, class: 'Engineering', subjects: ['Chemistry', 'Biology', 'Math'], attendance: 88.5, role: 'EMPLOYEE', email: 'bob@example.com', department: 'Research', position: 'Scientist' },
    { id: '4', name: 'Alice Williams', age: 26, class: 'Design', subjects: ['Art', 'Design', 'UX'], attendance: 96.0, role: 'EMPLOYEE', email: 'alice@example.com', department: 'Design', position: 'UI Designer' },
    { id: '5', name: 'Charlie Brown', age: 32, class: 'Engineering', subjects: ['Computer Science', 'Math'], attendance: 90.5, role: 'EMPLOYEE', email: 'charlie@example.com', department: 'IT', position: 'Software Engineer' },
    { id: '6', name: 'Diana Prince', age: 29, class: 'Management', subjects: ['HR', 'Psychology', 'Business'], attendance: 94.0, role: 'EMPLOYEE', email: 'diana@example.com', department: 'HR', position: 'HR Manager' },
    { id: '7', name: 'Eve Martinez', age: 31, class: 'Engineering', subjects: ['Computer Science', 'Networks'], attendance: 89.0, role: 'EMPLOYEE', email: 'eve@example.com', department: 'IT', position: 'Network Engineer' },
    { id: '8', name: 'Frank Miller', age: 33, class: 'Sales', subjects: ['Business', 'Communication'], attendance: 91.5, role: 'EMPLOYEE', email: 'frank@example.com', department: 'Sales', position: 'Sales Executive' },
    { id: '9', name: 'Grace Lee', age: 27, class: 'Design', subjects: ['Design', 'Marketing', 'Branding'], attendance: 93.5, role: 'EMPLOYEE', email: 'grace@example.com', department: 'Marketing', position: 'Brand Designer' },
    { id: '10', name: 'Henry Davis', age: 34, class: 'Engineering', subjects: ['Math', 'Statistics', 'Data Science'], attendance: 87.0, role: 'EMPLOYEE', email: 'henry@example.com', department: 'Analytics', position: 'Data Analyst' },
    { id: '11', name: 'Iris Thompson', age: 30, class: 'Management', subjects: ['Finance', 'Accounting'], attendance: 95.0, role: 'EMPLOYEE', email: 'iris@example.com', department: 'Finance', position: 'Financial Analyst' },
    { id: '12', name: 'Jack Wilson', age: 36, class: 'Engineering', subjects: ['Computer Science', 'Security'], attendance: 92.5, role: 'EMPLOYEE', email: 'jack@example.com', department: 'IT', position: 'Security Engineer' },
];

export const resolvers = {
    Query: {
        employees: (parent, { page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc' }) => {
            let sortedEmployees = [...employees].sort((a, b) => {
                if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
                if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedEmployees = sortedEmployees.slice(startIndex, endIndex);

            return {
                employees: paginatedEmployees,
                totalPages: Math.ceil(sortedEmployees.length / limit),
                currentPage: page,
            };
        },
        employee: (parent, { id }) => employees.find(employee => employee.id === id),
    },
    Mutation: {
        addEmployee: (parent, { name, age, class: employeeClass, subjects, attendance }, context) => {
            if (context.role !== 'ADMIN') {
                throw new Error('Not authorized');
            }
            const newEmployee = {
                id: String(employees.length + 1),
                name,
                age,
                class: employeeClass,
                subjects,
                attendance,
                role: 'EMPLOYEE',
            };
            employees.push(newEmployee);
            return newEmployee;
        },
        updateEmployee: (parent, { id, name, age, class: employeeClass, subjects, attendance }, context) => {
            if (context.role !== 'ADMIN') {
                throw new Error('Not authorized');
            }
            const employeeIndex = employees.findIndex(employee => employee.id === id);
            if (employeeIndex === -1) {
                throw new Error('Employee not found');
            }
            const updatedEmployee = {
                ...employees[employeeIndex],
                name: name !== undefined ? name : employees[employeeIndex].name,
                age: age !== undefined ? age : employees[employeeIndex].age,
                class: employeeClass !== undefined ? employeeClass : employees[employeeIndex].class,
                subjects: subjects !== undefined ? subjects : employees[employeeIndex].subjects,
                attendance: attendance !== undefined ? attendance : employees[employeeIndex].attendance,
            };
            employees[employeeIndex] = updatedEmployee;
            return updatedEmployee;
        },
        deleteEmployee: (parent, { id }, context) => {
            if (context.role !== 'ADMIN') {
                throw new Error('Not authorized');
            }
            const employeeIndex = employees.findIndex(employee => employee.id === id);
            if (employeeIndex === -1) {
                throw new Error('Employee not found');
            }
            employees.splice(employeeIndex, 1);
            return 'Employee deleted successfully';
        },
    },
};

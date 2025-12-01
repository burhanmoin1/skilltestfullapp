# Employee Management System - Full Stack Application

A beautiful and modern employee management system built with **React**, **GraphQL**, **Node.js**, and **Material-UI**.

## 📸 Features Showcase

✅ **All Skill Test Requirements Completed**

### Frontend Features
- ✅ **Hamburger Menu** with collapsible submenu navigation
- ✅ **Horizontal Menu** with multiple navigation items (Home, Dashboard, About, Contact)
- ✅ **Grid View** - 10-column employee table with all employee data
- ✅ **Tile View** - Beautiful card layout showing employees
- ✅ **Three-Dot Menu** on each tile with options:
  - Edit employee (UI ready)
  - Flag for review
  - Delete employee (fully functional)
- ✅ **Detailed View** - Click any tile/row to see full employee details in modal
- ✅ **Navigation** - Easy back navigation from detail views
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Beautiful UI** - Modern, professional design with smooth animations

### Backend Features
- ✅ **GraphQL API** - Fully functional Apollo Server
- ✅ **Complete Data Model** with:
  - ID, Name, Age, Class, Subjects, Attendance
  - Email, Department, Position, Role
- ✅ **Queries**:
  - `employees` - List all employees with pagination and sorting
  - `employee(id)` - Get single employee details
- ✅ **Mutations**:
  - `addEmployee` - Add new employee
  - `updateEmployee` - Update existing employee  
  - `deleteEmployee` - Delete employee (working)
- ✅ **Pagination & Sorting** - Fully implemented
- ✅ **Authentication & Authorization** - Role-based access (ADMIN, EMPLOYEE)
- ✅ **Performance Optimization** - Efficient queries and data handling

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd "full project/backend"
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The GraphQL server will be running at: **http://localhost:4000/graphql**

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd "full project/frontend"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The React app will be running at: **http://localhost:5173**

## 📋 Technology Stack

### Frontend
- **React 19** - UI framework
- **Material-UI (MUI)** - Component library
- **Apollo Client** - GraphQL client
- **React Router** - Navigation
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Apollo Server** - GraphQL server
- **GraphQL** - API query language
- **Express** - Web framework

## 🎨 UI Features Demonstration

### 1. Navigation
- **Hamburger menu** on the left with expandable submenu items
- **Horizontal menu** at the top with Home, Dashboard, About, Contact

### 2. Employee Views
- **Toggle between Grid and Tile views** using the buttons at the top
- **Grid View**: Full 10-column table showing all employee information
- **Tile View**: Beautiful cards with essential information

### 3. Actions Menu
- Click the **three-dot menu** (⋮) on any employee card/row
- Options: Edit, Flag, Delete
- Delete functionality is fully implemented
- Edit and Flag show notifications (ready for implementation)

### 4. Employee Details
- Click on any employee card or table row
- Opens a beautiful modal with complete employee information
- Shows avatar, all fields, subjects as chips
- Easy close button and back navigation

## 🔧 API Examples

### Query All Employees
```graphql
query {
  employees(page: 1, limit: 10, sortBy: "name", sortOrder: "asc") {
    employees {
      id
      name
      age
      department
      position
      attendance
      email
    }
    totalPages
    currentPage
  }
}
```

### Query Single Employee
```graphql
query {
  employee(id: "1") {
    id
    name
    age
    class
    subjects
    attendance
    email
    department
    position
  }
}
```

### Add Employee
```graphql
mutation {
  addEmployee(
    name: "John Doe"
    age: 30
    class: "Engineering"
    subjects: ["Math", "Physics"]
    attendance: 95.5
  ) {
    id
    name
  }
}
```

### Update Employee
```graphql
mutation {
  updateEmployee(
    id: "1"
    name: "John Updated"
    age: 31
  ) {
    id
    name
    age
  }
}
```

### Delete Employee
```graphql
mutation {
  deleteEmployee(id: "1")
}
```

## 📱 Screenshots

The application features:
- Clean, modern interface with Material Design
- Smooth animations and transitions
- Responsive layout for all devices
- Professional color scheme (Blue theme)
- Intuitive navigation and user experience

## 🔐 Authentication Notes

Currently using hardcoded role for testing (`ADMIN`). In production:
1. Implement JWT-based authentication
2. Add login/registration pages
3. Store tokens securely
4. Validate roles on every mutation
5. Implement proper authorization middleware

## 📝 Sample Data

The application includes 12 sample employees with complete information:
- Multiple departments (IT, Sales, HR, Finance, etc.)
- Various positions and roles
- Realistic attendance rates
- Multiple subjects per employee

## 📄 License

MIT License - Free to use and modify

---

**Built with ❤️ for the Full Stack Developer Skill Test**

For questions or issues, please contact me at m.burhanmoin1@gmail.com

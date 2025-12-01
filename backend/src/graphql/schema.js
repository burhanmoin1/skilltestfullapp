import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    employees(page: Int, limit: Int, sortBy: String, sortOrder: String): EmployeePage
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(name: String!, age: Int!, class: String, subjects: [String], attendance: Float): Employee
    updateEmployee(id: ID!, name: String, age: Int, class: String, subjects: [String], attendance: Float): Employee
    deleteEmployee(id: ID!): String
  }

  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String
    subjects: [String]
    attendance: Float
    role: Role
    email: String
    department: String
    position: String
  }

  enum Role {
    ADMIN
    EMPLOYEE
  }

  type EmployeePage {
    employees: [Employee]
    totalPages: Int
    currentPage: Int
  }
`;

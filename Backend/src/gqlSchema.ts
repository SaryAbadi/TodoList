import { gql } from 'apollo-server-express';

export const schema = gql`
  type Task {
    id: Int
    name: String
    iscompleted: Boolean
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    addTask(name: String): Task
    deleteTask(id: Int): Boolean
    toggleTask(id: Int): Task
  }
`;

import { ApolloProvider } from "@apollo/client";
import './App.css';
import TodoList from './components/todoList';
import { apolloClient } from './services/apiService';



function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <TodoList/>
    </ApolloProvider>
  );
}

export default App;

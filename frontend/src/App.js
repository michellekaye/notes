import Container from '@mui/material/Container';
import Registration from './components/Registration';
import Login from './components/Login';
import './App.css';

function App() {
  return (
		<Container className="App" component="main" maxWidth="xs">
			<Login />
		</Container>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './components/Layout/Layout';
import Trainer from './containers/Trainer/Trainer';
import Team from './containers/Team/Team';
import Athlete from './containers/Athlete/Athlete';
import Schedule from './containers/Schedule/Schedule'
import Workouts from './containers/Workouts/Workouts'
import Diet from './containers/Diet/Diet'


function App() {
  return (
    <Layout>
      <Workouts />
    </Layout>
  );
}

export default App;

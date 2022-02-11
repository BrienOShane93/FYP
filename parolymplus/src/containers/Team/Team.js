import React, {useState} from 'react';

import Members from '../../components/Members/Members';

const Team = (props) => {

  const [teamState, setTeamState] = useState({
    team: [
      { 
        id: 0, name: 'Shannen',
        schedule: [{
          day: 'Monday',
          workouts: [
            { id: 0, title: 'Session 1', description: 'Description' },
            { id: 1, title: 'Session 2', description: 'Description' }
          ],
          diet: [
            { id: 0, title: 'Breakfast', description: 'Description' },
            { id: 1, title: 'Lunch', description: 'Description' },
            { id: 2, title: 'Dinner', description: 'Description' },
            { id: 3, title: 'Snacks', description: 'Description' }
          ]
        }]
      }
    ]
  });

  return (
      <Members team={teamState.team} />
  )
};

export default Team;
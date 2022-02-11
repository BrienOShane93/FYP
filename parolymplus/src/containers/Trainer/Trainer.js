import React, {useState} from 'react';

import Workouts from '../../components/Workouts/Workouts';
import Diet from '../../components/Diet/Diet';

const Team = (props) => {

  const [scheduleState, setScheduleState] = useState({
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
  	<React.Fragment>
  	  <h2><b>Member's Day Schedule</b></h2>
  	  <Workouts team={scheduleState.team} />
      <Diet team={scheduleState.team} />
    </React.Fragment>
  )
};

export default Team;
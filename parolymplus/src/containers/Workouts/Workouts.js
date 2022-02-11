import React, {useState} from 'react';

import IndividualWorkouts from '../../components/IndividualWorkouts/Workouts';

const Workouts = (props) => {

  const [scheduleState, setScheduleState] = useState({
  	team: [
      { 
      	id: 0, name: 'Shannen',
      	schedule: {
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
	    	}
  	  }
    ]
  });

  console.log(scheduleState.team[0].schedule.workouts)

  return (
  	<React.Fragment>
  	  <h2><b>Today's Plan</b></h2>
      <IndividualWorkouts team={scheduleState.team[0].schedule.workouts} />
    </React.Fragment>
  )
};

export default Workouts;
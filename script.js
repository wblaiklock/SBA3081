// The provided course information.
  const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];


  function getLearnerData(course, ag, submissions) {

    try{
      if(ag.course_id != course.id)
        throw "Error: Course ID wrong";
    } catch (error) {
      console.log(error);
      return null;
    }

    let result = [];

    let learnerIDs = getLearnerIDs(submissions);

    for(const ID of learnerIDs)
      result.push(gradeLearner(ID, submissions,ag));

    return result;
  }

  function gradeLearner(learnerID, submissions,ag)
  {
    let grades=[];
    let totalPossible = 0;
    let totalEarned = 0;

    for (const submission of submissions)
    {
      if(submission.learner_id==learnerID)
      {
          let assignment = getAssignment(submission.assignment_id,ag);       

          let possiblePoints = assignment.points_possible;
          let earnedPoints = submission.submission.score;
          let dueDate = assignment.due_at;
          let submittedDate = submission.submission.submitted_at;

          if(new Date(dueDate) <= new Date())
          {
              if(new Date(submittedDate) > new Date(dueDate))
                earnedPoints -= 15; 
                            
              let score = earnedPoints / possiblePoints;

              totalPossible+=possiblePoints;
              totalEarned+=earnedPoints;

              //add each grade
              grades[submission.assignment_id] = score;
          }
      }
      continue;
    }

    let average = totalEarned / totalPossible;

    return {id:learnerID,avg:average,assignment_id:grades};
  }

  
  function getLearnerIDs(submissions)
  {
    let IDs = [];
    
    for (const submission of submissions)
    {
      if(IDs.indexOf(submission.learner_id) == -1)
        IDs.push(submission.learner_id);
    }

    return IDs;
  }

  function getAssignment(ID, ag)
  {
    for(const assignment of ag.assignments)
    {
      if(assignment.id == ID)
        return assignment; 
    }
  }


const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
console.log(result);

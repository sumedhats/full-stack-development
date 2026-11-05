
function StudentList({ students, deleteStudent }) {
  return (
    <div>
      <h2>Student List</h2>

      {students.map((student) => (
        <p key={student.id}>
          {student.name}

          <button onClick={() => deleteStudent(student.id)}>
            Delete
          </button>
        </p>
      ))}
    </div>
  );
}

export default StudentList;

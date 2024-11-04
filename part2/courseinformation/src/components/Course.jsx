const Course = ({ course }) => {
    const totalExercises = course.parts.reduce((s, p) => {
        return s + p.exercises;
    }, 0);

    return (
        <div>
            <h2>{course.name}</h2>
            <ul>
                {course.parts.map(part => (
                    <li key={part.id}>
                        {part.name} - {part.exercises} exercises
                    </li>
                ))}
            </ul>
            <p>Total exercises: {totalExercises}</p>
        </div>
    );
};

export default Course;
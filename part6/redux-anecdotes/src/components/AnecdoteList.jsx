import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        const filterValue = filter || ''; // Fallback to empty string if filter is undefined
        return anecdotes.filter((anecdote) =>
            anecdote.content?.toLowerCase().includes(filterValue.toLowerCase()) // Ensure content is not undefined
        );
    });

    const dispatch = useDispatch();

    const vote = (id) => {
        dispatch(voteAnecdote(id));
    };

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes} votes
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdoteList;

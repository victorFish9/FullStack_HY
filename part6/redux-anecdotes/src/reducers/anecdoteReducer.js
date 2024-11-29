import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = [
  { id: '1', content: 'If it hurts, do it more often', votes: 0 },
  { id: '2', content: 'Adding manpower to a late software project makes it later!', votes: 0 },
  { id: '3', content: 'Premature optimization is the root of all evil.', votes: 0 },
];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
      state.sort((a, b) => b.votes - a.votes);
    },
    createAnecdote(state, action) {
      state.push({
        id: getId(),
        content: action.payload,
        votes: 0,
      });
      state.sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { voteAnecdote, createAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

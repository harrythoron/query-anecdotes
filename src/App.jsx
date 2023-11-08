import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecs, updateAnec } from './services/anecdotes'

const App = () => {
  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: updateAnec,
    onSuccess: (updAnc) => {
      console.log(updAnc, 'inside mutation')
      const anecs = queryClient.getQueryData(['anecs'])
      queryClient.setQueryData(['anecs'], anecs.map(anc => anc.id !== updAnc.id ? anc : updAnc))
    }
  })

  const handleVote = (anecdote) => {
    console.log(anecdote, 'before change')
    console.log({ ...anecdote, votes: anecdote.votes + 1 }, 'after change');
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })

  }

  const result = useQuery({
    queryKey: ['anecs'],
    queryFn: getAnecs,

  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isPending) {
    return <>
      app is loading...
    </>
  }

  if (result.isError) {
    return <>anecdote service not available due to problems in server</>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

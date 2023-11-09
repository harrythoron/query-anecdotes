import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecs, updateAnec } from './services/anecdotes'

import { notifiReducer } from './services/CounterContext'

import { useNotifiDispatch } from './services/CounterContext'

const App = () => {


  const queryClient = useQueryClient()
  const notifyMsgDispatch = useNotifiDispatch()

  const voteMutation = useMutation({
    // updateAnec is the axios put request and upAnc is the return response which we then manually update the state
    mutationFn: updateAnec,
    onSuccess: (updAnc) => {
      console.log(updAnc, 'inside mutation')
      const anecs = queryClient.getQueryData(['anecs'])
      queryClient.setQueryData(['anecs'], anecs.map(anc => anc.id !== updAnc.id ? anc : updAnc))
      notifyMsgDispatch({ type: "NOTIFY", payload: `anecdote '${updAnc.content}' voted`, time: 5000 })
      setTimeout(() => {
        notifyMsgDispatch({ type: "HIDE" })
      }, 5000)
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

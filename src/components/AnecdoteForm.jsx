import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnec } from "../services/anecdotes"
import { useNotifiDispatch } from "../services/CounterContext"
const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notifyMsgDispatch = useNotifiDispatch()

  const newAnecMutation = useMutation({
    mutationFn: createAnec,
    onSuccess: (newAnec) => {
      // queryClient.invalidateQueries({ queryKey: ['anecs'] })

      // to optimize performance manually update the state
      const anecs = queryClient.getQueryData(['anecs'])
      queryClient.setQueryData(['anecs'], anecs.concat(newAnec))
      notifyMsgDispatch({ type: "NOTIFY", payload: `added anecdote '${newAnec.content}'` })
      setTimeout(() => {
        notifyMsgDispatch({ type: "HIDE" })
      }, 5000);
    },
    onError: (err) => {
      console.log(err.response.data.error, 'babi')
      notifyMsgDispatch({ type: "NOTIFY", payload: err.response.data.error })
      setTimeout(() => {
        notifyMsgDispatch({ type: "HIDE" })
      }, 5000);
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecMutation.mutate({ content, votes: 0 })

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

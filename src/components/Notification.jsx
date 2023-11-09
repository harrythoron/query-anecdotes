import { useNotifiValue } from "../services/CounterContext"
const Notification = () => {
  const notifyMsg = useNotifiValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }



  return (
    <>
      {notifyMsg === '' ? null :
        <div style={style}>
          {notifyMsg}
        </div>
      }
    </>

  )
}

export default Notification

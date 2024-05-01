import { Navigate } from "react-router-dom"

function Notification() {
  return (localStorage.getItem("token") == null || localStorage.getItem("token") == '') ? <Navigate to="/" /> :
    <div>
      Email Service.
    </div>
}

export default Notification
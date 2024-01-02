import "./popUp.css"
const PopUp = ():JSX.Element => {
  return (
    <div className="popup__payment">
          <h1>ARE YOU SURE ABOUT ITS?</h1>
          <div className="popup__cart-delete-btn">
            <button>Yes</button>
            <button>No</button>
          </div>
        </div>
  )
}

export default PopUp
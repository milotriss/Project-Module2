import Detail from "../detail/detail";
import DetailsComments from "../detailsComments/detailsComments";

import "./details.css";

const Details = () => {
  return (
    <div className="overlay__detail">
      <main className="mainDetails">
        <div className="main__overlay">
            <Detail/>
            <DetailsComments/>
        </div>
      </main>
    </div>
  );
};

export default Details;

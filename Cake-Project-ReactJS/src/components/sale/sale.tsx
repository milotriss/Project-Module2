import "./sale.css";

const Sale = (): JSX.Element => {
  return (
    <section className="saleoff item__active">
      <div className="overlay">
        <div className="sale__group">
          <button className="sale1">
            <h1>Discount up to 12% off</h1>
            <h2>november special offer</h2>
            <p>Only for Birthday cake and Workshop</p>
          </button>
          <button className="sale1">
            <h1>Discount up to 25% off</h1>
            <h2>sign up and get 25% off</h2>
            <p>25% off for new member</p>
          </button>
        </div>
        <button className="btn__big">MORE SALE OFF</button>
      </div>
    </section>
  );
};

export default Sale;

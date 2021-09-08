/* eslint-disable  */
//react/prop-types
import './style.css';

const CreditCardDesign = ({ cardNo, from, to, name: CardHolder }) => (
  <>
    <div className="card" >
      <figure className="card__figure">
        <img src="https://conta.nubank.com.br/images/nu-white.png" className="card__figure--logo" alt="logo" />
      </figure>
      <div className="card__reader">
        <div className="card__reader--risk card__reader--risk-one" />
        <div className="card__reader--risk card__reader--risk-two" />
        <div className="card__reader--risk card__reader--risk-three" />
        <div className="card__reader--risk card__reader--risk-four" />
      </div>
      <p className="card__number">{cardNo}</p>
      <div className="card__dates">
        {/* <span className="card__dates--first">{from}</span> */}
        <span className="card__dates--second">{to}</span>
      </div>
      <p className="card__name">{CardHolder}</p>
      <div className="card__flag">
        <div className="card__flag--globe" />
        <div className="card__flag--red" />
        <div className="card__flag--yellow" />
      </div>
    </div>
  </>
);

export default CreditCardDesign;

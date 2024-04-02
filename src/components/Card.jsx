import "./Card.scss";

function Card({ person }) {
  const { firstname, lastname, description, image } = person;

  return (
    <div className="card">
      <img src={image} alt="avatar" />
      <p className="name">
        {firstname} {lastname}
      </p>
      <p className="description">{description}</p>
    </div>
  );
}

export default Card;

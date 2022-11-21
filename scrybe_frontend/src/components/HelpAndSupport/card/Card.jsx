/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import styles from "./Card.module.scss";

function Card({ src, header, paragrapgh }) {
  return (
    <div className={styles.card_style}>
      <div className={styles.icon}>
        <img className={styles.img} src={src} alt={header} />
      </div>

      <div className={styles.message}>
        <h1>{header}</h1>
        <p>{paragrapgh}</p>
      </div>
    </div>
  );
}

export default Card;

import styles from "./Card.module.scss";
import PropTypes from "prop-types";

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

Card.propTypes = {
  header: PropTypes.string.isRequired,
  paragrapgh: PropTypes.string.isRequired,
};

export default Card;

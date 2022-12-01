import PropTypes from "prop-types";
import AsideCard from "../AsideCard";
import styles from "./PhraseTagCard.module.scss";

function PhraseTagCard(props) {
  const { tags, title, sentimentData } = props;
  if (sentimentData.transcript) {
    //TODO: impleented stopword removal and separation of positive and negative words
  }
  return (
    <AsideCard classtype={`${styles.tags}`}>
      <div className={styles.title}>{title}</div>
      <ul className={styles.tag__items}>
        {tags.map((tag) => {
          return (
            <li key={String(Math.random()) + String(new Date().getTime())}>
              {tag}
            </li>
          );
        })}
      </ul>
    </AsideCard>
  );
}

PhraseTagCard.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  sentimentData: PropTypes.object.isRequired,
};
export default PhraseTagCard;

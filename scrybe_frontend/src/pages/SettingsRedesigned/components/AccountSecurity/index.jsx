import styles from "./AccountSecurity.module.scss";

export default function PersonalInformation() {
  const connectedApps = [];
  return (
    <div className={styles.container}>
      <div className={styles.title}>Account security</div>
      <div className={styles.subtitle}>Change passsword</div>
      <form className={styles.password__form}>
        <label htmlFor="password">
          Enter new password:
          <input type="password" placeholder="**********" />
        </label>
        <label htmlFor="passwordRetype">
          Retype password:
          <input type="password" placeholder="**********" />
        </label>
        <div className={styles.submission}>
          <button type="Submit">Save changes</button>
        </div>
        <div className={styles.subtitle}>Connected Apps</div>
        {connectedApps.length > 0 ? (
          <ul className={styles.connected__apps}>
            {connectedApps.map((item, index) => {
              return (
                <li key={index + Math.random()}>
                  <div className={styles.app__info}>
                    <div className={styles.app__name}>{item.name}</div>
                    <div className={styles.app__date}>
                      Signed in on{" "}
                      {(() => {
                        const d = new Date(Date.UTC(...item.date));
                        return (
                          String(d.getDate()) +
                          "/" +
                          String(d.getMonth()) +
                          "/" +
                          String(d.getFullYear())
                        );
                      })()}
                    </div>
                  </div>
                  <div className={styles.disconnect}>Disconnect App</div>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className={styles.connected__apps}>
            <li>
              <div className={styles.no__apps}>
                You do not have any connected Apps
              </div>
            </li>
          </ul>
        )}
      </form>
    </div>
  );
}

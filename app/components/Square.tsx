import styles from "./Square.module.css";

export function Square({ text }: { text: string }) {
  return <button className={styles.square}>{text}</button>;
}

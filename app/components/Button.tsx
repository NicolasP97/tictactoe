import styles from "./Button.module.css";

export function MyButton({ text }: { text: string }) {
  return <button className={styles.MyButton}>{text}</button>;
}

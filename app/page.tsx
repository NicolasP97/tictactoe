import React from "react";
import Link from "next/link";
import styles from "@/app/ui/landing.module.css";
import { MyButton } from "./components/Button";
import { Square } from "./components/Square";

export default function Page() {
  const randomStuff = (
    <>
      <h1>This is the Homepage</h1>
      <div className={styles.shape}>Can't click me</div>
      <MyButton text="Click me! :)" />
      <h2>Ab hier Beginnt Tictactoe</h2>
      <h5>__________________________________________________________</h5>
    </>
  );

  return (
    <main className={styles.main}>
      {randomStuff}
      <Square text="X" />
      <Square text="X" />
      <Square text="X" />
    </main>
  );
}

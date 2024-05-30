import React from "react";
import Link from "next/link";
import styles from "@/app/ui/landing.module.css";
import { Game } from "./components/Board";

export default function Page() {
  return (
    <main className={styles.main}>
      <Game />
    </main>
  );
}

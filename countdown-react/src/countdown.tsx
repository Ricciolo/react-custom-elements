import { useEffect, useState } from 'react';
import style from './countdown.module.css';

export type CountdownProps = {
  startSeconds: number;
  run: boolean;
  onChange?: (seconds: number) => void;
};

export default function Countdown(props: CountdownProps) {

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(seconds);
    }
  }, [seconds]);

  useEffect(() => {
    // Inizializzo il contatore
    setSeconds(props.startSeconds);

    if (props.run) {

      // Avvio il timer
      const interval = setInterval(() => {
        setSeconds(s => {
          // Se il contatore è arrivato a 0 fermo il timer
          if (s <= 1) {
            clearInterval(interval);
          }
          return s - 1;
        });
      }, 1000);

      // Fermo il timer in caso di cambio proprietà
      return () => clearInterval(interval);
    }
  }, [props.run, props.startSeconds]);

  return <div className={style.text}>
    Tempo rimanente: {seconds} secondi
  </div>;
}
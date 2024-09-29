import Button from './UI/Button.tsx';
import { useTimersContext } from '../store/timers-context.tsx';

export default function Header() {

  const TimersCtx = useTimersContext()

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={
        TimersCtx.isRunning ? TimersCtx.stopTimer : TimersCtx.startTimer
      }>
      {TimersCtx.isRunning?"Start":"Stop"} Timers
      </Button>
    </header>
  );
}

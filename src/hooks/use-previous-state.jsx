import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook similar to useState, but provides the previous state value as well.
 * @param {any} initialState - The initial state value.
 * @returns {[any, Function, any]} - [state, setState, previousState].
 */
export function usePreviousState(initialState) {
  const [state, setState] = useState(initialState);
  const previousRef = useRef();

  useEffect(() => {
    previousRef.current = state; 
  }, [state]);

  const previousState = previousRef.current;

  return [state, setState, previousState];
}

/**
 * Example usage of usePreviousState hook.
 * @returns {React.ReactNode}
 */
export function CounterWithPreviousState() {
  const [count, setCount, previousCount] = usePreviousState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Previous Count: {previousCount}</p>
      <button onClick={() => setCount(previousCount + 1)}>Increment</button>
      <button onClick={() => setCount(previousCount - 1)}>Decrement</button>
    </div>
  );
}
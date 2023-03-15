// v6 페이지 이탈 시 경고창 띄우는 로직
// Blocker.js
import { useContext, useEffect, useCallback } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export function useBlocker(blocker, when = true) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}


export function usePrompt(message, when = true, onOut) {
  const blocker = useCallback((tx) => {
    onOut();
    tx.retry();
  }, [message, onOut]);

  useBlocker(blocker, when);
}

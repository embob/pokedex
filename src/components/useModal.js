import { useState } from 'react';

const useModal = () => {

  // stores the current view state of the modal.
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    // changes the value of isShowing to be the opposite of what it currently is.
    setIsShowing(!isShowing);
  }

  return {
    // return these values so a component has access to them.
    isShowing,
    toggle,
  }
};

export default useModal;
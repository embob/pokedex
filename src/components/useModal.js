import { useState } from 'react';

const useModal = () => {

  // stores the current view state of the modal.
  const [isShowing, setIsShowing] = useState(false);
  const [cardClicked, setCardClicked] = useState('');

  function toggle() {
    // changes the value of isShowing to be the opposite of what it currently is.
    setIsShowing(!isShowing);
    setCardClicked('');
  }

  function setId(id) {
    // changes the value of isShowing to be the opposite of what it currently is.
    setCardClicked(id);
  }


  return {
    // return these values so a component has access to them.
    isShowing,
    toggle,
    setId,
    cardClicked
  }
};

export default useModal;
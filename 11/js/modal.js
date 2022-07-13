const HIDDEN_CLASS = 'hidden';
const BODY_CLASS = 'modal-open';

const toggleModalClasses = (modalElement) => {
  modalElement.classList.toggle(HIDDEN_CLASS);
  document.body.classList.toggle(BODY_CLASS);
};

export { toggleModalClasses };

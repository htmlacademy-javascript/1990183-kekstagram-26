const HIDDEN_CLASS = 'hidden';
const BODY_CLASS = 'modal-open';

// Добавить/удалить css-классы в разметке для показа/скрытия модального окна
const toggleModalClasses = (modalElement) => {
  modalElement.classList.toggle(HIDDEN_CLASS);
  document.body.classList.toggle(BODY_CLASS);
};

export {
  HIDDEN_CLASS,
  toggleModalClasses,
};

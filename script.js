const defaultConfig = {
    modalTriggerClass: 'open-modal',
    modalCloseClass: 'modal-close',
    modalOverlayClass: 'modal-overlay',
    modalContentClass: 'modal-content',
    modalAnimation: 'fade',
    modalAnimationDuration: 300
  };
  
  class ModalLibrary {
    constructor(config = {}) {
      this.config = { ...defaultConfig, ...config };
      this.modals = [];
      this.activeModal = null;
  
      this.init();
    }
  
    init() {
      this.modals = Array.from(document.querySelectorAll('.modal'));

      this.modals.forEach(modal => {
        const trigger = modal.querySelector(`.${this.config.modalTriggerClass}`);
        const close = modal.querySelector(`.${this.config.modalCloseClass}`);
  
        if (trigger) {
          trigger.addEventListener('click', () => this.openModal(modal));
        }
  
        if (close) {
          close.addEventListener('click', () => this.closeModal(modal));
        }
  
        modal.addEventListener('click', (event) => {
          if (event.target.classList.contains(this.config.modalOverlayClass)) {
            this.closeModal(modal);
          }
        });
      });
    }
  
    openModal(modal) {
      if (this.activeModal) {
        this.closeModal(this.activeModal);
      }
  
      modal.classList.add('active');
      this.activeModal = modal;
  
      this.triggerEvent('modalOpen', modal);
    }
  
    closeModal(modal) {
      modal.classList.remove('active');
      this.activeModal = null;
  
      this.triggerEvent('modalClose', modal);
    }
  
    addModal(modalHtml) {
      const parser = new DOMParser();
      const modalElement = parser.parseFromString(modalHtml, 'text/html').body.firstChild;
  
      this.modals.push(modalElement);
      document.body.appendChild(modalElement);
  
      this.init();
  
      this.triggerEvent('modalAdded', modalElement);
    }
  
    removeModal(modal) {
      const index = this.modals.indexOf(modal);
      if (index !== -1) {
        this.modals.splice(index, 1);
        modal.remove();
  
        this.triggerEvent('modalRemoved', modal);
      }
    }
  
    triggerEvent(eventName, modal) {
      const event = new CustomEvent(eventName, { detail: { modal } });
      window.dispatchEvent(event);
    }
  }
  const modalLibrary = new ModalLibrary();
  

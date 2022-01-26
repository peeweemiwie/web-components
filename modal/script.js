class Modal extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this._isVisible = false;
		this.shadowRoot.innerHTML = `
      <style>
        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0,0,0,0.5);
          opacity: 0;
          pointer-events: none;
          transition: opacity 300ms ease-in;
        }
        .modal {
          position: absolute;
          width: max(50vw, 30rem);
          background-color: white;
          padding: 1rem;
          left: 50%;
          top: 50%;
          transition: opacity 300ms ease-in;
          transform: translate3D(-50%, -50%, 0);
          box-shadow: 5px 5px 5px rgba(0,0,0,0.25);
          border-radius: 4px;
          opacity: 0;
          pointer-events: none
        }
        :host([opened]) .backdrop,
        :host([opened]) .modal {
          opacity: 1;
          pointer-events: all;
        }

        .title {
          border-bottom: 1px solid #333;
          padding-bottom: 1rem;
          text-align: center;
        }
        footer {
          border-top: 1px solid #333;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
          column-gap: 1rem;
        }
      </style>
      
      <div class="backdrop"></div>
      <div class="modal">
        <header>
          <h3 class="title">
            <slot name='title'>This is a title</slot>
          </h3>
        </header>
        <main>
          <p className="text">
            <slot name='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, error?</slot>
          </p>
        </main>
          <footer>
          <button class="btn-confirm">Purchase</button><button class="btn-close">cancel</button>
          </footer>
        </div>
    `;

		this._modal = this.shadowRoot.querySelector('.modal');
		this._backdrop = this.shadowRoot.querySelector('.backdrop');

		this._btnConfirm = this.shadowRoot.querySelector('.btn-confirm');
		this._btnConfirm.addEventListener('click', this._confirm.bind(this));
		this._btnClose = this.shadowRoot.querySelector('.btn-close');
		this._btnClose.addEventListener('click', this._confirm.bind(this));
		this._backdrop.addEventListener('click', this._confirm.bind(this));
	}
	hide() {
		if (this.hasAttribute('opened')) this.removeAttribute('opened');
	}
	_cancel() {
		this.hide();
	}
	_confirm() {
		this.hide();
	}
}

customElements.define('wc-modal', Modal);

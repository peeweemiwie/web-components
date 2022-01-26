class toggleDisplay extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
    <style>
      .card { display: none; }
      ::slotted(h3) {
        color: red;
      }
      ::slotted(p) {
        color: blue;
      }
    </style>
    
    <button class='btn-toggle'>Show</button>
    <div class="card">
      <h3>
        <slot name='title'>This is a section title!</slot>
      </h3>
      <p>
        <slot name='text'>lorem ipsum!</slot>
      </p>
    </div>
    `;
		this._isVisible = false;
		this._btnToggle = this.shadowRoot.querySelector('.btn-toggle');
		this._card = this.shadowRoot.querySelector('.card');
		this._btnToggle.addEventListener('click', this._toggleContent.bind(this));
	}

	_toggleContent() {
		this._isVisible = !this._isVisible;
		this._card.style.display = this._isVisible ? 'block' : 'none';
		this._btnToggle.textContent = this._isVisible ? 'Hide' : 'Show';
	}
}

customElements.define('wc-toggle-display', toggleDisplay);

class Card extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this._isVisible = false;
		this.shadowRoot.innerHTML = `
		<style>
			.card {
				border: 1px solid gray;
				padding: 1em;
				width: 30vw;
			}
		</style>
		<div class="card">
			<button>Show</button>
			<p id='info' style='display: none'>
			<slot></slot>
			</p>
  	</div>
		`;
		this._toggleBtn = this.shadowRoot.querySelector('button');
		this._infoBox = this.shadowRoot.querySelector('#info');
		this._toggleBtn.addEventListener('click', this._toggleInfoBox.bind(this));
	}

	connectedCallback() {
		if (
			this.hasAttribute('is-visible') &&
			this.getAttribute('is-visible') === 'true'
		) {
			this._isVisible = true;
			this._infoBox.style.display = 'block';
			this._toggleBtn.textContent = 'Hide';
		}
	}

	_toggleInfoBox() {
		this._isVisible = !this._isVisible;
		this._infoBox.style.display = this._isVisible ? 'block' : 'none';
		this._toggleBtn.textContent = this._isVisible ? 'Hide' : 'Show';
	}
}

customElements.define('wc-card', Card);

class Tooltip extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this._tooltipContainer;
		this._tooltipText = 'This is a default message';
		this.shadowRoot.innerHTML = `
      <style>
        .container {
          background-color: black;
          color: white;
          position: absolute;
					padding: .5em;
          z-index: 10;
					right: 0;
					bottom: 1.5em;
        }
				.icon {
					align-items: center;
					background-color: gray;
					border-radius: 50%;
					color: white;
					display: inline-flex;
					font-size: .8em;
					justify-content: center;
					height: 1.5em;
					width: 1.5em;
				}
				:host {
					position: relative;
					padding-top: 3em;
				}
				:host(.important){
					border: 1px solid red;
					background-color: var(--color-primary, #ccc); 
					//#ccc as fallback
				}
				:host-context(p){
					font-weight: 900;
				}
				::slotted(*){
					font-style: italic;
					
				}
      </style>
			<slot>Some default</slot>
			<span class='icon'>?</span>
    `;
		this._tooltipIcon = this.shadowRoot.querySelector('.icon');
		this._tooltipIcon.addEventListener(
			'mouseenter',
			this._showTooltip.bind(this),
		);
		this._tooltipIcon.addEventListener(
			'mouseleave',
			this._hideTooltip.bind(this),
		);
	}
	connectedCallback() {
		if (this.hasAttribute('message'))
			this._tooltipText = this.getAttribute('message');
	}

	_showTooltip() {
		this._tooltipContainer = document.createElement('span');
		this._tooltipContainer.classList.add('container');
		this._tooltipContainer.textContent = this._tooltipText;
		this.shadowRoot.appendChild(this._tooltipContainer);
	}

	_hideTooltip() {
		this.shadowRoot.removeChild(this._tooltipContainer);
	}
}

customElements.define('wc-tooltip', Tooltip);

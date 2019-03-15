
	class Dialog extends HTMLElement{

		constructor(titre,action)
		{
			super();
			this.titre = titre;
			this.action = action;
			this.oui = null;
			this.non = null;
			var shadow = this.attachShadow({ mode: 'open' });
            const style = document.createElement('style');
            style.textContent=
            `
            	.confirmation-background
				{
					position: fixed;
					top:0;
					left:0;
					width: 100%;
					height: 100%;
					background-color: rgba(0,0,0,0.8);
					display:none;
				}
				.confirmation
				{
					position: fixed;
					background-color: white;
					border-radius: 5px;
					top:50%;
					left:50%;
					width: 400px;
					height: 160px;
					transform: translate(-50%,-50%);
					font-family: var(--font-ubuntu);
				}
				.title
				{
					position: relative;
					left:0;
					right: 0;
					top:10px;
				}
				.title h1
				{
					margin:0;
					text-align: center;
				}
				.content
				{
					position: relative;
					left:0;
					top:0;
					right: 0;
					bottom: 0;
					text-align: center;
					font-size: 20px;
					color:#555;
				}
				.actions
				{
					position: relative;
					left:0;
					bottom: 0;
					right: 0;
					height: 40px;
					text-align: center;
				}
				.confirmation-btn
				{
					position: relative;
					width: 40%;
					font-size: 16px;
					border:none;
					outline: none;
					padding: 0.5em;
					cursor: pointer;
					color: white;
					border-radius: 5px;
					margin:0.5em;
					text-transform: uppercase;
				}
				#oui
				{
					position: relative;
					right: 0;
					background-color: #38e138;
				}
				#non
				{
					position: relative;
					left: 0;
					background-color: #ff2929;
				}
	        `;
	        shadow.appendChild(style);
	        document.body.appendChild(this);
	        return this;
		}
		connectedCallback() {
			let root = this.shadowRoot;
			let shadow = this;
			let titre = this.titre;
			let action = this.action;

			this.oui = ouiFunc;
			this.non = nonFunc;
			this.show = showFunc;
			this.close = hideFunc;
			let background;
			function createElement()
			{
				background = document.createElement('div');
				background.classList.add('confirmation-background');

				let confirmation = document.createElement('div');
				confirmation.classList.add('confirmation');

				let title = document.createElement('div');
				title.classList.add('title');
				let titleElem = document.createElement('h1');
				titleElem.innerHTML = titre.toUpperCase();
				title.appendChild(titleElem);

				let content = document.createElement('div');
				content.classList.add('content');
				let contentElem = document.createElement('p');
				contentElem.innerHTML = action;
				content.appendChild(contentElem);

				let actions= document.createElement('div');
				actions.classList.add('actions');
				let buttonOui = document.createElement('button');
				buttonOui.id = "oui";
				buttonOui.classList.add('confirmation-btn');
				buttonOui.addEventListener('click',function(){
					shadow.oui.call();
					shadow.close.call();
				});
				buttonOui.innerHTML = "oui";
				let buttonNon = document.createElement('button');
				buttonNon.id = "non";
				buttonNon.classList.add('confirmation-btn');
				buttonNon.addEventListener('click',function(){
					shadow.non.call();
					shadow.close.call();
				});
				buttonNon.innerHTML = "non";
				actions.appendChild(buttonNon);
				actions.appendChild(buttonOui);

				confirmation.appendChild(title);
				confirmation.appendChild(content);
				confirmation.appendChild(actions);

				background.appendChild(confirmation);
				root.appendChild(background);
			}
			function ouiFunc()
			{
				console.log("oui");
			}
			function nonFunc()
			{
				console.log("non");
			}
			function showFunc()
			{
				background.style.display = "block";
			}
			function hideFunc()
			{
				background.style.display = "none";
				document.body.removeChild(shadow);
			}
			createElement();
		}
	}
    customElements.define('ctom-dialog', Dialog);
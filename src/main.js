import Print from "./components/Print.svelte";
import Settings from "./components/Settings.svelte";

setInterval(() => {
	let next = document.querySelector('form > button:last-child') || document.querySelector('form > .f-delete__controls > button:last-child');
	if (next && next.textContent.indexOf('Продолжить') !== 0 && !document.querySelector('.enhanced-print')) {
		var print = new Print({
			target: next.parentElement,
			anchor: next
		});
	}
	if (!document.querySelector('.app-settings-dialog')) {
		var settings = new Settings({
			target: document.body,
		});
	}
	let accContainer = document.querySelector('.b-verification-success-multiple .jspContainer');
	if (accContainer) {
		accContainer.style = 'position:relative;';
		accContainer.classList.remove('jspContainer');
	}
}, 100);

export default app;

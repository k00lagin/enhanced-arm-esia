<script>
	import { mfc, director } from '../stores.js';
	let hidden = true;
  function toggleDialog() {
		hidden = !hidden;
	}
</script>

<style>
  .app-settings-trigger {
    position: fixed;
    right: 0;
		bottom: 0;
		top: unset;
    background-color: rgba(38, 50, 56, .2);
		border: 0;
		color: white;
		height: 32px;
		width: 32px;
		z-index: 1;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.app-settings-trigger:hover {
		background-color: rgba(38, 50, 56, .3);
	}
	.app-settings-trigger:active {
		color: rgba(255, 255, 255, .7);
	}
	.app-settings-dialog[open] {
		margin: 0;
		position: fixed;
    width: 600px;
    max-height: 800px;
		right: 0;
		bottom: 32px;
		left: unset;
		z-index: 1;
    display: flex;
    flex-flow: column nowrap;
    padding: 0;
    padding-top: 16px;
    border: 1px solid rgba(125, 125, 125, 0.2);
    box-shadow: 5px 0 5px -1px rgba(0, 0, 0, 0.2),
      0 5px 5px -1px rgba(0, 0, 0, 0.2);
	}
	.dialog-header {
		display: flex;
		font-family:Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-size:19px;
		font-weight:500;
	}

	.dialog-title {
		flex-grow: 1;
		margin: 0 0 0 16px;
	}

	.dialog__close-trigger {
		margin-left: 8px;
		margin-right: 16px;
		background-color: transparent;
		border: 0;
	}
	.main {
		padding: 0 16px 8px;
		display: flex;
		flex-flow: column nowrap;
	}
	.main textarea {
		margin-top: 4px;
		resize: none;
		height: 64px;
		padding: 4px 8px;
	}
	.main label {
		display: flex;
		flex-flow: column;
		margin-top: 8px;
	}
	h3 {
		margin: 8px 0;
	}
</style>

<button
	type="button"
	class="app-settings-trigger"
	on:click={toggleDialog}>
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
			<path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
	</svg>
</button>
<dialog class="app-settings-dialog" open={!hidden}>
	<header class="dialog-header">
		<h2 class="dialog-title">Настройки дополнений</h2>
		<button class="dialog__close-trigger icon-cross" on:click={toggleDialog}></button>
	</header>
	<div class="main">
		<h3>Автозаполнение заявлений</h3>
		<label>
			Должность, название организации
			<textarea bind:value={$mfc} placeholder="Директору МФЦ"></textarea>
		</label>
		<label>
			Руководитель в дательном падеже
			<textarea bind:value={$director} placeholder="Петрову Петру Петровичу"></textarea>
		</label>
	</div>
</dialog>

import { Component } from '@marcellejs/core';
import View from './last-data-pic.view.svelte';

export class LastDataPic extends Component {
	constructor(dataset) {
		super();
		this.title = 'lastDataPic [custom component 🤖]';
		this.dataset = dataset;
	}

	mount(target) {
		const t = target || document.querySelector(`#${this.id}`);
		if (!t) return;
		this.destroy();
		this.$$.app = new View({
			target: t,
			props: {
				title: this.title,
				dataset: this.dataset
			}
		});
	}
}

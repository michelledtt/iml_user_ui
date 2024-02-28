import { Component } from '@marcellejs/core';
import View from './review-mood.view.svelte';

export class ReviewMood extends Component {
	constructor(dataset) {
		super();
		this.title = 'reviewMood [custom component 🤖]';
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

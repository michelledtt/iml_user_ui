import '@marcellejs/core/dist/marcelle.css';
import { dataStore, wizard, dataset, datasetTable } from '@marcellejs/core';
import { lastDataPic } from './components';

const store = dataStore(
	'https://marcelle.lisn.upsaclay.fr/iml2024/api'
  );
try {
	await store.connect();
} catch (error) {
	await store.loginWithUI();
}

const wizarduser = wizard();

const trainingSet = dataset('project-images', store);
const last_input = lastDataPic(trainingSet)

wizarduser
	.page()
	.title("Track your mood")
	.description("Review your last entry")
	.use(last_input)

wizarduser.show()

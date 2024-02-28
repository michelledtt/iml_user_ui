import '@marcellejs/core/dist/marcelle.css';
import { dataStore, wizard, dataset, datasetTable } from '@marcellejs/core';
import { lastDataPic, reviewMood } from './components';

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
const last_input = lastDataPic(trainingSet);
const review_mood = reviewMood(trainingSet);

wizarduser
	.page()
	.title("Track your mood")
	.description("This is your latest entry")
	.use(last_input)
	.page()
	.title("Review your mood")
	.description("If you disagree with the model prediction, you can change the mood here. Also you can add a description about how you are feeling.")
	.use(review_mood)
	.page()
	.title("Good job tracking your mood!")
	.description("Tracking your mood can help you identify patterns, and help you understand why certain mood changes occur. Come back tomorrow to review your mood!")

wizarduser.show()

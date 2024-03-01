import '@marcellejs/core/dist/marcelle.css';
import { dataStore, wizard, dataset, datasetTable } from '@marcellejs/core';
import { lastDataPic, reviewMood } from './components';

//Connect to our database
const store = dataStore(
	'https://marcelle.lisn.upsaclay.fr/iml2024/api'
  );
try {
	await store.connect();
} catch (error) {
	await store.loginWithUI();
}

const wizarduser = wizard();

//fetch the trainingsets for the custom components
const trainingSet = dataset('project-images', store);
//create the custom components for the wizard. LastInput shows the last added entry in the data set, and the label
const last_input = lastDataPic(trainingSet);
//Review mood shows the last entry of the dataset and allows the user to change the label. It additionally allows them to add a description, which is not tied to anything yet
const review_mood = reviewMood(trainingSet);

//create the wizard UI
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

	document.querySelector('#open-wizard').addEventListener('click', () => {
		wizarduser.show();
	  });

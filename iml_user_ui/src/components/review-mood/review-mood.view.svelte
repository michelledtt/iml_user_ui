<script>
  import { ViewContainer } from '@marcellejs/design-system';
  import { onMount } from 'svelte';
  export let title;
  export let dataset;

  //the possible moods that the user can choose from
  let moods = { happy: false, sad: false, angry: false };
  function changeMood(mood) {
    //changes the other mood to false if one was selected. 
		if(mood == "happy") {
      moods.happy = true;
      moods.sad = false;
      moods.angry = false;
    }
    if(mood == "sad") {
      moods.happy = false;
      moods.sad = true;
      moods.angry = false;
    }
    if(mood == "angry") {
      moods.happy = false;
      moods.sad = false;
      moods.angry = true;
    }
    //updates the label, also in the database
    lastInstance.y = mood;
    dataset.update(lastInstance.id, lastInstance)
    console.log(moods);
	}

    let userInput = ''; 

    // Function to handle changes in the text box input
    function handleInput(event) {
      userInput = event.target.value; 
    }

  let lastInstance = null;
  async function initialize() {
    //fetches the dataset and transforms it into an array   
    await dataset.ready;
    const itemsArray = await dataset.items().take(dataset.length).toArray();
    //takes the last entry of the data set to show
    if (itemsArray.length > 0) {
      lastInstance = itemsArray[itemsArray.length - 1];
      changeMood(lastInstance.y)
      console.log(lastInstance);
    }
  }

  onMount(() => {
    initialize();
  });
</script>

<ViewContainer {title}>
  <div class="container">
    <div class="item">
    {#if lastInstance}
        <!-- component with thumbnail-->
        <div class="thumbnail-container">
          <img src={lastInstance.thumbnail} alt="" />
        </div>
        <span>Today I'm feeling</span>
         <!-- buttons that allows the user to change the label-->
        <div class= "button-group">
          <button class:selected={moods.happy == true} on:click={() => changeMood("happy")}> Happy </button>
          <button class:selected={moods.sad == true} on:click={() => changeMood("sad")}> Sad </button>
          <button class:selected={moods.angry == true} on:click={() => changeMood("angry")}> Angry </button>
        </div>
        <!-- description box that allows the user to add an entry-->
          <textarea type="text" bind:value={userInput} on:input={handleInput}  placeholder="How come?" />
    {:else}
    <!-- if its not yet loaded, it shows a loading screen-->
      <span>Loading...</span>
    {/if}

  </div>
  </div>
</ViewContainer>

<style>
  /* style sheet for review-mood component. It defines the container, the item that includes the thumbnail, the label, and the button group and a description box, and all of the styles of the just named components.*/
  .container {
    display: flex;
    flex-wrap: wrap;
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 200px;
    margin-right: 200px;
  }
  .thumbnail-container {
    max-width: 200px; 
    max-height: 200px; 
    overflow: hidden; 
  }
  .button-group {
    flex-direction: row;
  }
  button {
    font-weight: normal; 
    margin-top: 5px;
    margin-bottom: 5px;
  }

  button.selected {
    font-weight: bold; 
    margin-top: 5px;
    margin-bottom: 5px;
  }

  textarea {
    width: 250px;
    height: 150px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px; 
    vertical-align: top;
    resize: none; 
    font-family: "Arial", sans-serif;
  }

  span{
    margin-top: 5px;
    width: 250px;
  }
</style>
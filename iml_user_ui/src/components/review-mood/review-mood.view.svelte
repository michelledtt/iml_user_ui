<script>
  import { ViewContainer } from '@marcellejs/design-system';
  import { onMount } from 'svelte';
  export let title;
  export let dataset;

  let moods = { happy: false, sad: false, angry: false };
  function changeMood(mood) {
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
    await dataset.ready;
    const itemsArray = await dataset.items().take(dataset.length).toArray();
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
        <div class="thumbnail-container">
          <img src={lastInstance.thumbnail} alt="" />
        </div>
        <span>Today I'm feeling</span>
        <div class= "button-group">
          <button class:selected={moods.happy == true} on:click={() => changeMood("happy")}> Happy </button>
          <button class:selected={moods.sad == true} on:click={() => changeMood("sad")}> Sad </button>
          <button class:selected={moods.angry == true} on:click={() => changeMood("angry")}> Angry </button>
        </div>
          <textarea type="text" bind:value={userInput} on:input={handleInput}  placeholder="How come?" />
    {:else}
      <span>Loading...</span>
    {/if}

  </div>
  </div>
</ViewContainer>

<style>
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
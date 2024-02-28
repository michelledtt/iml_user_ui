<script>
  import { ViewContainer } from '@marcellejs/design-system';
  import { onMount } from 'svelte';
  export let title;
  export let dataset;

  let lastInstance = null;

  async function initialize() {
    await dataset.ready;
    const itemsArray = await dataset.items().take(dataset.length).toArray();
    if (itemsArray.length > 0) {
      lastInstance = itemsArray[itemsArray.length - 1];
      console.log(lastInstance);
    }
  }

  let user = { review: false };
  function review() {
		user.review = !user.review;
    console.log("review clicked")
	}

  onMount(() => {
    initialize();
  });
</script>

<ViewContainer {title}>
  <div class="container">
    {#if lastInstance}
      <div class="item">
        <div class="thumbnail-container">
          <img src={lastInstance.thumbnail} alt="" />
        </div>
        <p><b>Prediction from the model:</b> {lastInstance.y}</p>
        <button on:click={review}> Review </button>
      </div>
    {:else}
      <p>No data available</p>
    {/if}
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
    margin-left: 15px;
  }
  .thumbnail-container {
    max-width: 200px; 
    max-height: 200px; 
    overflow: hidden; 
  }

  .label {
    text-align: center;
    background-color: cornflowerblue;
    color: white;
  }
</style>
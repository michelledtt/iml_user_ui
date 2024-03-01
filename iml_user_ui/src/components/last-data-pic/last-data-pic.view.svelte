<script>
  import { ViewContainer } from '@marcellejs/design-system';
  import { onMount } from 'svelte';
  export let title;
  export let dataset;

  let lastInstance = null;

  async function initialize() {
    //fetches the dataset and transforms it into an array
    await dataset.ready;
    const itemsArray = await dataset.items().take(dataset.length).toArray();
    //takes the last entry of the data set to show
    if (itemsArray.length > 0) {
      lastInstance = itemsArray[itemsArray.length - 1];
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
    <!-- component with thumbnail and ml prediction-->
    {#if lastInstance}
        <div class="thumbnail-container">
          <img src={lastInstance.thumbnail} alt="" />
        </div>
        <p><b>Prediction from the model:</b> {lastInstance.y}</p>
    {:else}
    <!-- if its not yet loaded, it shows a loading screen-->
      <span>Loading...</span>
    {/if}
  </div>
  </div>
</ViewContainer>

<style>
  /* style sheet for last-data-pic component. It defines the container, the item that includes the thumbnail and the ml prediction, and the thumbnail.*/
  .container {
    display: flex;
    flex-wrap: wrap;
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 250px;
    margin-right: 250px;
  }
  .thumbnail-container {
    max-width: 200px; 
    max-height: 200px; 
    overflow: hidden; 
  }

  span{
    margin-top: 5px;
    width: 150px;
  }
</style>
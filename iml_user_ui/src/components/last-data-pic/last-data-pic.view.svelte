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
        <p><b>Prediction from the model:</b> {lastInstance.y}</p>
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
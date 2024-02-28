<script>
  import { ViewContainer } from '@marcellejs/design-system';
  import { onMount } from 'svelte';
  export let title;
  export let dataset;

  let someItems = [];
async function initialize() {
  await dataset.ready;
  someItems = await dataset.items().take(1).toArray();
  console.log(someItems);
}

  onMount(() => {
    initialize();
  });
</script>

<ViewContainer {title}>
  <div class="container">
    {#each someItems as instance}
      <div class="item">
        <img src={instance.thumbnail} alt="" />
      </div>
    {/each}
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
    margin-left: 15px;
  }

  .label {
    text-align: center;
    background-color: cornflowerblue;
    color: white;
  }
</style>
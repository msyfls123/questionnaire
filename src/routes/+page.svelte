<script lang='ts'>
    import type { PageProps } from "./$types";
    let { data }: PageProps = $props();
    let count = $state(data.count);

    function addCount () {
        fetch('/api/add', { method: 'POST' })
            .then(res => res.json())
            .then(res => {
                count = res.count
            })
    }
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<p>Count: {count}</p>
<button onclick={addCount}>Add</button>
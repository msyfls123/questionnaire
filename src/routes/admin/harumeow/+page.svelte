<script lang='ts'>
    import { getPersonById } from "$lib/people";
    import { getQuestionById } from "$lib/question";
    import type { PageProps } from "./$types";
    const { data }: PageProps = $props();
    const answers = $derived(Object.values(data.store ?? {}).flatMap((item) => Object.values(item)))
</script>

<svelte:head>
    <title>汇总表</title>
</svelte:head>

{#snippet singleRating(title: string, value: string)}
    <div class="">
        <div class="bg-cyan-700 text-white px-2">{title}</div>
        <div class="bg-cyan-200 text-cyan-800 px-2">{value}</div>
    </div>
{/snippet}

<main>
    {#if data.store}
        <div class=''>
            {#each data.peopleWithHash as person}
                <div class='person-box border border-emerald-600 flex flex-col'>
                    <div class="flex ">
                        <div class="flex-none w-30">{person.name}: {person.id}</div>
                        <div class="space-y-2 py-2">
                            {#each answers.filter(({ target }) => target === person.id) as answer}
                                <div class="">
                                    {@render singleRating('评价人', `${getPersonById(answer.current)?.name ?? '未知用户'} (${answer.current})`)}
                                    <div class='grid grid-cols-5 gap-1'>
                                        {#each Object.entries(answer.normalAnswers) as [id, score]}
                                        {@render singleRating(getQuestionById(id)?.question ?? '', score.toString())}
                                        {/each}
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                    <a href={`/question/${person.hash}`} class="self-end underline underline-offset-5 p-2 hover:text-orange-700">问卷链接</a>
                </div>
            {/each}
        </div>
    {:else }
    <div>还没有数据</div>
    {/if}
</main>
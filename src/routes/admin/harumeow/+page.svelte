<script lang='ts'>
    import { Badge } from "$lib/components/ui/badge";
    import { Button } from "$lib/components/ui/button"
    import { getPersonById } from "$lib/people";
    import { getQuestionById, type PersonAnswer } from "$lib/question";
    import { getWeightedMean, sum } from "$lib/statistics";
    import type { PageProps } from "./$types";
    import { resolve } from '$app/paths';
    import { invalidateAll } from '$app/navigation'
    import { toast } from "svelte-sonner";

    const { data }: PageProps = $props();
    const answers = $derived(Object.values(data.store ?? {}).flatMap((item) => Object.values(item)))

    const handleClear = (personId: string, target: string) => {
        if (!window.confirm(`确认清除 [${getPersonById(personId).name}] 对 [${getPersonById(target).name}] 的评价？`)) return
        const formData = new FormData()
        formData.append('personId', personId)
        formData.append('target', target)
        fetch(resolve("/api/clear"), {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                toast.success('提交成功', {
                    position: 'top-left'
                });
                invalidateAll();
            });
    }
</script>

<svelte:head>
    <title>汇总表</title>
</svelte:head>

{#snippet singleRating(title: string, value: string)}
    <div class="">
        <div class="bg-emerald-700 text-white px-2">{title}</div>
        <div class="text-emerald-800 px-2">{value}</div>
    </div>
{/snippet}

{#snippet statistics(list: PersonAnswer[])}
    {@const result = getWeightedMean(list)}
    <div class="py-1">
        主管评分：<Badge variant="destructive">{result.adminScore}</Badge>
        组员评分：<Badge variant="destructive">{result.normalScores.join(', ')}</Badge>
        有效组员评分：<Badge variant="destructive">{result.slicedScores.join(', ')}</Badge>
        <br/>
        加权评分：{result.adminScore} * 0.4 + ({result.slicedScores.join(' + ')}) / {result.slicedScores.length} * 0.6 = <Badge variant="destructive" class="text-xl py-0.5 h-auto">{result.mean}</Badge>
    </div>
{/snippet}


<main>
    {#if data.store}
        <div class=''>
            {#each data.peopleWithHash as person}
                {@const currentAnswers = answers.filter(({ target }) => target === person.id)}
                <div class='person-box border border-emerald-600 flex flex-col'>
                    <div class="flex ">
                        <div class="flex-none w-30">{person.name}: {person.id}</div>
                        <div class="space-y-2 py-2">
                            {#each currentAnswers as answer}
                                <div class="bg-emerald-200">
                                    {@render singleRating('评价人', `${getPersonById(answer.current)?.name ?? '未知用户'} (${answer.current})`)}
                                    <div class='grid grid-cols-5 gap-1'>
                                        {#each Object.entries(answer.normalAnswers) as [id, score]}
                                        {@render singleRating(getQuestionById(id)?.question ?? '', score.toString())}
                                        {/each}
                                    </div>
                                    <Badge class="m-2" variant="secondary">总分：{sum(Object.values(answer.normalAnswers))}</Badge>
                                    <Button size="xs" variant="destructive" onclick={() => handleClear(answer.current, answer.target)}>清除</Button>
                                </div>
                            {/each}
                        </div>
                    </div>
                    <div class="flex justify-between">
                        {@render statistics(currentAnswers)}
                        <a href={resolve(`/question/${person.hash}`)} class="self-end underline underline-offset-5 p-2 hover:text-orange-700">问卷链接</a>
                    </div>
                </div>
            {/each}
        </div>
    {:else }
    <div>还没有数据</div>
    {/if}
</main>
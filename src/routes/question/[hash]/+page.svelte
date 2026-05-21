<script lang="ts">
    import { getNormalQuestions, getTargetQuestion } from "$lib/question";
    import type { PageProps } from "./$types";

    const { data }: PageProps = $props();

    let target = $state(null);

    const targetQuestion = getTargetQuestion(data.person.id);

    const normalQuestions = $derived.by(() => {
        if (!target) return null;

        return getNormalQuestions(target);
    });

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        if (!target) return;
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        formData.append("target", target);
        formData.append("personId", data.person.id);
        fetch("/api/submit", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    };
</script>

<svelte:head>
    <title>评价表</title>
</svelte:head>

<h1>Hello, {data.person.name}</h1>

<form
    class="space-y-2 p-4 bg-amber-400"
    onsubmit={handleSubmit}
    action="/api/add"
>
    <fieldset>
        <label
            >选择你打分的人
            <select bind:value={target} required>
                {#each targetQuestion as target}
                    <option value={target.id}>{target.name}</option>
                {/each}
            </select>
        </label>
    </fieldset>

    {#if normalQuestions}
        {#each normalQuestions as question}
            <fieldset class="my-4">
                <label>{question.question}</label>
                <p class="grid grid-cols-3 gap-2">
                    {#each question.answerOptions as answer}
                        <label class="p-2 bg-black/10 space-x-2">
                            <input
                                name={question.id}
                                type="radio"
                                value={answer.score}
                                required
                            />
                            <span>{answer.label}({answer.score})</span>
                        </label>
                    {/each}
                </p>
            </fieldset>
        {/each}
    {/if}

    <button type="submit" class="rounded p-2 border">提交</button>
</form>

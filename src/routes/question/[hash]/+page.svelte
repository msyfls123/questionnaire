<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import { Button } from "$lib/components/ui/button";
    import { getNormalQuestions, getTargetQuestion } from "$lib/question";
    import { toast } from "svelte-sonner";
    import type { PageProps } from "./$types";
    import { Select, SelectContent, SelectItem, SelectTrigger } from "$lib/components/ui/select";
    import { resolve } from '$app/paths';
    import { Badge } from "$lib/components/ui/badge";

    const { data }: PageProps = $props();

    let target = $state<string | undefined>(undefined);
    let forceEdit = $state(false);
    let formEl: HTMLFormElement;

    let allowEdit = $derived.by(() => {
        const foundAnswersInStore = target && data.answers?.[target]
        return !foundAnswersInStore || forceEdit
    })

    const targetOptions = $derived(getTargetQuestion(data.person.id));

    const normalQuestions = $derived.by(() => {
        if (!target) return null;

        return getNormalQuestions(target);
    });

    const normalAnswers = $derived.by(() => {
        if (!target) return null;
        return data.answers?.[target]
    })

    const handleRefill = () => {
        forceEdit = true
        formEl.reset();
    }

    $effect(() => {
        if (!allowEdit) formEl.reset();
    })

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        if (!target) return;
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        formData.append("target", target);
        formData.append("personId", data.person.id);
        fetch(resolve("/api/submit"), {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                toast.success('提交成功');
                invalidateAll();
                forceEdit = false;
            });
    };
</script>

<svelte:head>
    <title>评价表</title>
</svelte:head>

<h1>Hello, {data.person.name}</h1>

<div
    class="space-y-2 p-4 bg-slate-50"
>
    <fieldset>
        <label class="flex space-x-4 items-center">
            <span>选择被评价对象</span>
            <Select type="single" bind:value={target} required onValueChange={() => {
                forceEdit = false
            }}>
                <SelectTrigger>
                    {targetOptions.find(({ id }) => id === target)?.name ?? '请选择'}
                </SelectTrigger>
                <SelectContent>
                    {#each targetOptions as person}
                        <SelectItem value={person.id}>
                            {person.name}
                            {#if data.answers?.[person.id]}
                            <Badge variant="destructive" class="px-1 font-mono">已填</Badge>
                            {/if}
                        </SelectItem>
                    {/each}
                </SelectContent>
            </Select>
        </label>
    </fieldset>

    <form
        onsubmit={handleSubmit}
        bind:this={formEl}
    >
    {#if normalQuestions}
        {#each normalQuestions as question}
            <fieldset
                disabled={!allowEdit}
                class={[!allowEdit && 'opacity-15', 'my-4 group/field']}
            >
                <label>{question.question}</label>
                <p class="grid grid-cols-3 gap-2">
                    {#each question.answerOptions as answer}
                        <label class={[
                            "p-2 bg-black/10 space-x-2",
                            answer.score === normalAnswers?.normalAnswers[question.id] && 'bg-blue-200'
                        ]}>
                            <input
                                name={question.id}
                                type="radio"
                                class="group-disabled/field:cursor-not-allowed"
                                value={answer.score}
                                required
                                defaultchecked={answer.score === normalAnswers?.normalAnswers[question.id]}
                            />
                            <span>{answer.label}({answer.score})</span>
                        </label>
                    {/each}
                </p>
            </fieldset>
        {/each}
    {/if}

    <fieldset class="space-x-4">
    {#if !allowEdit}
    <Button type="button" onclick={handleRefill} variant="destructive">重新填</Button>
    {:else if target}
    <Button  type="submit" >提交</Button>
    {/if}
    </fieldset>
</form>
</div>
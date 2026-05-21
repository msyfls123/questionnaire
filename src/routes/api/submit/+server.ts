import type { RequestHandler } from './$types';
import { saveTargetAnswer } from '$lib/store';
import { json } from '@sveltejs/kit';
import type { PersonAnswer } from '$lib/question';

export const POST: RequestHandler = async ({ request }) => {
     const data = await request.formData();
     const personId = data.get('personId') as string
     const target = data.get('target') as string
     if (!personId || !target) {
        return json({
            r: 1
        })
     }
     const answers = Array.from(data.entries())
        .filter(([key]) => !['personId', 'target'].includes(key))
        .reduce((acc, [key, value]) => ({
            ...acc,
            [key]: value as unknown as number
        }), {} as PersonAnswer['normalAnswers']);
     try {
        await saveTargetAnswer(personId, target, answers)
        return json({
            r: 0,
            success: 1,
        })
    } catch (err: any) {
        return json({
            r: 1,
            err: JSON.stringify(err.stack)
        })
    }
} ;
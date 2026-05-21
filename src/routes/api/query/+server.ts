import { getPersonAnswersByHash } from '$lib/hash';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


export const POST: RequestHandler = async ({ request }) => {
    const data = await request.formData();

    const currentHash = data.get('currentHash');
    const result = await getPersonAnswersByHash(currentHash as string)
    return json(result)
}
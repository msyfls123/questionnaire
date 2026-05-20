import { addCount } from '$lib/count'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
        return json({
            count: addCount()
        })
} ;
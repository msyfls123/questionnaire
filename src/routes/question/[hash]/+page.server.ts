import { getPersonAnswersByHash } from '$lib/hash'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
    const result = await getPersonAnswersByHash(params.hash)

    if (!result.person) {
        redirect(301, '/')
    }

    return {
        hash: params.hash,
        person: result.person,
        answers: result.answers,
    }
}
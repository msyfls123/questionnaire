import { PEOPLE_WITH_HASH } from '$lib/hash';
import { getStore } from '$lib/store'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
    const store = await getStore();
    const peopleWithHash = PEOPLE_WITH_HASH;
    return {
        store,
        peopleWithHash,
    }
}
import type { PageServerLoad } from './$types';
import { getCount } from '$lib/count';

export const load: PageServerLoad = ({ params }) => {
	return {
        count: getCount(),
	};
};
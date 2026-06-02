import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { clearSingle } from '$lib/store';


export const POST: RequestHandler = async ({ request }) => {
  const data = await request.formData();
  const personId = data.get('personId') as string
  const target = data.get('target') as string
  
  if (!personId || !target) {
     return json({
         r: 1,
         err: 'no target'
     })
  }

  try {
    await clearSingle(personId, target)
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
}
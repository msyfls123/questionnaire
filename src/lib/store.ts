import fs from 'fs'
import path from 'path'
import type { AnswerStore, PersonAnswer } from './question';
import type { Person } from './people';

const storePath = path.join('./store/data.json')

export const getStore = async () => {
    try {
        const data = await fs.promises.readFile(storePath, 'utf8')
        return JSON.parse(data) as AnswerStore
    } catch (err) {
        return null;
    }
}

const saveStore = async (personId: string, payload: Partial<AnswerStore[Person['id']]>) => {
    const store = await getStore();
    if (!store) throw new Error('store is not found' + storePath);
    const newStore = {
        ...store,
        [personId]: {
            ...store[personId],
            ...payload,
        }
    }
    await fs.promises.writeFile(storePath, JSON.stringify(newStore, null, 2), 'utf-8')
}

export async function getPersonAnswers(personId: string) {
    const obj = await getStore();
    return obj && obj[personId]
}

export async function saveTargetAnswer (personId: string, targetId: string, answer: PersonAnswer['normalAnswers']) {
    return saveStore(personId, {
        [targetId]: {
            target: targetId,
            current: personId,
            normalAnswers: answer,
        }
    })
}
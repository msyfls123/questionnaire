import { createHash } from 'crypto'
import { PEOPLE } from './people'
import { getPersonAnswers } from './store'

const SALT = 'harumeow-'

export const getHash = (text: string) => {
    return createHash('sha256').update(SALT + text).digest('hex').slice(0, 10)
}

export const PEOPLE_WITH_HASH = PEOPLE.map((person) => ({
    ...person,
    hash: getHash(person.id)
}))

export const getPersonAnswersByHash = async (currentHash: string) => {
    const currentPerson = PEOPLE_WITH_HASH.find(({ hash }) => hash === currentHash)

    if (!currentPerson) {
        return {
            person: null,
            answers: null,
        }
    }

    const personAnswers = await getPersonAnswers(currentPerson.id);
    return {
        person: currentPerson,
        answers: personAnswers
    }
}
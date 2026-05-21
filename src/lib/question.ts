import { PEOPLE, type Person, Title } from "./people";

interface Answer {
    score: number;
    label: string;
}

interface NormalQuestion {
    id: string;
    question: string;
    answerOptions: Answer[]
}

export interface PersonAnswer {
    current: string;
    target: string;
    normalAnswers: Record<NormalQuestion['id'], Answer['score']>
}

export type AnswerStore = Record<Person['id'], Record<Person['id'], PersonAnswer>>

const TITLE_QUESTIONS_MAP: Record<Title, NormalQuestion[]> = {
    [Title.Interactive]: [
        {
            id: 'interactive-0',
            question: '你干的舒服吗',
            answerOptions: [
                { score: 0, label: '非常不舒服'},
                { score: 1, label: '有点不舒服'},
                { score: 2, label: '一般'},
            ]
        },
        {
            id: 'interactive-1',
            question: '你钱拿的舒服吗',
            answerOptions: [
                { score: 0, label: '非常不舒服'},
                { score: 1, label: '有点不舒服'},
                { score: 2, label: '一般'},
            ]
        },
    ],
    [Title.Visual]: [
        {
            id: 'visual-0',
            question: '你 AI 用的舒服吗',
            answerOptions: [
                { score: 0, label: '非常不舒服'},
                { score: 1, label: '有点不舒服'},
                { score: 2, label: '一般'},
            ]
        },
        {
            id: 'visual-1',
            question: '你 AI 画的舒服吗',
            answerOptions: [
                { score: 0, label: '非常不舒服'},
                { score: 1, label: '有点不舒服'},
                { score: 2, label: '一般'},
            ]
        },
    ]
} 

export const getTargetQuestion = (personId: string) => {
    return PEOPLE.filter(({ id, isAdmin }) => id !== personId && !isAdmin)
}

export const getNormalQuestions = (personId: string) => {
    const person = PEOPLE.find(({ id }) => id === personId)
    if (person) {
        return TITLE_QUESTIONS_MAP[person.title]
    }
}

export const getQuestionById = (target: string) => {
    return Object.values(TITLE_QUESTIONS_MAP).flat().find(({ id }) => id === target)
}
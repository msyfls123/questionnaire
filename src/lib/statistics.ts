import { ADMIN_IDS } from "./people";
import type { PersonAnswer } from "./question";

export const sum = (list: number[]) => list.reduce((acc, v) => acc + v, 0);

export const getWeightedMean = (answers: PersonAnswer[]) => {
    const adminAnswers = answers.filter(({ current }) => ADMIN_IDS.includes(current))
    const adminScore = adminAnswers.length ? sum(adminAnswers.flatMap(({ normalAnswers }) => Object.values(normalAnswers))) / adminAnswers.length
                                           : 0;

    const normalScores = answers
        .filter(({ current }) => !ADMIN_IDS.includes(current))
        .map(({ normalAnswers }) => sum(Object.values(normalAnswers)))
    const sortedScores = [...normalScores].sort((a, b) => a - b)
    const slicedScores = sortedScores.slice(1, -1)
    const slicedMean = slicedScores.length ? sum(slicedScores) / slicedScores.length : 0

    const mean = adminScore * 0.4 + slicedMean * 0.6

    return {
        adminScore,
        normalScores,
        slicedScores,
        mean,
    }
}
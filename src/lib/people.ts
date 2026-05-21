export enum Title {
    Visual = 0,
    Interactive = 1,
}

export interface Person {
    id: string;
    name: string;
    title: Title;
    isAdmin: boolean
}

export const PEOPLE: Person[] = [
    { id: '0', name: '阮鲤鱼', title: Title.Interactive, isAdmin: true },
    { id: '1', name: '吴青衡', title: Title.Interactive, isAdmin: false },
    { id: '2', name: '汪舒乐', title: Title.Visual, isAdmin: false },
    { id: '3', name: '徐伟斌', title: Title.Interactive, isAdmin: false },
    { id: '4', name: '柴帧荣', title: Title.Visual, isAdmin: false },
    { id: '5', name: '康泰', title: Title.Visual, isAdmin: false },
    { id: '6', name: '王泽', title: Title.Visual, isAdmin: false },
    { id: '7', name: '柯庭兰', title: Title.Visual, isAdmin: false },
]

export const getPersonById = (targetId: string) => {
    return PEOPLE.find(({ id }) => id === targetId)
}
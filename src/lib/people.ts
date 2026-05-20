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
    { id: '2', name: '汪舒乐', title: Title.Visual, isAdmin: false }
]
import { PEOPLE, type Person, Title } from "./people";

interface Answer {
    score: number;
    label: string;
}

interface NormalQuestion {
    id: string;
    question: string;
    description: string;
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
            question: '业务理解与分析——方案有效性评价（业务目标有效性）',
            description: '业务目标有效性（4分）：业务场景、用户、业务问题、业务目标是否清晰？',
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '略为符合'},
                { score: 2, label: '基本符合'},
                { score: 3, label: '符合'},
                { score: 4, label: '非常符合'},
            ]
        },
        {
            id: 'interactive-1',
            question: '业务理解与分析——方案有效性评价设计（目标有效性）',
            description: '设计目标有效性（4分）：设计目标和策略是否清晰、逻辑合理？',
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '略为符合'},
                { score: 2, label: '基本符合'},
                { score: 3, label: '符合'},
                { score: 4, label: '非常符合'},
            ]
        },
        {
            id: 'interactive-2',
            question: '业务理解与分析——方案有效性评价设计（设计方案有效性）',
            description: '设计方案有效性（4分）：设计方案是否解决了业务问题？',
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '略为符合'},
                { score: 2, label: '基本符合'},
                { score: 3, label: '符合'},
                { score: 4, label: '非常符合'},
            ]
        },
        {
            id: 'interactive-3',
            question: '设计方案——专业性评价（易用性：框架布局）',
            description: `框架布局（4分）：
            1. 导航模式及其分组、排序合理，符合用户认知，用户能够快速找到目标内容；
            2.页面布局清晰，引导明确，且有较强拓展性；
            3. 页面信息提炼完整，易理解，能够体现信息优先级关系及关联性；
            4.当前位置路径易识别，页面跳转关系正确`,
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '略为符合'},
                { score: 2, label: '基本符合'},
                { score: 3, label: '符合'},
                { score: 4, label: '非常符合'},
            ]
        },
        {
            id: 'interactive-4',
            question: '设计方案——专业性评价（易用性：操作效率）',
            description: '操作效率（4分）：最大限度减少不必要的操作，减少用户思考时间，有效降低误操作概率，保障用户高效完成操作任务',
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '略为符合'},
                { score: 2, label: '基本符合'},
                { score: 3, label: '符合'},
                { score: 4, label: '非常符合'},
            ]
        },
        {
            id: 'interactive-5',
            question: '设计方案——专业性评价（易用性：学习成本）',
            description: `学习成本（4分）：
            1.界面信息/操作方式认知代价低；
            2.为用户提供必要的操作引导，协助用户顺利完成操作任务；
            3.界面使用词汇用语熟悉易懂，专业词汇提供注释说明，界面可读性强（如数据可视化，重点信息提炼等）。`,
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '略为符合'},
                { score: 2, label: '基本符合'},
                { score: 3, label: '符合'},
                { score: 4, label: '非常符合'},
            ]
        },
        {
            id: 'interactive-6',
            question: '设计方案——专业性评价（友好性：操作反馈）',
            description: `操作反馈（4分）： 
            1.提供必要的操作反馈，有效帮助用户感知操作结果；
            2.提示信息明确易懂，符合HUI文案书写规范；
            3.反馈信息形式合理、及时且符合用户预期，能够减少不必要的错误，满足用户控制感，减少不确定性给用户的负面情绪；`,
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '略为符合'},
                { score: 2, label: '基本符合'},
                { score: 3, label: '符合'},
                { score: 4, label: '非常符合'},
            ]
        },
        {
            id: 'interactive-7',
            question: '设计方案——专业性评价（友好性：人性化帮助）',
            description: `人性化帮助（2分）：1. 对用户容易产生困惑的信息给合理的提示帮助（如一次性提示、常驻提示帮助文档），帮助方式以用户任务为核心且有效、合理，体验良好。`,
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '符合'},
                { score: 2, label: '非常符合'},
            ]
        },
        {
            id: 'interactive-8',
            question: '设计方案——专业性评价（一致性）',
            description: `一致性（2分）：
            1. 层级架构、操作方式、状态显示、提示文案、反馈用语等完全一致且易理解；
            2. 遵循HUI、BUI设计规范；
            3.交互方式与业界标准完全一致。`,
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '符合'},
                { score: 2, label: '非常符合'},
            ]
        },
        {
            id: 'interactive-9',
            question: '设计方案——专业性评价（创新性）（加分项）',
            description: `深入挖掘体验层面的需求，有较大设计突破或设计亮点 ，体验超出用户期望，达到或超越行业内高标准。
            没有创新（0分）；在思路/体验/工具使用等方面有局部创新（1~3分）；有明显的创新亮点（4~5分）`,
            answerOptions: [
                { score: 0, label: '0'},
                { score: 1, label: '1'},
                { score: 2, label: '2'},
                { score: 3, label: '3'},
                { score: 4, label: '4'},
                { score: 5, label: '5'},
            ]
        },
        {
            id: 'interactive-10',
            question: '设计方案——专业性评价（成果物规范）（减分项）',
            description: `1.成果物归档内容完整、命名正确；
            2.成果物使用正确的屏幕分辨率，结构清晰、完整；
            3.页面内注释清晰、充分。
            存在一个问题点扣1分`,
            answerOptions: [
                { score: 0, label: '0'},
                { score: -1, label: '-1'},
                { score: -2, label: '-2'},
                { score: -3, label: '-3'},
                { score: -4, label: '-4'},
                { score: -5, label: '-5'},
            ]
        },
        {
            id: 'interactive-11',
            question: '设计表达——方案表达清晰度',
            description: `是否能基于陈述内容，清晰了解业务、用户、问题、设计解决思路、亮点，和对业务的价值？
            完全听不懂（0分）；基本能听懂（1~3分）；思路清晰、重点突出（5~6分）；引人入胜、感染力强（8分）`,
            answerOptions: [
                { score: 0, label: '0'},
                { score: 1, label: '1'},
                { score: 2, label: '2'},
                { score: 3, label: '3'},
                { score: 4, label: '4'},
                { score: 5, label: '5'},
                { score: 6, label: '6'},
                { score: 7, label: '7'},
                { score: 8, label: '8'},
            ]
        },
    ],
    [Title.Visual]: [
        {
            id: 'visual-0',
            question: '业务理解与分析——方案有效性评价（业务目标有效性）',
            description: '业务目标有效性（4分）：业务场景、用户、业务问题、业务目标是否清晰？',
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '略为符合'},
                { score: 2, label: '基本符合'},
                { score: 3, label: '符合'},
                { score: 4, label: '非常符合'},
            ]
        },
        {
            id: 'visual-1',
            question: '业务理解与分析——方案有效性评价设计（目标有效性）',
            description: '设计目标有效性（4分）：设计目标和策略是否清晰、逻辑合理？',
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '略为符合'},
                { score: 2, label: '基本符合'},
                { score: 3, label: '符合'},
                { score: 4, label: '非常符合'},
            ]
        },
        {
            id: 'visual-2',
            question: '业务理解与分析——方案有效性评价设计（设计方案有效性）',
            description: '设计方案有效性（4分）：设计方案是否解决了业务问题？',
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '略为符合'},
                { score: 2, label: '基本符合'},
                { score: 3, label: '符合'},
                { score: 4, label: '非常符合'},
            ]
        },
        {
            id: 'visual-3',
            question: '设计方案——专业性评价（易用性：信息传达）',
            description: `信息传达（4分）：
            1.信息传达清晰明确，符合用户阅读习惯（视觉设计如：焦点不宜过多，信息易读，清晰连贯的视线流，用户能够快速理解页面需要传达的内容和信息 / 插画设计如：画面充分传达了需求点且信息精准）；
            2.合适的信息版式设计（视觉设计如：结合用户场景，根据信息内容使用合适的卡片、瀑布流、无框设计等 / 插画设计如：插图主次信息安排合理）；
`,
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '略为符合'},
                { score: 2, label: '基本符合'},
                { score: 3, label: '符合'},
                { score: 4, label: '非常符合'},
            ]
        },
        {
            id: 'visual-4',
            question: '设计方案——专业性评价（易用性：框架布局）',
            description: `框架布局（4分）：
            1. 在遵循规范基础上进行优化（对比交互稿，在框架布局上利用视觉设计处理的更加丰富）；
            2. 框架层次划分清晰，易理解，扩展性高（界面布局有层次和重点，能突出优先级关系以及关联性，布局框架能够随着需求的变化进行延展和扩充）；`,
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '略为符合'},
                { score: 2, label: '基本符合'},
                { score: 3, label: '符合'},
                { score: 4, label: '非常符合'},
            ]
        },
        {
            id: 'visual-5',
            question: '设计方案——专业性评价（外观：风格统一、文本）',
            description: `风格统一：
            1.能够从产品定位出发，在同一产品中保证设计元素的统一性（视觉设计如：不同页面，色相明度饱和度近似、文案的字体样式布局排版、元素的风格质感具有统一性 / 插画设计如：插图画面风格，画面表达方式，元素质感等具有统一性）；
            2.符合HUI/BUI设计规范（视觉设计如：大小、重量、间距、方向、对齐、色彩、形状、布局、风格等具有很强的统一性 / 插画设计如：视角，图形，人物元素比例等符合插画库规范，80%的插画元素符合直接入库标准，具有统一性）；
            文本：
            1.文本易读，能够突出重要内容，符合用户阅读习惯（保持界面文本的清晰和简洁，疏密有致的文字排版，符合亲密性原则，统一的对齐方式，合理的运用文字字号、粗细、颜色、字间距、行间距、让页面有强烈的层次感）；
            2.文本的真实性，贴合产品实际场景（比如列表中的字段，不要全部字段一模一样，要考虑到文本的真实性）；
            3.文本字段极限情况有定义（提前预估文本信息的最大值，比如标题可能出现两行也有可能一行，可能特别长也可能为空，那就就需要为一些边缘情况做容错处理）；`,
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '略为符合'},
                { score: 2, label: '基本符合'},
                { score: 3, label: '符合'},
                { score: 4, label: '非常符合'},
            ]
        },
        {
            id: 'visual-6',
            question: '设计方案——专业性评价（外观：图形图像、色彩）',
            description: `图形图像：
            1.图形图像符合产品特性，视觉表现丰富（视觉设计如：图解、图标，缺省图，统计图，引导页等图形元素绘制完整精致，吸引眼球 / 插画设计如：构图富有均衡感与节奏感，图形绘制准确，完整精致）；
            2.清晰明了的传达有效信息（视觉设计如：图形能良好的传达想要表达的信息，简化复杂的感念，图形图像不要过于抽象化，图意传达正确，提高浏览效率 / 插画设计如： 插图元素表意准确，图形状态容易识别）；
            色彩：
            1.色彩符合产品特性（视觉设计为产品体验营造氛围，代表产品的品牌形象，传达正确的情感氛围，加强产品在用户心中的形象；插画配色与视觉框架呼应并协调，符合产品气质）；
            2.色彩搭配合理且富有美感，界面平衡感良好（视觉设计冷暖、重量、对比，加强界面重点信息的视觉表达与操作引导，明确界面视觉层级关系；插画配色和谐，运用了顺色或彩色的对应配色技法，视觉感受舒适）；`,
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '略为符合'},
                { score: 2, label: '基本符合'},
                { score: 3, label: '符合'},
                { score: 4, label: '非常符合'},
            ]
        },
        {
            id: 'visual-7',
            question: '设计方案——专业性评价（品质）',
            description: `品质（2分）
            1.注重设计细节，用细节营造产品气质，能给用户带来愉悦感（视觉设计如：界面元素的对齐、像素的精确、图标体量的一致性等 / 插画设计如：图形绘制准确、插图整体描绘精致）；
            2.紧跟当下设计趋势（视觉设计如：虚拟现实的相关设计，3D元素，顺色配色设计等等 / 插画设计如：图形质感差异设计，正负形的使用，新鲜的表达形式，氛围光感的使用等等）；`,
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '符合'},
                { score: 2, label: '非常符合'},
            ]
        },
        {
            id: 'visual-8',
            question: '设计方案——专业性评价（情感）',
            description: `情感（2分）
            1.深入思考用户场景，通过贴心的体验设计，“彩蛋”设计给用户带来惊喜（引导页、缺省页、信息输入出错提示、加载、404等）；
            2.设计符合当前情景氛围，能够拉近与用户之间的距离（色彩搭配让人愉悦，通过图形、构成、质感、文字、色彩等设计，带动用户情绪，使用户快速融入产品，加强用户对产品气质的定位）；`,
            answerOptions: [
                { score: 0, label: '不符合'},
                { score: 1, label: '符合'},
                { score: 2, label: '非常符合'},
            ]
        },
        {
            id: 'visual-9',
            question: '设计方案——专业性评价（创新性）（加分项）',
            description: `有较大设计突破点或设计亮点（如提升效率、采用新颖的表现形式，受到公司嘉奖的，给用户耳目一新的感受，能促进其他产品的发展）
            没有创新（0分）；在思路/体验/工具使用等方面有局部创新（1~3分）；有明显的创新亮点（4~5分）`,
            answerOptions: [
                { score: 0, label: '0'},
                { score: 1, label: '1'},
                { score: 2, label: '2'},
                { score: 3, label: '3'},
                { score: 4, label: '4'},
                { score: 5, label: '5'},
            ]
        },
        {
            id: 'visual-10',
            question: '设计方案——专业性评价（成果物规范）（减分项）',
            description: `1.成果物归档内容完整、命名正确；
            2.成果物使用正确的屏幕分辨率，结构清晰、完整；
            3.页面内注释清晰、充分。
            存在一个问题点扣1分`,
            answerOptions: [
                { score: 0, label: '0'},
                { score: -1, label: '-1'},
                { score: -2, label: '-2'},
                { score: -3, label: '-3'},
                { score: -4, label: '-4'},
                { score: -5, label: '-5'},
            ]
        },
        {
            id: 'visual-11',
            question: '设计表达——方案表达清晰度',
            description: `是否能基于陈述内容，清晰了解业务、用户、问题、设计解决思路、亮点，和对业务的价值？
            完全听不懂（0分）；基本能听懂（1~3分）；思路清晰、重点突出（5~6分）；引人入胜、感染力强（8分）`,
            answerOptions: [
                { score: 0, label: '0'},
                { score: 1, label: '1'},
                { score: 2, label: '2'},
                { score: 3, label: '3'},
                { score: 4, label: '4'},
                { score: 5, label: '5'},
                { score: 6, label: '6'},
                { score: 7, label: '7'},
                { score: 8, label: '8'},
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
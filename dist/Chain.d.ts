import Timeline from './Timeline';
export default class Chain {
    context: Timeline;
    link: Promise<unknown> | null;
    constructor(context: Timeline);
    add(request: PromiseExecutor, callback?: () => null): Timeline;
}

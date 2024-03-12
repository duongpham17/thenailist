const randomid = (): string => {
    const id = Math.random().toString(36).substring(7);
    return id;
};

export const generateid = (times: number = 2): string => {
    const id = Array.from({length: times}, () => randomid()).join("");
    return id
};

export const formatDate = (time: number) => new Date(time).toUTCString();

export const isToday = (time: number) => {
    const today =  new Date(Date.now()).toUTCString().split(" ").slice(0, 4).join("");
    const find = new Date(time).toUTCString().split(" ").slice(0, 4).join("");
    return today === find;
}
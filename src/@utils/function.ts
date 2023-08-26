const randomid = (): string => {
    const id = Math.random().toString(36).substring(7);
    return id;
};

export const generateid = (times: number = 2): string => {
    const id = Array.from({length: times}, () => randomid()).join("");
    return id
};
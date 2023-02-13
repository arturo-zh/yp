export type TLogin = {
    email: string;
    password: string;
};

export type TFull = TLogin & {
    name: string;
};
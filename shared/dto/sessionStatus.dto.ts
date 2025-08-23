export enum SessionStatusEnum {
    Ready,
    Offline,
    Unauthenticated
}


export interface SessionStatusResponse {
    status: SessionStatusEnum;
}

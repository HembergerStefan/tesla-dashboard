export interface ApiResponse<T = undefined> {
    success: boolean;
    message?: string;
    data?: T;
}

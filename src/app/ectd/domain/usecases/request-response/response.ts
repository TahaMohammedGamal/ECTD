export interface BaseResult {
    result: boolean,
    errorCode: string,
    message: string
}

export interface BaseResponse extends BaseResult { }


export interface DataResponse<T> extends BaseResult {
    data?: T,
}


export interface UserResponseModel {
    token: string;
    userInfo: UserModel;
}


export interface UserModel {
    id: number;
    email: string;
    name:string;
}

export interface FileValidationModel{
    analysis:outputModel[];
    finalSummary:string;
    error:string;
}

export interface outputModel{
    output:string;
    runId:string;
    thread:string;
}

export interface ModuleList{
    id:number
    name:string
}

export interface ModuleItemsList{
    id:number
    name:string
    moduleId:number
}
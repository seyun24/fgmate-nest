import ApiResponseStatus from "./api.response.status";

class ApiResponse<T> {
    private readonly isSuccess: boolean;
    private readonly code: number;
    private readonly message: string;
    private readonly result?: T;

    constructor(result?: T)
    constructor(result: ApiResponseStatus)
    constructor(response: ApiResponseStatus | T) {
      if (response instanceof ApiResponseStatus){
        this.isSuccess = response.isSuccess;
        this.code = response.code;
        this.message = response.message;
      }
      else {
        this.isSuccess = ApiResponseStatus.SUCCESS.isSuccess;
        this.code = ApiResponseStatus.SUCCESS.code;
        this.message = ApiResponseStatus.SUCCESS.message;
        this.result = response;
      }
    }
}

export default ApiResponse;
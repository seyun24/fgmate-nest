class ApiResponseStatus {
  public readonly isSuccess: boolean;
  public readonly code: number;
  public readonly message: string;

  constructor(isSuccess: boolean, code: number, message: string) {
    this.isSuccess = isSuccess;
    this.code = code;
    this.message = message;
  }

  public static readonly SUCCESS = new ApiResponseStatus(true, 1000, "Success");
  public static readonly TOKEN_VERIFICATION_SUCCESS = new ApiResponseStatus(true, 1001, "JWT Token Verification Success");

  public static readonly DATABASE_ERROR = new ApiResponseStatus(false, 4000, "데이터베이스 에러가 발생했습니다.");
  public static readonly KAKAO_REQ_FAIL = new ApiResponseStatus(false, 4001, "카카오 계정연동에 실패하였습니다.");
  public static readonly DUPLICATED_GROUP_USER = new ApiResponseStatus(true, 4002, "이미 그룹에 가입된 유저입니다.");
  public static readonly IMAGE_UPLOAD_FAIL = new ApiResponseStatus(true, 4003, "이미지 업로드에 실패 하였습니다.");

}

export default ApiResponseStatus;
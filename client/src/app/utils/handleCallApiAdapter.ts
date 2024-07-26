import { MessageInstance } from "antd/es/message/interface";
import { BaseResponseType } from "../../services/repository";

const DEFAULT_MESSAGE_DURATION = 2;

type HandleCallApiAdapterParamsType<T> = {
  startLoading: () => void;
  endLoading: () => void;
  successMesage: string;
  errorMessage?: string;
  apiCaller: () => Promise<BaseResponseType<T>>;
  messageApi: MessageInstance;
  messageDuration?: number;
};

export const handleCallApiAdapter = async function <T>({
  apiCaller,
  startLoading,
  endLoading,
  successMesage,
  errorMessage,
  messageApi,
  messageDuration,
}: HandleCallApiAdapterParamsType<T>) {
  startLoading();
  
  const response = await apiCaller();

  endLoading();

  if (response.success) {
    messageApi.success(
      successMesage,
      messageDuration || DEFAULT_MESSAGE_DURATION
    );
  } else {
    messageApi.error(
      errorMessage || response.error,
      messageDuration || DEFAULT_MESSAGE_DURATION
    );
  }
};
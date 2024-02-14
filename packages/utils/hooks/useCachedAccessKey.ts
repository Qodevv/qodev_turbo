import { useCallback } from "react";
import { AccessKey } from "./types";
import { getItem } from "../storage";
import { useApiCallBack } from "./useApi";
import { useStorage } from "./useStorage";

// authorized hook

export const useCachedAccessKey = () => {
  const [accessKey, setAccessKey, clearAccessKey] =
    useStorage<AccessKey | null>("access-key", null);

  // create an api request to request an content access key. no api currently available.

  return {
    data: accessKey,
    // the rest of it...
  };
};

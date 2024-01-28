/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import { Api } from "../api";
import { useAsyncCallback } from "react-async-hook";
import { AuthenticationApi } from "../api/auth/api";
import { BusinessApi } from "../api/business/api";
import { config } from "../config";
import { AxiosInstance } from "axios";
import { getItem } from "../storage";
import Http, { HttpOptions } from "../http-client";
import { CmsApi } from "../api/cms/api";

const HTTP_OPTIONS: HttpOptions = {
  headers: {
    "Content-Type": "application/json",
    "x-api-key": config.value.Tokenize
  },
  onRequest: (req: any) => {
    const accessToken = getItem<string | undefined>("AT");
    if (req.headers && accessToken)
      req.headers.Authorization = `Bearer ${accessToken}`;
  },
};

export const httpClient = new Http({ ...HTTP_OPTIONS, baseURL: "http://localhost:5111/api/v1/gateway" })

export const useApiCallBack = <R, A extends unknown>(asyncFn: (api: Api, args: A) => Promise<R>) =>
    useAsyncCallback(async (args?: A) => {
        try {
            return await asyncFn(createApi(httpClient.client), args as A)
        } catch (error) {
            throw error
        }
    })

function createApi(client: AxiosInstance){
    return new Api(
        new AuthenticationApi(client),
        new BusinessApi(client),
        new CmsApi(client)
    )
}

/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import axios from "axios";
import { config } from "./config";

type CmsDto = {
  pageKey: string;
  content: string;
  access: number;
  isDisabled: number;
  path: string;
};

export async function initializedCms() {
  const response = axios.get(`${config.value.Development}/cms-service/list`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "34a89f9063bb49a59d2525220b677e25",
    },
  });
  return (await response).data ?? null;
}

export async function enrollCms(cmsDto: CmsDto) {
  const response = axios.post(
    `${config.value.Development}/cms-service/enroll-cms`,
    cmsDto,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "34a89f9063bb49a59d2525220b677e25",
      },
    }
  );
  return (await response).data ?? null;
}

export async function cmsInitEnroll() {
  const response = axios.post(
    `${config.value.Development}/cms-service/cms-init-enrollment`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "34a89f9063bb49a59d2525220b677e25",
      },
    }
  );
  return (await response).data ?? null;
}

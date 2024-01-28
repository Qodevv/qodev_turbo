/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import { AuthenticationApi } from "./api/auth/api";
import { BusinessApi } from "./api/business/api";
import { CmsApi } from "./api/cms/api";

export class Api {
    constructor(
        readonly auth: AuthenticationApi,
        readonly business: BusinessApi,
        readonly cms: CmsApi
    ){}
}
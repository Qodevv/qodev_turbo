/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import { PropsWithChildren } from "react";
import { Button as RadixButton } from '@radix-ui/themes'

export const Button: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return <RadixButton size="2" variant="soft">{children}</RadixButton>
}
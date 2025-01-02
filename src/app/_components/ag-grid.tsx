'use client'

import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry, colorSchemeDarkBlue, themeQuartz } from 'ag-grid-community';


ModuleRegistry.registerModules([AllCommunityModule]);

export const darkBlueTheme = themeQuartz.withPart(colorSchemeDarkBlue);
export default AgGridReact
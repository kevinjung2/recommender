'use client'

import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry, colorSchemeDarkBlue, themeQuartz } from 'ag-grid-community';
import React from "react";
import { useState} from "react"

import type { ColDef } from 'ag-grid-community'

type GridProps = {
    colDefsProp: ColDef[]
    rowDataProp: {
        name: string
        type: string
        tags: string
        user: string
        ratings: string
    }[]
    height: number
}

ModuleRegistry.registerModules([AllCommunityModule]);
const darkBlueTheme = themeQuartz.withPart(colorSchemeDarkBlue);

export default function Grid(props: GridProps) {
    const [rowData, setRowData] = useState(props.rowDataProp)
    const [colDefs, setColDefs] = useState(props.colDefsProp) 

    console.log("from Grid", rowData, colDefs);
    return(
        <div style={{height: props.height}}>
			<AgGridReact theme={darkBlueTheme} columnDefs={colDefs} rowData={rowData} />
        </div>
    )
}

import type { ColDef } from "ag-grid-community";
import { getRecommendations } from "../server/queries"
import Grid from "./_components/ag-grid";

export default async function HomePage() {
	const recos = await getRecommendations();
	const rowData = recos.map(reco => {
		return ({
			name: reco.name,
			type: reco.primaryCategory ? reco.primaryCategory.name : "No Category Found",
			tags: reco.secondaryCategory ? reco.secondaryCategory.name : "No Tags Found",
			user: reco.user ? reco.user.firstName : "We don't know who made this recommendation 🤔",
			ratings: "Not Implemented"
		})
	})
	const colDefs: ColDef[] = [
		{field: 'name', flex: 2},
		{field: 'type', flex: 1},
		{field: 'tags', flex: 1},
		{field: 'user', flex: 1},
		{field: 'ratings', flex: 1}
	]
    console.log("from home", rowData, colDefs)
  return (
	<main>
		<div className="px-8 ">
            {rowData ? <Grid colDefsProp={colDefs} rowDataProp={rowData} height={500}/> : <div>Loading...</div>}
		</div>
	</main>
  );
}

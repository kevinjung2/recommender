import { db } from "~/server/db";
import AgGridReact from "./_components/ag-grid";
import { darkBlueTheme } from "./_components/ag-grid";

//TDOD move getrecos to api call and make this function synchronous then use useState to set table data to see if that fixes table rendering issue
export default async function HomePage() {
	const recos = await db.query.recommendations.findMany({
		with: {
			primaryCategory: true,
			secondaryCategory: true,
			user: true
		}
	})
	const rowData = recos.map(reco => {
		return ({
			name: reco.name,
			type: reco.primaryCategory ? reco.primaryCategory.name : "No Category Found",
			tags: reco.secondaryCategory ? reco.secondaryCategory.name : "No Tags Found",
			user: reco.user ? reco.user.firstName : "We don't know who made this recommendation 🤔",
			ratings: "Not Implemented"
		})
	})
	const colDefs = [
		{name: 'name', flex: 2},
		{type: 'type', flex: 1},
		{tags: 'tags', flex: 1},
		{user: 'user', flex: 1},
		{ratings: 'ratings', flex: 1}
	]

  return (
	<main>
		<div style={{height: 500}}className="px-8 ">
			<AgGridReact theme={darkBlueTheme} columnDefs={colDefs} rowData={rowData} />
		</div>
	</main>
  );
}

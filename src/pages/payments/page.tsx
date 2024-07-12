import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"



export default function DemoPage() {
  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
    // TODO: generalize the table creation. I want hierarchy, concentration name -> section -> subsection -> classes. Then checkmarks for each one, and collapsable
  ]

  return (
    <div className="container mx-auto py-10">

      <DataTable columns={columns} data={data} />
    </div>
  )
}

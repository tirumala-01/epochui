import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default async function Page() {

    const [highest, lowest] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_EPOCH_API_URL}/shipments/expensive-routes?operation=highest`).then(res => res.json()),
        fetch(`${process.env.NEXT_PUBLIC_EPOCH_API_URL}/shipments/expensive-routes?operation=lowest`).then(res => res.json())
    ]);
    return (
        <div className="grid grid-rows-[20px_1fr_20px] justify-start min-h-full p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-wrap gap-20 justify-center">
                {highest && (
                    <div className="w-full sm:w-auto">
                        <Table>
                            <TableCaption>Recent Top 5 expensive routes.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Origin</TableHead>
                                    <TableHead>Destination</TableHead>
                                    <TableHead className="text-right">Total shipment cost</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {highest.map((x) => (
                                    <TableRow key={x.route_id}>
                                        <TableCell>{x.origin}</TableCell>
                                        <TableCell>{x.destination}</TableCell>
                                        <TableCell className="text-right">{x.total_shipment_cost}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
                {lowest && (
                    <div className="w-full sm:w-auto">
                        <Table>
                            <TableCaption>Recent Top 5 cheaper routes.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Origin</TableHead>
                                    <TableHead>Destination</TableHead>
                                    <TableHead className="text-right">Total shipment cost</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {lowest.map((x) => (
                                    <TableRow key={x.route_id}>
                                        <TableCell>{x.origin}</TableCell>
                                        <TableCell>{x.destination}</TableCell>
                                        <TableCell className="text-right">{x.total_shipment_cost}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </main>
        </div>
    );
}
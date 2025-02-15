import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const exR = [
    {
        "route_id": "Port Keith-Karenchester",
        "origin": "Port Keith",
        "destination": "Karenchester",
        "total_shipment_cost": 17701.48
    },
    {
        "route_id": "Bassport-Karenchester",
        "origin": "Bassport",
        "destination": "Karenchester",
        "total_shipment_cost": 17148.08
    },
    {
        "route_id": "Ericmouth-Karenchester",
        "origin": "Ericmouth",
        "destination": "Karenchester",
        "total_shipment_cost": 17081.44
    },
    {
        "route_id": "Danielchester-Karenchester",
        "origin": "Danielchester",
        "destination": "Karenchester",
        "total_shipment_cost": 16935.68
    },
    {
        "route_id": "Ramirezstad-Karenchester",
        "origin": "Ramirezstad",
        "destination": "Karenchester",
        "total_shipment_cost": 16864.99
    }
];

export default async function Page() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] justify-start min-h-full p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-wrap gap-20 justify-center">
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
                            {exR.map((invoice) => (
                                <TableRow key={invoice.route_id}>
                                    <TableCell>{invoice.origin}</TableCell>
                                    <TableCell>{invoice.destination}</TableCell>
                                    <TableCell className="text-right">{invoice.total_shipment_cost}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
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
                            {exR.map((invoice) => (
                                <TableRow key={invoice.route_id}>
                                    <TableCell>{invoice.origin}</TableCell>
                                    <TableCell>{invoice.destination}</TableCell>
                                    <TableCell className="text-right">{invoice.total_shipment_cost}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </div>
    );
}
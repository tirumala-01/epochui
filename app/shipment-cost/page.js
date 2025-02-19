"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";

import useCitiesStore from '@/stores/CitiesStore';

import { Bug, CircleDollarSign } from 'lucide-react';
import { Label } from "@radix-ui/react-label";

const formSchema = z.object({
    origin: z.string(),
    destination: z.string(),
    operation: z.enum(["average", "maximum", "minimum", "total"]).default("average"),
});

export default function Page() {
    const [originList, setOrigin] = useState(null);
    const [destinationList, setDestination] = useState(null);
    const [isLoading, setLoading] = useState(true);
    let { fetchCostData, city_data, city_data_loading, resetCityStore, city_data_error } = useCitiesStore();

    const defaultFormValues = {
        origin: "",
        destination: "",
        operation: "average",
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: defaultFormValues
    });

    async function onSubmit(values) {
        try {
            await fetchCostData(values);
        } catch (error) {
            form.setError("origin", { message: error.message });
            console.error(error);
        }
    }
    function handleReset() {
        form.reset(defaultFormValues);
        resetCityStore();
    }

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const cachedOrigin = localStorage.getItem('originCities');
                const cachedDestination = localStorage.getItem('destinationCities');

                if (cachedOrigin && cachedDestination) {
                    setOrigin(JSON.parse(cachedOrigin));
                    setDestination(JSON.parse(cachedDestination));
                    setLoading(false);
                } else {
                    const [originData, destinationData] = await Promise.all([
                        fetch(`${process.env.NEXT_PUBLIC_EPOCH_API_URL}/shipments/cities?type=origin`).then((res) => res.json()),
                        fetch(`${process.env.NEXT_PUBLIC_EPOCH_API_URL}/shipments/cities?type=destination`).then((res) => res.json())
                    ]);

                    localStorage.setItem('originCities', JSON.stringify(originData));
                    localStorage.setItem('destinationCities', JSON.stringify(destinationData));

                    setOrigin(originData);
                    setDestination(destinationData);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching cities:", error);
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] justify-start min-h-full p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-wrap gap-8 justify-center">
                <div>
                    <div >
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="flex flex-wrap gap-10">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <Card className="w-full sm:w-[350px]">
                                            <CardHeader>
                                                <CardTitle>Shipment Cost</CardTitle>
                                                <CardDescription>Check shipment cost details.</CardDescription>
                                            </CardHeader>
                                            <CardContent className="grid gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="origin"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Origin</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {originList && (
                                                                        originList.map((city) => (
                                                                            <SelectItem key={city} value={city}>{city}</SelectItem>
                                                                        ))
                                                                    )}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="destination"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Destination</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {destinationList && (
                                                                        destinationList.map((city) => (
                                                                            <SelectItem key={city} value={city}>{city}</SelectItem>
                                                                        ))
                                                                    )}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="operation"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Cost</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="average" selected>Average</SelectItem>
                                                                    <SelectItem value="maximum">Maximum</SelectItem>
                                                                    <SelectItem value="minimum">Minimum</SelectItem>
                                                                    <SelectItem value="total">Total</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </CardContent>
                                            <CardFooter className="flex justify-between">
                                                <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
                                                <Button type="submit">Submit</Button>
                                            </CardFooter>
                                        </Card>
                                    </form>
                                </Form>
                                {city_data_error && (
                                    <div className="flex flex-row gap-2">
                                        <Bug color="#FF0000" />
                                        {console.log(city_data_error)}
                                        <Label>Error Getting origin and destination cities</Label>
                                    </div>
                                )}

                                {city_data_loading && (
                                    <div>
                                        <Label>Loading</Label>
                                    </div>
                                )}

                                {city_data && (
                                    <div>
                                        <Card className="w-full sm:w-[350px]">
                                            <CardHeader>
                                                <CardTitle>Cost Details</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <Table>
                                                    <TableBody>
                                                        {Object.entries(city_data).map(([key, value]) => {
                                                            const renamedKey = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
                                                            return (
                                                                <TableRow key={key}>
                                                                    <TableCell>{renamedKey}</TableCell>
                                                                    <TableCell className="text-right">{value}</TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </CardContent>
                                            <CardFooter>
                                                <CircleDollarSign />
                                            </CardFooter>
                                        </Card>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
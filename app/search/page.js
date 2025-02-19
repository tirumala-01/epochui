"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import useSearchStore from "@/stores/Search";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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

import { FileSearch, Bug } from 'lucide-react';

const formSchema = z.object({
    id: z.string().trim()
});

function validatePattern(value) {
    const patterns = [
        { name: "shipment_id", regex: /^(S-(0{5}[1-9]|[1-9][0-9]{5}))$/ },
        { name: "log_id", regex: /^(L-(0{5}[1-9]|[1-9][0-9]{5}))$/ },
        { name: "vehicle_id", regex: /^V-(0{2}[1-9]|[1-9][0-9]{2})$/ }
    ];

    const matchedPattern = patterns.find(({ regex }) => regex.test(value));
    return matchedPattern ? true : false;
};


export default function Search() {
    let {
        fetchResource,
        reset,
        resource_data,
        resource_data_loading,
        resource_data_error,
    } = useSearchStore();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
        },
    });

    async function onSubmit(resource) {
        try {
            validatePattern(resource.id) ? await fetchResource(resource.id) : form.setError("id", { message: "Invalid ID" });
        } catch (error) {
            form.setError("id", { message: error.message });
            console.error(error);
        }
    }

    function handleReset() {
        form.reset();
        form.clearErrors();
        reset();
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] justify-start min-h-full p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-wrap gap-8 justify-center">
                <div className="w-full sm:w-auto">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <Card className="w-full sm:w-[350px]">
                                <CardHeader>
                                    <CardTitle>Search</CardTitle>
                                    <CardDescription>Shipment, Vehicle or Logs.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>ID*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="S-000001, L-000001, V-001" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
                                    <Button type="submit" disabled={resource_data_loading}>
                                        {resource_data_loading ? "Loading..." : "Submit"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </Form>
                </div>

                {resource_data_error && (
                    <div className="w-full sm:w-auto">
                        <Card className="w-full sm:w-[350px]">
                            <CardHeader>
                                <CardTitle>Error</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-red-500">{resource_data_error}</p>
                            </CardContent>
                            <CardFooter>
                                <Bug />
                            </CardFooter>
                        </Card>
                    </div>
                )}

                {resource_data && (
                    <div className="w-full sm:w-auto">
                        <Card className="w-full sm:w-[350px]">
                            <CardHeader>
                                <CardTitle> Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <Table>
                                    <TableBody>
                                        {Object.entries(resource_data).map(([key, value]) => {
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
                                <FileSearch />
                            </CardFooter>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
}
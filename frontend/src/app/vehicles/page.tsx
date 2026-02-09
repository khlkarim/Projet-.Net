"use client";

import { ArrowRight, ShoppingCart } from "lucide-react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { useVehicles } from "~/features/vehicles/hooks/use-vehicles";
import { Vehicle } from "~/features/vehicles/schemas/vehicles.schemas";
import { Button } from "~/ui/primitives/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/ui/primitives/card";

export default function VehiclesPage() {
  const { data: vehicles, isError, isLoading } = useVehicles();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Failed to load vehicles.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div className={`
          container px-4
          md:px-6
        `}>
          <div className={`
            mb-8 flex flex-col gap-4
            md:flex-row md:items-center md:justify-between
          `}>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Vehicles</h1>
              <p className="mt-1 text-lg text-muted-foreground">
                Browse our collection of premium vehicles.
              </p>
            </div>
          </div>

          <div className={`
            grid grid-cols-1 gap-6
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
          `}>
            {vehicles?.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          {vehicles?.length === 0 && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">No vehicles found.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Card className={`
      flex h-full flex-col overflow-hidden transition-all
      hover:shadow-lg
    `}>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          alt={`${vehicle.brand} ${vehicle.model}`}
          className={`
            object-cover transition-transform duration-300
            hover:scale-105
          `}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={vehicle.imageUrl || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"} // Value default
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1 text-lg">
            {vehicle.year} {vehicle.brand} {vehicle.model}
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">{vehicle.type}</p>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-0">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold">
            ${vehicle.price.toLocaleString()}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-2 py-1">{vehicle.fuelType}</span>
          <span className="rounded-full bg-secondary px-2 py-1">{vehicle.transmission}</span>
          <span className="rounded-full bg-secondary px-2 py-1">{vehicle.mileage.toLocaleString()} mi</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link className="w-full" href={`/vehicles/${vehicle.id}`}>
          <Button className="w-full">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

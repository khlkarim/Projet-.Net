"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";

import { useVehicle } from "~/features/vehicles/hooks/use-vehicles";
import { Badge } from "~/ui/primitives/badge";
import { Button } from "~/ui/primitives/button";
import { Separator } from "~/ui/primitives/separator";

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: vehicle, isError, isLoading } = useVehicle(id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !vehicle) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 py-10">
          <div className={`
            container px-4
            md:px-6
          `}>
            <h1 className="text-3xl font-bold">Vehicle Not Found</h1>
            <p className="mt-4">
              The vehicle you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button className="mt-6" onClick={() => router.push("/vehicles")}>
              Back to Vehicles
            </Button>
          </div>
        </main>
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
          <Button
            aria-label="Back to vehicles"
            className="mb-6"
            onClick={() => router.push("/vehicles")}
            variant="ghost"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Vehicles
          </Button>

          <div className={`
            grid grid-cols-1 gap-8
            md:grid-cols-2
          `}>
            {/* Vehicle Image */}
            <div className={`
              relative aspect-[4/3] overflow-hidden rounded-lg bg-muted
            `}>
              <Image
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="object-cover"
                fill
                priority
                src={vehicle.imageUrl || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"}
              />
            </div>

            {/* Vehicle Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h1 className="text-3xl font-bold">
                  {vehicle.year} {vehicle.brand} {vehicle.model}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  VIN: {vehicle.vin}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">
                    ${vehicle.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-muted-foreground">{vehicle.description}</p>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                <Badge variant="secondary">{vehicle.condition}</Badge>
                <Badge variant="outline">{vehicle.type}</Badge>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Specifications */}
          <div className={`
            grid grid-cols-1 gap-8
            md:grid-cols-2
          `}>
            <section>
              <h2 className="mb-4 text-2xl font-bold">Specifications</h2>
              <div className="space-y-3">
                <SpecRow label="Brand" value={vehicle.brand} />
                <SpecRow label="Model" value={vehicle.model} />
                <SpecRow label="Year" value={vehicle.year.toString()} />
                <SpecRow label="Type" value={vehicle.type} />
                <SpecRow label="Fuel Type" value={vehicle.fuelType} />
                <SpecRow label="Transmission" value={vehicle.transmission} />
                <SpecRow label="Mileage" value={`${vehicle.mileage.toLocaleString()} mi`} />
                <SpecRow label="Color" value={vehicle.color} />
                <SpecRow label="Condition" value={vehicle.condition} />
                <SpecRow label="Number of Seats" value={vehicle.numberOfSeats.toString()} />
                <SpecRow label="Number of Doors" value={vehicle.numberOfDoors.toString()} />
                <SpecRow label="Power" value={`${vehicle.power} HP`} />
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Additional Information</h2>
              <div className="space-y-3">
                <SpecRow label="VIN" value={vehicle.vin} />
                <SpecRow
                  label="Listed On"
                  value={new Date(vehicle.createdAt).toLocaleDateString()}
                />
                <SpecRow
                  label="Last Updated"
                  value={new Date(vehicle.updatedAt).toLocaleDateString()}
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-2 text-sm">
      <span className="font-medium">{label}</span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
}

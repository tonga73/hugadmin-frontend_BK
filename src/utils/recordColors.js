import React from "react";

export const contentPriority = [
  {
    name: "Nula",
    color: "bg-stone-900",
  },
  {
    name: "Baja",
    color: "bg-green-700",
  },
  {
    name: "Media",
    color: "bg-yellow-500",
  },
  {
    name: "Alta",
    color: "bg-orange-500",
  },
  {
    name: "Urgente",
    color: "bg-red-600",
  },
  {
    name: "Inactivo",
    color: "bg-stone-500",
  },
];

export const contentStatus = [
  {
    name: "Acepta cargo",
    color: "bg-stone-900",
  },
  {
    name: "Acto pericial realizado",
    color: "bg-green-900",
  },
  {
    name: "Pericia realizada",
    color: "bg-blue-500",
  },
  {
    name: "Sentencia o convenio de partes",
    color: "bg-blue-900",
  },
  {
    name: "Honorarios regulados",
    color: "bg-yellow-700",
  },
  {
    name: "En tratativa de cobro",
    color: "bg-purple-500",
  },
  {
    name: "Cobrado",
    color: "bg-purple-700",
  },
];

export default function recordColors() {
  return <div>generateRecordColors</div>;
}

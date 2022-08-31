import React from "react";
import { useDispatch } from "react-redux";

import { RecordForm } from "./forms/RecordForm";

export function NewRecord() {
  const dispatch = useDispatch();
  return (
    <div>
      <h3>Crear expedientesss</h3>
      <RecordForm />
    </div>
  );
}

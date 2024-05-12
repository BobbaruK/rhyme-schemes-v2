import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PiTerminalDuotone } from "react-icons/pi";
import { PostgrestError } from "@supabase/supabase-js";

interface Props {
  error: PostgrestError;
}

const AlertWrapper = ({ error }: Props) => {
  const admin = true;
  return (
    <div className="container">
      <Alert variant={"destructive"}>
        <PiTerminalDuotone />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>
          {(error.code || error.message) && (
            <p>
              {error.code && <strong>{error.code}:</strong>} {error.message}
            </p>
          )}
          {admin && error.details && (
            <p>
              <strong>Details:</strong> {error.details}
            </p>
          )}
          {admin && error.hint && (
            <p>
              <strong>Hint:</strong> {error.hint}
            </p>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertWrapper;

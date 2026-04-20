import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProcessPOST, InitiativeStatus} from "@/components/process-improvement/types";
import { postProcesses } from "@/services/ProcessService";

export default function InitiatePOST() {
  const [items, setItems] = useState<ProcessPOST>({
    process_number: "",
    process_name: "",
    process_issue: "",
    process_solution: "",
    process_benefits: "",
    process_status: "not started",
    process_start_date: "",
    process_completion_date: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const lastStatus = useRef(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // No initial POST here; controller is created per submission
    return () => {
      // cancel any in-flight submit on unmount
      controllerRef.current?.abort();
    };
  }, []);

  
  const buildPayload = (): ProcessPOST => ({
    ...items,
    process_number: items.process_number.trim(),
    process_name: items.process_name.trim(),
    process_issue: items.process_issue.trim(),
    process_solution: items.process_solution.trim(),
    process_benefits: items.process_benefits.trim(),
    process_status: items.process_status as InitiativeStatus,
    process_start_date: items.process_start_date || null,
    process_completion_date: items.process_completion_date || null,
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(loading)
      return;

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);
    lastStatus.current=null;

    const payload = buildPayload();

    console.log("Sent POST:", items);
    const { data, error } = await postProcesses(payload, controller.signal);

    if (error)
      setError(error);
    if (data)
      setItems({process_number: "",
        process_name: "",
        process_issue: "",
        process_solution: "",
        process_benefits: "",
        process_status: "not started",
        process_start_date: "",
        process_completion_date: "",});

    
    setLoading(false);    
       
  };

  return (
    <PageLayout title="API Connection">
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          Process Number:
          <input
            type="text"
            name="process number"
            value={items.process_number}
            onChange={(e) =>
              setItems({ ...items, process_number: e.target.value })
            }
            disabled={loading}
          />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          Process Name:
          <input
            type="text"
            name="process name"
            value={items.process_name}
            onChange={(e) =>
              setItems({ ...items, process_name: e.target.value })
            }
            disabled={loading}
          />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          Process Issue:
          <input
            type="text"
            name="process issue"
            value={items.process_issue}
            onChange={(e) =>
              setItems({ ...items, process_issue: e.target.value })
            }
            disabled={loading}
          />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          Process Solution:
          <input
            type="text"
            name="process solution"
            value={items.process_solution}
            onChange={(e) =>
              setItems({ ...items, process_solution: e.target.value })
            }
            disabled={loading}
          />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          Process Benefits:
          <input
            type="text"
            name="process benefits"
            value={items.process_benefits}
            onChange={(e) =>
              setItems({ ...items, process_benefits: e.target.value })
            }
            disabled={loading}
          />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          Process Status:
          <select
            name="status"
            value={items.process_status}
            onChange={(e) =>
              setItems({
                ...items,
                process_status: e.target.value as InitiativeStatus,
              })
            }
            disabled={loading}
          >
            <option value="">Select a status</option>
            <option value="notstarted">Not Started</option>
            <option value="inprogress">In Progress</option>
            <option value="onhold">On Hold</option>
            <option value="cancelled">Cancelled</option>
            <option value="blocked">Blocked</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          Process Start Date:
          <input
            type="date"
            name="process start date"
            value={items.process_start_date}
            onChange={(e) =>
              setItems({ ...items, process_start_date: e.target.value })
            }
            disabled={loading}
          />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          Process Completion Date:
          <input
            type="date"
            name="process completion date"
            value={items.process_completion_date || ""}
            onChange={(e) =>
              setItems({ ...items, process_completion_date: e.target.value })
            }
            disabled={loading}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Adding…" : "Add"}
        </button>
        {error && <p role="alert">{error}</p>}
        {lastStatus.current && <p>Last status: {lastStatus.current} Error: {error}</p>}
      </form>
    </PageLayout>
  );
}

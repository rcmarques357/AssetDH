import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  ProcessPOST,
  InitiativeStatus,
} from "@/components/process-improvement/types";

export default function APIConnectionPOST() {
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

  useEffect(() => {
    // No initial POST here; controller is created per submission
    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    console.log("Sent POST:", items);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/GDQPortal/process/",
        items, //,
        //{ signal: controller.signal }
      );
      console.log("Sent POST:", items);
      lastStatus.current = res.status;
      console.log("Status:", res.status);
      console.log("Response data:", res.data);
      setItems({
        process_number: "",
        process_name: "",
        process_issue: "",
        process_solution: "",
        process_benefits: "",
        process_status: "not started",
        process_start_date: "",
        process_completion_date: "",
      }); // reset on success
    } catch (err) {
      if (axios.isCancel?.(err) || err.name === "CanceledError") return;
      if (err.response && err.response.data) {
        const apiErrors = err.response.data;
        const formattedErrors = Object.entries(apiErrors)
          .map(
            ([field, messages]) =>
              `${field}: ${(messages as string[]).join(", ")}`,
          )
          .join(" | ");
        setError(
          `POST failed: ${err.response.status} ${err.response.statusText} -> ${formattedErrors}`,
        );
        console.error("API Error:", err.response.data);
      } else if (err.request) {
        setError("Network error: no response from server");
      } else {
        setError(`Request setup error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
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
        {lastStatus.current && <p>Last status: {lastStatus.current}</p>}
      </form>
    </PageLayout>
  );
}

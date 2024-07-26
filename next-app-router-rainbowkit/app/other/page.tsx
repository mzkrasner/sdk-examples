"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import spindl from "@spindl-xyz/attribution";
import { useEffect } from "react";

function Page() {
  const { address } = useAccount();
  const [value, setValue] = React.useState("");

  const createEvent = async () => {
    try {
      const buttonClick = {
        data: {
          timeStamp: new Date().toISOString(),
          page: "other",
        },
        metadata: {
          address,
        },
      };
      const res = await fetch("/api/two", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buttonClick),
      });
      const result = await res.json();
      console.log(result);
      setValue(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (address && !value) {
      // spindl.attribute(address);
      createEvent();
    }
  }, [address, value]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 12,
        }}
      >
        <ConnectButton />
        <button
          style={{
            marginLeft: 12,
          }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Back
        </button>
      </div>
      <TextareaAutosize
        style={{
          marginTop: 12,
          width: "100%",
          padding: 12,
          fontSize: 16,
        }}
        value={value}
      />
    </div>
  );
}

export default Page;

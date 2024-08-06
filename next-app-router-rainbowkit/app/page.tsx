"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { MediaRenderer, useStorageUpload } from "@thirdweb-dev/react";
import axios from "axios";
import { useEffect } from "react";

function Page() {
  const { address } = useAccount();
  const [value, setValue] = React.useState("");
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const { mutateAsync: upload } = useStorageUpload();

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadToIpfs = async () => {
    const uploadUrl = await upload({
      data: [file],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });
    return uploadUrl[0];
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:3000/api/three";
    const formData = new FormData();
    if (!file) {
      console.error("No file selected");
      return;
    }
    const imageUrl = await uploadToIpfs();
    const imageCid = imageUrl.split("/")[imageUrl.split("/").length - 2];
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    // add the image url to the form data
    formData.append("imageCid", imageCid);
    formData.append("address", address as string);
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
      setValue(JSON.stringify(response.data, null, 2));
    });
  };

  useEffect(() => {
    if (address) {
      // spindl.attribute(address);
    }
  }, [address]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 12,
      }}
    >
      <ConnectButton />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 12,
        }}
      >
        {address && (
          <form>
            <h1>Upload a File</h1>
            <input type="file" onChange={handleChange} />
            <button onClick={handleSubmit}>Upload</button>
          </form>
        )}
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

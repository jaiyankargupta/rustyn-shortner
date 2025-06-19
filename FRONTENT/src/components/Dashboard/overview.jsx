import React from "react";
import QRCodeGenerator from "../../services/qrGenearte";
import CreateShortLink from "../../services/createShortLink";

const Overview = () => {
  const [show, hide] = React.useState(false);
  return (
    <div>
      <div className="p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">QR Code Generator</h1>
        <div className="bg-white rounded gap-2  p-4 ">
          <div className="flex items-center">
            <div className="text-2xl font-bold mx-7 ">Create Quick Links</div>
            <button
              className="border border-gray-300 px-12 rounded hover:bg-gray-100"
              onClick={() => hide(!show)}
            >
              Create Short Link
            </button>
            <button
              className="border border-gray-300 px-12 rounded hover:bg-gray-100 ml-2"
              onClick={() => hide(!show)}
            >
              Create QR
            </button>
          </div>
          {show && (
            <div>
              <div className=" p-6 rounded shadow w-full ">
                {show ? <QRCodeGenerator /> : <CreateShortLink />}
              </div>
            </div>
          )}
          {!show && (
            <div className="text-gray-500 text-center mt-6">
              <CreateShortLink />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;

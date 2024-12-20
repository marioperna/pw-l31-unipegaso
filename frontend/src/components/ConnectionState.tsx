export function ConnectionState({ isConnected }: { isConnected: boolean }) {
  return (
    <div className="flex">
      <div className={"mr-2"}>
        Websocket Status
      </div>
      <div id="connection-state" className={"flex items-center"}>
        <span className={"relative flex h-3 w-3"}>
          <span title={isConnected ? "Operational" : "Disconnected"} className={"animate-ping absolute inline-flex h-full w-full rounded-full  opacity-75 " + (isConnected ? "bg-green-400" : "bg-red-400")}></span>
          <span className={"relative inline-flex rounded-full h-3 w-3 bg-green-500 " + (isConnected ? "bg-green-400" : "bg-red-400")}></span>
        </span>
      </div>
    </div>
  );
}
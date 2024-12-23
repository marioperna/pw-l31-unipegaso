import { useTranslation } from "react-i18next";

export function ConnectionState({ isConnected, title, className }: { isConnected: boolean, title?: string, className?: string }) {
  const { t } = useTranslation(); // not passing any namespace will use the defaultNS (by default set to 'translation')
  return (
    <div className="flex">
      {title && <div className={"mr-2" + ' ' +className}>{title}</div>}
      <div id="connection-state" className={"flex items-center"}>
        <span className={"relative flex h-3 w-3"}>
          <span title={isConnected ? t("WEBSOCKET_OPERATIONAL") : t("WEBSOCKET_NOT_OPERATIONAL")} className={"animate-ping absolute inline-flex h-full w-full rounded-full  opacity-75 " + (isConnected ? "bg-green-400" : "bg-red-400")}></span>
          <span className={"relative inline-flex rounded-full h-3 w-3 bg-green-500 " + (isConnected ? "bg-green-400" : "bg-red-400")}></span>
        </span>
      </div>
    </div>
  );
}
import React from "react";
import { Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const SettingsPopover = ({ settings }) => {
  return (
    <Popover
      content={settings}
      title="Settings"
      trigger="click"
      placement="bottomRight"
    >
      <SettingOutlined className="cog" />
    </Popover>
  );
};

export default SettingsPopover;

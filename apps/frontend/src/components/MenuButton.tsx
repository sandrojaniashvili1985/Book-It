import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";

type label = string | React.ReactNode;

interface PopupDocProps {
  items?: object[];
  label?: label;
  name?: string | undefined;
  icon?: React.ReactNode;
}

const PopupDoc: React.FC<PopupDocProps> = ({ items, label, name, icon }) => {
  const menuRight = useRef(null);
  const toast = useRef(null);

  return (
    <div className="card flex justify-content-center gap-2">
      <Toast ref={toast}></Toast>
      <p>{name}</p>
      <Menu
        model={items}
        popup
        ref={menuRight}
        id="popup_menu_right"
        popupAlignment="right"
      />
      <Button
        label={label as string}
        icon={icon}
        className="mr-2"
        onClick={(event) => menuRight.current.toggle(event)}
        aria-controls="popup_menu_right"
        aria-haspopup
      />
    </div>
  );
};

export default PopupDoc;

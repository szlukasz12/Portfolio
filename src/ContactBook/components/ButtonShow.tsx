import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";

type ButtonShowProps = {
  visible: boolean;
  textV: string;
  textH: string;
  setVisible: (visible: boolean) => void;
};

const ButtonShow = ({ visible, textV, textH, setVisible }: ButtonShowProps): ReactElement => {
    const { t, i18n } = useTranslation();
    return (
                <button onClick={()=>{setVisible(!visible);}}>{visible ? textH:textV}</button>
    )
}
export default ButtonShow
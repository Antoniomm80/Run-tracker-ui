import { Flex, ActionIcon } from "@mantine/core";
import { IconRun, IconChartBar } from "@tabler/icons-react";
import { FooterIcon } from "./footericon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FooterBar() {
    const [mainSection, setMainSection] = useState<string>("run");
    const navigate = useNavigate();    
    const onClickFactory = (section: string,targetPath:string) => () => {
        setMainSection(section);
        navigate(targetPath);
    }
    return (
        <Flex gap="xl" justify="space-around" align="center" direction="row" wrap="nowrap">
            <FooterIcon variant={mainSection === "run"?"filled":"transparent"} onClick={onClickFactory("run","")} type="run"/>
            <FooterIcon variant={mainSection === "charts"?"filled":"transparent"} onClick={onClickFactory("charts","/charts")} type="chart"/>
        </Flex>
    );
}

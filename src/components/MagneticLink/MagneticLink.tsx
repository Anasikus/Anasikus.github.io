import type { AnchorHTMLAttributes } from "react";

import { useMagnetic } from "../../hooks/useMagnetic";

/*
 * Обёртка над <a>, которая тянется к курсору. Отдельным
 * компонентом — потому что хуки нельзя вызывать внутри
 * .map(), а список соцссылок как раз рендерится через map.
 */
const MagneticLink = (
  props: AnchorHTMLAttributes<HTMLAnchorElement>
) => {
  const ref = useMagnetic<HTMLAnchorElement>();

  return <a ref={ref} {...props} />;
};

export default MagneticLink;

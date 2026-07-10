import { resolveConfig } from '@patrojs/core';
import type { PatroJsPickerConfig } from '@patrojs/core';
import type { StyleResolver } from './types';

export function useStyleResolver(
  config: PatroJsPickerConfig = {},
): StyleResolver {
  const resolved = resolveConfig(config);
  const { tokens, colors, radius, gridStyle, navIcons } = resolved;

  return {
    tokens,
    colors,
    radius,
    gridStyle,
    navIcons,
  };
}

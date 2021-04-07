import {
  jsx as emotionJsx,
  ThemeContext as EmotionContext,
} from '@emotion/react'
import { Theme } from '@theme-ui/css'
import * as React from 'react'
import packageInfo from '@emotion/react/package.json'
import parseProps from '@theme-ui/parse-props'

import { ThemeUIJSX } from './jsx-namespace'
export type { ThemeUIJSX } from './jsx-namespace'

export type {
  CSSObject,
  CSSOthersObject,
  CSSProperties,
  CSSPseudoSelectorProps,
  ColorMode,
  ColorModesScale,
  Label,
  ResponsiveStyleValue,
  Scale,
  StylePropertyValue,
  TLengthStyledSystem,
  Theme,
  ThemeDerivedStyles,
  ThemeStyles,
  ThemeUICSSObject,
  ThemeUICSSProperties,
  ThemeUIExtendedCSSProperties,
  ThemeUIStyleObject,
  VariantProperty,
} from '@theme-ui/css'

export { __internalGetUseRootStyles } from '@theme-ui/css'
export * from './types'

const __EMOTION_VERSION__ = packageInfo.version

export const jsx: typeof React.createElement = <P extends {}>(
  type: React.FunctionComponent<P> | React.ComponentClass<P> | string,
  props: React.Attributes & P,
  ...children: React.ReactNode[]
): any => emotionJsx(type, parseProps(props), ...children)

/**
 * @internal for Babel JSX pragma
 * @see https://github.com/system-ui/theme-ui/issues/1603
 */
export const createElement: unknown = jsx

export declare namespace jsx {
  export namespace JSX {
    export interface Element extends ThemeUIJSX.Element {}
    export interface ElementClass extends ThemeUIJSX.ElementClass {}
    export interface ElementAttributesProperty
      extends ThemeUIJSX.ElementAttributesProperty {}
    export interface ElementChildrenAttribute
      extends ThemeUIJSX.ElementChildrenAttribute {}
    export type LibraryManagedAttributes<
      C,
      P
    > = ThemeUIJSX.LibraryManagedAttributes<C, P>
    export interface IntrinsicAttributes
      extends ThemeUIJSX.IntrinsicAttributes {}
    export interface IntrinsicClassAttributes<T>
      extends ThemeUIJSX.IntrinsicClassAttributes<T> {}
    export type IntrinsicElements = ThemeUIJSX.IntrinsicElements
  }
}

export interface ThemeUIContextValue {
  __EMOTION_VERSION__: string
  theme: Theme
}

/**
 * @internal
 */
export const __ThemeUIContext = React.createContext<ThemeUIContextValue>({
  __EMOTION_VERSION__,
  theme: {},
})

export const useThemeUI = () => React.useContext(__ThemeUIContext)

const canUseSymbol = typeof Symbol === 'function' && Symbol.for

const REACT_ELEMENT = canUseSymbol ? Symbol.for('react.element') : 0xeac7
const FORWARD_REF = canUseSymbol ? Symbol.for('react.forward_ref') : 0xeac7

export interface __ThemeUIInternalBaseThemeProviderProps {
  context: ThemeUIContextValue
}
/**
 * @internal
 */
export const __ThemeUIInternalBaseThemeProvider: React.FC<__ThemeUIInternalBaseThemeProviderProps> = ({
  context,
  children,
}) =>
  jsx(
    EmotionContext.Provider,
    { value: context.theme },
    jsx(__ThemeUIContext.Provider, {
      value: context,
      children,
    })
  )

export interface ThemeProviderProps {
  theme: Theme | ((outerTheme: Theme) => Theme)
  children?: React.ReactNode
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return jsx(__ThemeUIInternalBaseThemeProvider, { context: { theme } }, children)
}

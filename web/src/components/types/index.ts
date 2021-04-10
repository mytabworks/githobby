import React, { memo } from 'react'

export enum Variant {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    SUCCESS = 'success',
    DANGER = 'danger',
    WARNING = 'warning',
    INFO = 'info'
}

export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export type ReplaceProps<Inner extends React.ElementType, P> = Omit<React.ComponentPropsWithRef<Inner>, P> & P;

export type AliasPropTypes<Inner extends React.ElementType, P> = React.PropsWithChildren<ReplaceProps<Inner, AliasProps<Inner> & P>>

export interface AliasProps<As extends React.ElementType = React.ElementType> {
    as?: As | React.ElementType;
}

export interface AliasFunction<TInitial extends React.ElementType, P = unknown> {
    <As extends React.ElementType = TInitial>(
        props: AliasPropTypes<As, P>,
        context?: any,
      ): React.ReactElement | null;
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
}

export type AliasWithAliasPropTypes<Inner extends React.ElementType, P> = Inner extends React.ElementType ? (
    React.PropsWithChildren<ReplaceProps<Inner, AliasProps<Inner> & P>>
) : (
    Inner extends AliasFunction<infer DAs, infer DP> ? (
        React.PropsWithChildren<ReplaceProps<DAs, AliasProps<DAs> & DP>> & P
    ) : never
)

export interface AliasWithAliasFunction<TInitial extends React.ElementType, P = unknown> {
    <As extends React.ElementType = TInitial>(
        props: AliasWithAliasPropTypes<As, P>,
        context?: any,
      ): React.ReactElement | null;
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
}

export interface MemoFunction<P = unknown> extends React.NamedExoticComponent<P> {
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
}

export const AliasMemoWithChain: <TInitial extends React.ElementType, P = unknown, C = unknown>(
        Component: AliasFunction<TInitial, P>,
        propsAreEqual?: (prevProps: Readonly<React.PropsWithChildren<AliasPropTypes<TInitial, P>>>, nextProps: Readonly<AliasPropTypes<TInitial, P>>) => boolean
    ) => AliasFunction<TInitial, P> & C = memo;
import React, { FunctionComponent, memo } from 'react';
import { ComponentProps } from '../types';
import is from '../../utils/is';

type SizeTypes = { span: number, offset: number } | number

export interface ColProps extends ComponentProps {
    xs?: SizeTypes;
    sm?: SizeTypes;
    md?: SizeTypes;
    lg?: SizeTypes;
}

const Col: FunctionComponent<ColProps> = ({xs, sm, md, lg, className, children}) => {

    const strxs: string = xs ? is.obj(xs) ? `column-xs-${(xs as any).span} offset-xs-${(xs as any).offset}` : `column-xs-${xs}` : ''
    const strsm: string = sm ? is.obj(sm) ? ` column-sm-${(sm as any).span} offset-sm-${(sm as any).offset}` : ` column-sm-${sm}` : ''
    const strmd: string = md ? is.obj(md) ? ` column-md-${(md as any).span} offset-md-${(md as any).offset}` : ` column-md-${md}` : ''
    const strlg: string = lg ? is.obj(lg) ? ` column-lg-${(lg as any).span} offset-lg-${(lg as any).offset}` : ` column-lg-${lg}` : ''
    
    return (
        <div className={`${strxs || strsm || strmd || strlg 
            ? `${strxs}${strsm}${strmd}${strlg}`.trim()
            : 'column'}${className ? ` ${className}`: ''}`}>
            {children}
        </div>
    )
}

export default memo(Col)

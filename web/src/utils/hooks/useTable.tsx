import React, { useCallback, useMemo, useRef, useState } from 'react';

export type FilterState = {
	dataIndex: string;
	value: string | string[];
};

type ChangeEvent = React.ChangeEvent<
	HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export enum SortOrder {
	ASC = 'asc',
	DESC = 'desc',
}

export type SortState = {
	order: null | SortOrder;
	orderBy: null | string;
};

interface FilterProps {
	dataIndex: string;
	value: string;
	multiple?: boolean;
}

interface SortProps {
	dataIndex: string;
	sortOrder?: SortOrder[];
	render: (sort: SortOrder | null) => React.ReactNode;
}

type HookFunction<P = any, R = any> = (props: P) => R

interface TableStates {
	page: number;
	filters: FilterState[];
	sort: SortState;
}

interface TableReturn extends TableStates {
	filterProps: HookFunction<FilterProps>;
	filterSubmit: HookFunction<void, void>;
	sortProps: HookFunction<SortProps>;
	paginateProps: HookFunction<number>;
}

const defaultTableStates = {
	page: 1,
	filters: [],
	sort: { 
		order: null, 
		orderBy: null
	}
}

export const useTable = ({
		page = 1,
		filters = [],
		sort: { 
			order = null, 
			orderBy = null 
		} = defaultTableStates.sort
	}: Partial<TableStates> = defaultTableStates):TableReturn => {

	const [states, setStates] = useState<TableStates>({
		page,
		filters,
		sort: { order, orderBy }
	})

	const observableFilters = useRef<FilterState[]>(filters)

	const filterProps: HookFunction<FilterProps> = useCallback(({
		dataIndex,
		value,
		multiple = false
	}) => {
		return {
			onChange: (event: ChangeEvent) => {
				const obfilters = observableFilters.current
				const target = event.target
				const targetType = target.type
				const targetValue = target.value

				let filters = obfilters.filter((filter) => filter.dataIndex !== dataIndex);
				let updateOrNewFilter
				if(["checkbox", "radio"].includes(targetType)) {
					const isChecked = (target as any).checked
					const current = obfilters.find((filter) => filter.dataIndex === dataIndex)
					
					if((isChecked && !current) || targetType === "radio") {
						updateOrNewFilter = { dataIndex, value: multiple ? [value] : value }

					} else if (multiple) {
						let values = (current?.value as string[]).filter((v: string) => v !== value)

						if(isChecked) {
							updateOrNewFilter = { dataIndex, value: [...values, value] }
							
						} else if(values.length) {

							updateOrNewFilter = { dataIndex, value: values }
						}
					}
					
				} else if (targetValue) {
					updateOrNewFilter = { 
						dataIndex, 
						value: value.replace("{search}", targetValue) 
					}
				}

				if(updateOrNewFilter) {
					filters = [...filters, updateOrNewFilter];
				}

				observableFilters.current = filters
			}
		}
	}, [states.filters]);

	const filterSubmit = useCallback(() => {
		setStates((prev) => ({
			...prev,
			filters: observableFilters.current
		}))
	}, [])

	const sortProps: HookFunction<SortProps> = useCallback(({
			dataIndex,
			sortOrder = [SortOrder.ASC, SortOrder.DESC],
			render
		}) => {
		return {
			"data-index": dataIndex,
			"data-order": states.sort.orderBy === dataIndex ? states.sort.order : undefined,
			children: render(states.sort.orderBy === dataIndex ? states.sort.order : null),
			onClick: () => {
				setStates((prev) => {
					let sort
					const prevSort = prev.sort
					if (prevSort.orderBy !== dataIndex) {
						sort = {
							order: sortOrder[0],
							orderBy: dataIndex,
						};
					} else if (
						prevSort.orderBy === dataIndex &&
						sortOrder.length >= 2 &&
						prevSort.order === sortOrder[0]
					) {
						sort = {
							order: sortOrder[1],
							orderBy: dataIndex,
						};
					} else {
						sort = {
							order: null,
							orderBy: null,
						};
					}

					return {
						...prev,
						sort
					}
				});
			}
		}
	}, [states.sort.order, states.sort.orderBy])

	const paginateProps: HookFunction<number> = useCallback((page: number) => {
		return {
			"data-page": page,
			"data-active": page === states.page,
			onClick: (event: React.MouseEvent<any>) => {
				event.preventDefault()
				setStates((prev) => ({
					...prev,
					page
				}))
			}
		}
	}, [states.page])

	return useMemo(() => {
		return {
			...states,
			filterProps,
			filterSubmit,
			sortProps,
			paginateProps,
		}
	}, [states])
}

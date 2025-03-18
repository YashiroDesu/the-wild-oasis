import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function CabinTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField={'discount'}
				options={[
					{ value: 'all', label: 'All' },
					{ value: 'with-discount', label: 'With discount' },
					{ value: 'no-discount', label: 'No discount' },
				]}
			/>
			<SortBy
				options={[
					{ value: 'name-asc', label: 'Sort by name(A-Z)' },
					{ value: 'name-desc', label: 'sort by name(Z-A)' },
					{ value: 'regularPrice-asc', label: 'sort by price(Low first)' },
					{ value: 'regularPrice-desc', label: 'sort by Price(High first)' },
					{ value: 'maxCapacity-asc', label: 'sort by capacity(Low first)' },
					{ value: 'maxCapacity-desc', label: 'sort by capacity(High first)' },
				]}
			/>
		</TableOperations>
	);
}

export default CabinTableOperations;

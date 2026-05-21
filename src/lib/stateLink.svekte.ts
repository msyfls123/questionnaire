export function stateLink<T> (getValue: () => T) {
	let wasLocal = false;
	let localState: T | undefined = $state(undefined);

	// Choose `localState` as the latest value if the mutation was local
	// Otherwise, choose the linked `getValue()` because the change was a reaction
	const linkedDerived = $derived.by(() => {
		const linkedValue = getValue();
		if (wasLocal) {
			wasLocal = false;
			return localState;
		}
		return linkedValue;
	});

	return {
		get current() {
			return linkedDerived;
		},
		set current(v) {
			wasLocal = true;
			localState = v;
		},
	};
}
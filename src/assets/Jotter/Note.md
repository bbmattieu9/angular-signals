counter = signal(1);

constructor() {
effect(() => {
console.log(`Counter Value change ${this.counter()}`);
});
}

// example 1: signals with Object
/* counter = signal<Counter>({
value: 20
});*/

increment() {
this.counter.update(counter => counter + 1);
}

// example 2: Signals with array
values = signal<number[]>([0]);

append() {
this.values.update(values => ([
...values,
values[values.length - 1] + 1
]))
}

// example 3: Computed signals
tenXCounter = computed(() => {
const val = this.counter();
return val * 10;
})

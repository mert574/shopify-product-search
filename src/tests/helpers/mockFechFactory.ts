const { Response, Headers } = jest.requireActual('node-fetch');

export function mockFetchImplementationFactory(initial: string, recurring: string): () => Promise<any> {
    let count = 0;
    const headers = new Headers();
    return () => new Promise((resolve) => {
        if (count++ === 0) {
            return resolve(new Response(initial, headers));
        } else {
            return resolve(new Response(recurring, headers));
        }
    });
}

export default function mockFetchWith(respondInitial: unknown, respondRecurring: unknown = { products: [] }): () => any {
    const initialBody = JSON.stringify(respondInitial);
    const recurringBody = JSON.stringify(respondRecurring);
    return mockFetchImplementationFactory(initialBody, recurringBody);
}

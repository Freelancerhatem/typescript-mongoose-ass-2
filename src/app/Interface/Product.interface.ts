type Variant = {
    type: string;
    value: string;
}

type Inventory = {
    quantity: number;
    inStock: boolean;
}
export type Products = {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: Variant[];
    inventory: Inventory;
}
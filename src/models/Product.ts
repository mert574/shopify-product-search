// TODO complete types as needed.

export interface ProductImage {
    [key: string]: any
}

export interface ProductVariant {
    [key: string]: any
}

export interface Product {
    id: number;
    handle: string;
    images: ProductImage[];
    options: { [key: string]: string };
    product_type: string;
    published_scope: 'web' | 'global';
    status: 'active' | 'archived' | 'draft';
    tags: string;
    template_suffix: string;
    title: string;
    vendor: string;
    variants: ProductVariant[];
    body_html: string;
    created_at: string;
    updated_at: string;
    published_at: string;
}

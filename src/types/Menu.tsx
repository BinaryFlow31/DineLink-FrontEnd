interface MenuItem {
	name: string;
	description: string;
	price: string;
}

interface SubCategory {
	subCategory: string;
	items: MenuItem[];
}

export interface Menu {
	category: string;
	subCategories: SubCategory[];
}
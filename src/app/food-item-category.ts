export class FoodItemCategory {
    categoryId: number;
	name: string;
	description: string;
	parentCategoryEntity: FoodItemCategory;
	
	
	
	constructor(categoryId?: number, name?: string, description?: string)
	{
		this.categoryId = categoryId;
		this.name = name;
	}



}

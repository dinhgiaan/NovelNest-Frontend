
interface ICategory {
      _id: string;
      name: string;
      count: number;
}

interface IPublisher {
      name: string;
      count: number;
}

interface IPriceRange {
      minPrice: number;
      maxPrice: number;
}

interface IFilterParams {
      page?: number;
      limit?: number;
      categories?: string[];
      minPrice?: number;
      maxPrice?: number;
      publisher?: string;
      rating?: number;
      sortBy?: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'rating';
}

interface IBookFilterResponse {
      success: boolean;
      data: IBook[];
      pagination: IPaginationInfo;
}

interface ICategoryResponse {
      success: boolean;
      data: ICategory[];
}

interface IPriceRangeResponse {
      success: boolean;
      data: IPriceRange;
}

interface IPublisherResponse {
      success: boolean;
      data: IPublisher[];
}
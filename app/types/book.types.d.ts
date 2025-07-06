export interface IBook {
      _id: string;
      title: string;
      slug: string;
      author: string;
      publisher: string;
      price: number;
      discountPercent: number;
      rating: number;
      quantity: number;
      categories: string[];
      thumbnail?: {
            public_id?: string;
            url: string;
      };
      epubFile?: {
            url: string;
      };
      sold: number;
      status: string;
      isbn?: number;
}

export interface IPaginationInfo {
      currentPage: number;
      totalPages: number;
      totalResults: number;
      resultsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
}

export interface IPaginationParams {
      page?: number;
      limit?: number;
}

export interface IBookResponse {
      status: number;
      success: boolean;
      pagination?: IPaginationInfo;
      totalResults?: number;
      data: IBook[];
}
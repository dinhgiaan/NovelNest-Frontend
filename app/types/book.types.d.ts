interface IBook {
      _id: string;
      title: string;
      slug?: string;
      author: string;
      publisher?: string;
      price: number;
      publicDate?: string
      discountPercent?: number;
      promotionPrice: number;
      description?: string;
      rating?: number;
      // categories: string[];
      categories?: { _id: string; name: string }[] | string[]
      thumbnail?: {
            public_id?: string;
            url: string;
      };
      epubFile?: {
            url: string;
            public_id: string;
      };
      sold?: number;
      status?: string;
      isbn?: number;
      purchaseDate?: string
}

interface IPaginationInfo {
      currentPage: number;
      totalPages: number;
      totalResults: number;
      resultsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
}

interface IPaginationParams {
      page?: number;
      limit?: number;
}

interface IBookResponse {
      status: number;
      success?: boolean;
      pagination?: IPaginationInfo;
      totalResults?: number;
      data: IBook[];
}
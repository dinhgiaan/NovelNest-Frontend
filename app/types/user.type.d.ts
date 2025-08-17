interface IUser {
      _id?: string
      name?: string;
      email?: string;
      password?: string;
      gender?: string;
      role?: string;
      loginMethod?: string,
      avatar?: { url: string };
      isVerified?: boolean;
      verificationExpiry?: Date;
      otp?: {
            code?: string;
            expiredAt?: Date;
            attempts: number;
            maxAttempts: number;
            isLocked: boolean;
      };
      purchasedBooks?: Array<{
            bookId: mongoose.Types.ObjectId;
            title: string;
            author: string;
            rating: number;
            thumbnail: {
                  url: string;
            };
            purchaseDate: Date;
            orderCode: string;
      }>;
      favouriteBooks?: Array<{
            bookId: mongoose.Types.ObjectId;
            title: string;
            author: string;
            rating: number;
            thumbnail: {
                  url: string;
            };
            addToFavoriteDate: Date;
      }>;
      createdAt?: string;
      updatedAt?: string;
}
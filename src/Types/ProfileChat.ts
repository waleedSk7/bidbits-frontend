import Message from "./message";
import Product from "./product";
import User from "./user";

export default interface ProfileChat {
	highestBid: number;
	messages: Message[];
	product: Product;
	bidder: User;
}
